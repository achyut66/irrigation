export default function DashboardBody() {
    return (
      <main className="flex-1 p-6">
  
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Dashboard Overview
        </h1>
  
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold mt-2">152</h2>
          </div>
  
          <div className="p-6 bg-white rounded-xl shadow">
            <p className="text-sm text-gray-500">Records Added</p>
            <h2 className="text-2xl font-bold mt-2">934</h2>
          </div>
  
          <div className="p-6 bg-white rounded-xl shadow">
            <p className="text-sm text-gray-500">Pending Tasks</p>
            <h2 className="text-2xl font-bold mt-2">12</h2>
          </div>
        </div>
  
        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  
          {/* Chart Box */}
          <div className="p-6 bg-white rounded-xl shadow h-72 flex items-center justify-center">
            <p className="text-gray-500">📊 Chart / Diagram goes here</p>
          </div>
  
          {/* Table */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">Recent Data Entries</h3>
  
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">Water Pump A</td>
                  <td className="p-2 border">2025-01-12</td>
                </tr>
                <tr>
                  <td className="p-2 border">2</td>
                  <td className="p-2 border">Water Pump B</td>
                  <td className="p-2 border">2025-01-10</td>
                </tr>
              </tbody>
            </table>
          </div>
  
        </div>
  
      </main>
    );
  }
  