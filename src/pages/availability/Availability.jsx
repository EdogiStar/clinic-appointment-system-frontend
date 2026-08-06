import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";

import AvailabilityForm from "../../components/availability/AvailabilityForm";
import AvailabilityTable from "../../components/availability/AvailabilityTable";
import AvailabilityCard from "../../components/availability/AvailabilityCard";

import {
  getAvailability,
  createAvailability,
  deleteAvailability,
} from "../../services/availabilityService";

function Availability() {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);

      const data = await getAvailability();

      setAvailability(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load availability.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setSaving(true);

      await createAvailability(formData);

      toast.success("Availability added successfully.");

      setShowForm(false);

      fetchAvailability();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to add availability."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this availability slot?"
    );

    if (!confirmed) return;

    try {
      await deleteAvailability(id);

      toast.success("Availability removed successfully.");

      fetchAvailability();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete availability."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Availability
          </h1>

          <p className="text-gray-500">
            Manage your available appointment schedule.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Add Availability
        </button>
      </div>

      <AvailabilityTable
        availability={availability}
        loading={loading}
        onDelete={handleDelete}
      />

      <AvailabilityCard
        availability={availability}
        loading={loading}
        onDelete={handleDelete}
      />

      {showForm && (
        <AvailabilityForm
          loading={saving}
          onClose={() => setShowForm(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  );
}

export default Availability;