import LiveChart from '../components/LiveChart'
import AnomalyList from '../components/AnomalyList'
import SummaryStats from '../components/SummaryStats'

export default function Page(){
  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">🛡️ MorphinGrid Telemetry Console</h1>
      <SummaryStats />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 p-6 bg-white rounded-xl shadow-lg border border-gray-100"><LiveChart /></div>
        <div className="p-6 bg-white rounded-xl shadow-lg border border-red-200"><AnomalyList /></div>
      </div>
      <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Historical Query Console (Coming Soon)</h2>
      </div>
    </div>
  )
}