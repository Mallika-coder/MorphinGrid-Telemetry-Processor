'use client'
import useSWR from 'swr'
import axios from 'axios'
import { Zap } from 'lucide-react';

const fetcher = url => axios.get(url).then(r => r.data)

export default function AnomalyList(){
  const { data } = useSWR(() => `${process.env.NEXT_PUBLIC_API_URL}/api/data/anomalies`, fetcher, { refreshInterval: 5000 })
  const anomalies = data?.anomalies || []
  
  const getSeverityColor = (severity) => {
    if (severity === 'CRITICAL') return 'text-red-600 bg-red-50';
    if (severity === 'HIGH') return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 flex items-center text-red-700"><Zap className="w-5 h-5 mr-2" /> Live Anomaly Incidents</h3>
      <ul className="space-y-3 max-h-[400px] overflow-y-auto">
        {anomalies.slice(0, 10).map(a => (
          <li key={a._id} className={`p-3 rounded-lg border-l-4 ${getSeverityColor(a.severity)} shadow-sm`}>
            <div className="font-semibold text-lg">{a.severity} Alert</div>
            <div className="text-sm">Metric: {a.metric} (Score: {a.score.toFixed(3)})</div>
            <div className="text-xs text-gray-600 mt-1">
              Time: {new Date(a.timestamp).toLocaleTimeString()}
            </div>
          </li>
        ))}
        {anomalies.length === 0 && <p className="text-gray-500 italic">No recent anomalies detected.</p>}
      </ul>
    </div>
  )
}