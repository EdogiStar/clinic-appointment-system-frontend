import { FaClock, FaTrash } from "react-icons/fa";

function AvailabilityCard({
  availability = [],
  onDelete,
  loading,
}) {
  if (loading) {
    return (
      <div className="space-y-4 md:hidden">
        <div className="rounded-lg bg-white p-6 text-center shadow">
          Loading availability...
        </div>
      </div>
    );
  }

  if (availability.length === 0) {
    return (
      <div className="space-y-4 md:hidden">
        <div className="rounded-lg bg-white p-6 text-center shadow">
          No availability has been added yet.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:hidden">
      {availability.map((slot) => (
        <div
          key={slot.id}
          className="rounded-lg bg-white p-5 shadow"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {slot.day_of_week}
            </h3>
          </div>

          <div className="mb-4 flex items-center gap-2 text-gray-600">
            <FaClock className="text-blue-600" />

            <span>
              {slot.start_time} - {slot.end_time}
            </span>
          </div>

          <button
            onClick={() => onDelete(slot.id)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AvailabilityCard;