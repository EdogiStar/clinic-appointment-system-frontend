import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaStethoscope,
  FaNotesMedical,
} from "react-icons/fa";
import { toast } from "sonner";

import {
  createAppointment,
  getAvailableSlots,
} from "../../services/appointmentService";

import {
  getDoctors,
} from "../../services/doctorService";

function BookAppointment() {
  const navigate = useNavigate();

  // ----------------------------------
  // User
  // ----------------------------------

  const [doctors, setDoctors] =
    useState([]);

  // ----------------------------------
  // Loading states
  // ----------------------------------

  const [loadingDoctors, setLoadingDoctors] =
    useState(true);

  const [loadingSlots, setLoadingSlots] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  // ----------------------------------
  // Available slots
  // ----------------------------------

  const [availableSlots, setAvailableSlots] =
    useState([]);

  // ----------------------------------
  // Form data
  // ----------------------------------

  const [formData, setFormData] =
    useState({
      doctor_id: "",
      appointment_date: "",
      start_time: "",
      end_time: "",
      reason: "",
    });

  // ==================================
  // Load doctors when page opens
  // ==================================

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ==================================
  // Fetch active doctors
  // ==================================

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);

      const response =
        await getDoctors();

      /*
       * Handle different possible
       * API response formats.
       */

      const doctorList =
        Array.isArray(response)
          ? response
          : response?.data ||
            response?.doctors ||
            [];

      /*
       * Only show active doctors.
       *
       * Backend doctor response:
       *
       * doctor.user.status
       */

      const activeDoctors =
        doctorList.filter(
          (doctor) => {
            const accountStatus =
              doctor?.user?.status ||
              doctor?.users?.status ||
              doctor?.status ||
              doctor?.account_status ||
              "";

            return (
              String(
                accountStatus
              ).toLowerCase() ===
              "active"
            );
          }
        );

      setDoctors(
        activeDoctors
      );
    } catch (error) {
      console.error(
        "Failed to fetch doctors:",
        error
      );

      toast.error(
        error.response?.data
          ?.message ||
          error.response?.data
            ?.error ||
          "Unable to load available doctors."
      );

      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  // ==================================
  // Handle doctor selection
  // ==================================

  const handleDoctorChange = (
    event
  ) => {
    const doctorId =
      event.target.value;

    /*
     * Clear the previous selected
     * slot when changing doctor.
     */

    setAvailableSlots([]);

    setFormData(
      (previousData) => ({
        ...previousData,
        doctor_id: doctorId,
        start_time: "",
        end_time: "",
      })
    );
  };

  // ==================================
  // Handle date selection
  // ==================================

  const handleDateChange = (
    event
  ) => {
    const date =
      event.target.value;

    /*
     * Clear previously selected
     * slot when changing date.
     */

    setAvailableSlots([]);

    setFormData(
      (previousData) => ({
        ...previousData,
        appointment_date: date,
        start_time: "",
        end_time: "",
      })
    );
  };

  // ==================================
  // Handle reason input
  // ==================================

  const handleReasonChange = (
    event
  ) => {
    const {
      value,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        reason: value,
      })
    );
  };

  // ==================================
  // Load available slots
  // ==================================

  useEffect(() => {
    /*
     * Do not fetch slots until
     * both doctor and date exist.
     */

    if (
      !formData.doctor_id ||
      !formData.appointment_date
    ) {
      setAvailableSlots([]);

      return;
    }

    fetchAvailableSlots();
  }, [
    formData.doctor_id,
    formData.appointment_date,
  ]);

  // ==================================
  // Fetch available slots
  // ==================================

  const fetchAvailableSlots =
    async () => {
      try {
        setLoadingSlots(true);

        setAvailableSlots([]);

        /*
         * Fetch available slots
         * from the backend.
         */

        const response =
          await getAvailableSlots(
            formData.doctor_id,
            formData.appointment_date
          );

        /*
         * Handle possible API
         * response formats.
         */

        const slots =
          Array.isArray(response)
            ? response
            : response?.data ||
              response?.slots ||
              [];

        setAvailableSlots(
          slots
        );
      } catch (error) {
        console.error(
          "Failed to fetch available slots:",
          error
        );

        setAvailableSlots([]);

        toast.error(
          error.response?.data
            ?.message ||
            error.response?.data
              ?.error ||
            error.message ||
            "Unable to load available appointment slots."
        );
      } finally {
        setLoadingSlots(false);
      }
    };

  // ==================================
  // Handle slot selection
  // ==================================

  const handleSlotSelect = (
    slot
  ) => {
    setFormData(
      (previousData) => ({
        ...previousData,
        start_time:
          slot.start_time,
        end_time:
          slot.end_time,
      })
    );
  };

  // ==================================
  // Get doctor name
  // ==================================

  const getDoctorName = (
    doctor
  ) => {
    return (
      doctor?.user
        ?.full_name ||
      doctor?.users
        ?.full_name ||
      doctor?.full_name ||
      doctor?.name ||
      doctor?.doctor_name ||
      "Unknown Doctor"
    );
  };

  // ==================================
  // Get doctor specialty
  // ==================================

  const getDoctorSpecialty = (
    doctor
  ) => {
    return (
      doctor?.specialty
        ?.name ||
      doctor?.specialty ||
      doctor?.specialisation ||
      doctor?.specialization ||
      doctor?.department ||
      "General Practice"
    );
  };
    // ==================================
  // Submit appointment
  // ==================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    // ----------------------------------
    // Validate doctor
    // ----------------------------------

    if (
      !formData.doctor_id
    ) {
      toast.error(
        "Please select a doctor."
      );

      return;
    }

    // ----------------------------------
    // Validate date
    // ----------------------------------

    if (
      !formData.appointment_date
    ) {
      toast.error(
        "Please select an appointment date."
      );

      return;
    }

    // ----------------------------------
    // Validate slot
    // ----------------------------------

    if (
      !formData.start_time ||
      !formData.end_time
    ) {
      toast.error(
        "Please select an available appointment time."
      );

      return;
    }

    try {
      setSubmitting(true);

      await createAppointment(
        formData
      );

      toast.success(
        "Appointment booked successfully."
      );

      // ----------------------------------
      // Redirect to appointments
      // ----------------------------------

      navigate(
        "/appointments"
      );
    } catch (error) {
      console.error(
        "Failed to book appointment:",
        error
      );

      toast.error(
        error.response?.data
          ?.message ||
          error.response?.data
            ?.error ||
          error.message ||
          "Unable to book appointment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==================================
  // Today's date
  // ==================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // ==================================
  // Selected doctor
  // ==================================

  const selectedDoctor =
    doctors.find(
      (doctor) =>
        String(
          doctor.id
        ) ===
        String(
          formData.doctor_id
        )
    );

  // ==================================
  // Selected slot
  // ==================================

  const selectedSlot =
    availableSlots.find(
      (slot) =>
        slot.start_time ===
          formData.start_time &&
        slot.end_time ===
          formData.end_time
    );

  // ==================================
  // Render
  // ==================================

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* ================================== */}
      {/* Header */}
      {/* ================================== */}

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={() =>
            navigate(
              "/appointments"
            )
          }
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Book Appointment
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Select a doctor, choose an available time, and provide your appointment details.
          </p>
        </div>

      </div>

      {/* ================================== */}
      {/* Form */}
      {/* ================================== */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          {/* ================================== */}
          {/* Doctor */}
          {/* ================================== */}

          <div>
            <label
              htmlFor="doctor_id"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Select Doctor
            </label>

            <div className="relative">

              <FaUserMd className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                id="doctor_id"
                name="doctor_id"
                value={
                  formData.doctor_id
                }
                onChange={
                  handleDoctorChange
                }
                disabled={
                  loadingDoctors ||
                  submitting
                }
                className="min-h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
              >

                <option value="">
                  {loadingDoctors
                    ? "Loading doctors..."
                    : "Select a doctor"}
                </option>

                {doctors.map(
                  (doctor) => (
                    <option
                      key={
                        doctor.id
                      }
                      value={
                        doctor.id
                      }
                    >
                      {getDoctorName(
                        doctor
                      )}{" "}
                      —{" "}
                      {getDoctorSpecialty(
                        doctor
                      )}
                    </option>
                  )
                )}

              </select>

            </div>

            {!loadingDoctors &&
              doctors.length ===
                0 && (
                <p className="mt-2 text-sm text-gray-500">
                  No active doctors are currently available.
                </p>
              )}
          </div>

          {/* ================================== */}
          {/* Selected Doctor Preview */}
          {/* ================================== */}

          {selectedDoctor && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <FaStethoscope />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                    Selected Doctor
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {getDoctorName(
                      selectedDoctor
                    )}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {getDoctorSpecialty(
                      selectedDoctor
                    )}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ================================== */}
          {/* Appointment Date */}
          {/* ================================== */}

          <div>
            <label
              htmlFor="appointment_date"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Appointment Date
            </label>

            <div className="relative">

              <FaCalendarAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                id="appointment_date"
                type="date"
                name="appointment_date"
                value={
                  formData.appointment_date
                }
                onChange={
                  handleDateChange
                }
                min={today}
                disabled={
                  !formData.doctor_id ||
                  submitting
                }
                className="min-h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
              />

            </div>

            {!formData.doctor_id && (
              <p className="mt-2 text-xs text-gray-400">
                Select a doctor first to choose an appointment date.
              </p>
            )}
          </div>

          {/* ================================== */}
          {/* Available Slots */}
          {/* ================================== */}

          {formData.doctor_id &&
            formData.appointment_date && (
              <div>

                <div className="mb-3 flex items-center justify-between gap-3">

                  <label className="block text-sm font-semibold text-gray-700">
                    Available Time
                  </label>

                  {loadingSlots && (
                    <span className="text-xs text-gray-400">
                      Loading...
                    </span>
                  )}

                </div>

                {/* Loading slots */}

                {loadingSlots && (
                  <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-6">

                    <div className="flex items-center gap-3 text-sm text-gray-500">

                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

                      Loading available times...

                    </div>

                  </div>
                )}

                {/* No slots */}

                {!loadingSlots &&
                  availableSlots.length ===
                    0 && (
                    <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">

                      <div className="flex items-start gap-3">

                        <FaClock className="mt-0.5 shrink-0 text-yellow-600" />

                        <div>
                          <p className="text-sm font-semibold text-yellow-800">
                            No available slots
                          </p>

                          <p className="mt-1 text-sm text-yellow-700">
                            The selected doctor has no available appointment times on this date. Please choose another date.
                          </p>
                        </div>

                      </div>

                    </div>
                  )}

                {/* Available slots */}

                {!loadingSlots &&
                  availableSlots.length >
                    0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                      {availableSlots.map(
                        (
                          slot,
                          index
                        ) => {
                          const isSelected =
                            formData.start_time ===
                              slot.start_time &&
                            formData.end_time ===
                              slot.end_time;

                          return (
                            <button
                              key={`${slot.start_time}-${slot.end_time}-${index}`}
                              type="button"
                              onClick={() =>
                                handleSlotSelect(
                                  slot
                                )
                              }
                              disabled={
                                submitting
                              }
                              className={`min-h-12 rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                                isSelected
                                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                              } disabled:cursor-not-allowed disabled:opacity-60`}
                            >
                              <span className="block">
                                {slot.start_time}
                              </span>

                              <span
                                className={`mt-0.5 block text-xs font-normal ${
                                  isSelected
                                    ? "text-blue-100"
                                    : "text-gray-400"
                                }`}
                              >
                                to{" "}
                                {
                                  slot.end_time
                                }
                              </span>
                            </button>
                          );
                        }
                      )}

                    </div>
                  )}

              </div>
            )}
                      {/* ================================== */}
          {/* Selected Slot Preview */}
          {/* ================================== */}

          {selectedSlot && (
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
                  <FaClock />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-green-600">
                    Selected Appointment Time
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedSlot.start_time}
                    {" - "}
                    {selectedSlot.end_time}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {formData.appointment_date}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ================================== */}
          {/* Reason for Visit */}
          {/* ================================== */}

          <div>
            <label
              htmlFor="reason"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Reason for Visit
            </label>

            <div className="relative">

              <FaNotesMedical className="pointer-events-none absolute left-3 top-3.5 text-gray-400" />

              <textarea
                id="reason"
                name="reason"
                value={
                  formData.reason
                }
                onChange={
                  handleReasonChange
                }
                disabled={
                  submitting
                }
                rows="5"
                placeholder="Briefly describe the reason for your appointment..."
                className="w-full resize-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
              />

            </div>

            <p className="mt-2 text-xs text-gray-400">
              Please provide a brief description to help the doctor prepare for your visit.
            </p>
          </div>

          {/* ================================== */}
          {/* Form Actions */}
          {/* ================================== */}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

            {/* Cancel */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/appointments"
                )
              }
              disabled={
                submitting
              }
              className="min-h-11 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            {/* Book Appointment */}

            <button
              type="submit"
              disabled={
                submitting ||
                loadingDoctors ||
                loadingSlots ||
                doctors.length ===
                  0 ||
                !formData.doctor_id ||
                !formData.appointment_date ||
                !formData.start_time ||
                !formData.end_time
              }
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                  Booking...
                </>
              ) : (
                <>
                  <FaCalendarAlt />

                  Book Appointment
                </>
              )}
            </button>

          </div>

        </form>

      </div>

      {/* ================================== */}
      {/* Booking Information */}
      {/* ================================== */}

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

        <div className="flex items-start gap-3">

          <FaClock className="mt-0.5 shrink-0 text-sm text-gray-400" />

          <div>

            <h3 className="text-sm font-semibold text-gray-700">
              Appointment Information
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Your appointment will initially be marked as{" "}
              <span className="font-medium text-yellow-600">
                pending
              </span>{" "}
              until it is reviewed and confirmed by the clinic or assigned doctor.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookAppointment;