export default function RiderProfile({ profile, handleChange, handleSave, saving }) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-semibold text-green-900 mb-6">Rider Profile</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={profile.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={profile.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="other_info" className="block text-gray-700 font-medium mb-1">
            Other Info
          </label>
          <textarea
            id="other_info"
            name="other_info"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            value={profile.other_info || ''}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`w-full py-2 rounded text-white ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
