
import { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function AvailabilityForm({ onSave, onClose, loading }) {
  const [formData, setFormData] = useState({
    day_of_week: "Monday",
    start_time: "",
    end_time: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.start_time) {
      newErrors.start_time = "Start time is required.";
    }

    if (!formData.end_time) {
      newErrors.end_time = "End time is required.";
    }

    if (
      formData.start_time &&
      formData.end_time &&
      formData.start_time >= formData.end_time
    ) {
      newErrors.end_time =
        "End time must be after start time.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Add Availability
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Day
            </label>

            <select
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Start Time
            </label>

            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            {errors.start_time && (
              <p className="mt-1 text-sm text-red-500">
                {errors.start_time}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              End Time
            </label>

            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            {errors.end_time && (
              <p className="mt-1 text-sm text-red-500">
                {errors.end_time}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <FaSave />

              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AvailabilityForm;
