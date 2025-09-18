export default function DriverProfile({ profile, handleChange, handleSave, saving }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">Driver Profile</h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700" htmlFor="full_name">
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={profile.name || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={profile.email || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700" htmlFor="vehicle_number">
          Vehicle Number
        </label>
        <input
          id="vehicle_number"
          name="driver.vehicle_number"
          type="text"
          value={profile.driver.vehicle_number || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700" htmlFor="vehicle_model">
          Vehicle Model
        </label>
        <input
          id="vehicle_model"
          name="driver.vehicle_model"
          type="text"
          value={profile.driver.vehicle_model || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700" htmlFor="rating">
          Rating
        </label>
        <input
          id="rating"
          name="driver.rating"
          type="number"
          step="0.1"
          disabled
          value={profile.driver?.rating ?? 0}
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700" htmlFor="total_rides">
          Total Rides
        </label>
        <input
          id="total_rides"
          name="driver.total_rides"
          type="number"
          disabled
          value={profile.driver?.total_rides ?? 0}
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
          saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
        }`}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
