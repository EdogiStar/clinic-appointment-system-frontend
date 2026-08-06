import { FaTrash } from "react-icons/fa";

function AvailabilityTable({
  availability = [],
  onDelete,
  loading,
}) {
  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        Loading availability...
      </div>
    );
  }

  if (availability.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        No availability has been added yet.
      </div>
    );
  }

  return (
    <div className="hidden overflow-x-auto rounded-lg bg-white shadow md:block">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Day
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Start Time
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              End Time
            </th>

            <th className="px-6 py-3 text-center text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {availability.map((slot) => (
            <tr
              key={slot.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                {slot.day_of_week}
              </td>

              <td className="px-6 py-4">
                {slot.start_time}
              </td>

              <td className="px-6 py-4">
                {slot.end_time}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(slot.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600"
                >
                  <FaTrash />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvailabilityTable;