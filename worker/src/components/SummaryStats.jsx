'use client'
import useSWR from 'swr'
import axios from 'axios'
import { Database, TrendingUp, AlertTriangle } from 'lucide-react';

const fetcher = url => axios.get(url).then(r => r.data)

export default function SummaryStats(){
  const { data, isLoading } = useSWR(() => `${process.env.NEXT_PUBLIC_API_URL}/api/data/summary`, fetcher, { refreshInterval: 10000 })
  
  const stats = [
    { 
      title: "Total Records", 
      value: data?.total?.toLocaleString() || '...', 
      icon: Database, 
      color: 'text-indigo-500' 
    },
    { 
      title: "Total Anomalies", 
      value: data?.anomalies?.toLocaleString() || '...', 
      icon: AlertTriangle, 
      color: 'text-red-500' 
    },
    { 
      title: "Last Anomaly Time", 
      value: data?.lastAnomaly ? new Date(data.lastAnomaly.timestamp).toLocaleString() : 'N/A', 
      icon: TrendingUp, 
      color: 'text-green-500' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="p-4 bg-white rounded-xl shadow-md flex items-center space-x-4 border border-gray-100">
          <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{isLoading ? '...' : stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}