'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_WS_URL)

export default function LiveChart(){
  const [data, setData] = useState([])
  const [anomalies, setAnomalies] = useState([])

  useEffect(()=>{
    socket.on('connect', ()=>console.log('WS connected to backend'))
    socket.on('batch_processed', ({ count })=>console.log('Batch processed, data saved',count))
    
    // NEW DATA POINT: Add to the chart data
    socket.on('new_data_point', point => {
        const hr = point.metrics.heart_rate;
        const temp = point.metrics.engine_temp;
        const time = new Date(point.timestamp).toLocaleTimeString();
        setData(prev => [...prev.slice(-199), { time, hr, temp }]); // Keep last 200 points
    })
    
    // ANOMALY ALERT: Add to the live list and trigger highlight
    socket.on('anomaly_alert', alert => {
        setAnomalies(prev => [...prev.slice(-9), alert]); // Keep last 10 alerts
        console.log('CRITICAL ANOMALY DETECTED:', alert);
    })
    
    return ()=>{ 
        socket.off('new_data_point');
        socket.off('anomaly_alert');
    }
  },[])
    
    // Custom Dot to highlight anomalies
    const CustomDot = (props) => {
        const { cx, cy, payload } = props;
        // Check if the current payload time matches any recent anomaly time (simple check for demo)
        const isAnomaly = anomalies.some(a => new Date(a.timestamp).toLocaleTimeString() === payload.time);
        
        if (isAnomaly) {
            return <circle cx={cx} cy={cy} r={6} fill="#FF0000" stroke="#FFFFFF" strokeWidth={2} />;
        }
        return null;
    };


  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Bio-Telemetry Live Feed</h3>
      <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" stroke="#8884d8" label={{ value: 'Heart Rate (HR)', angle: -90, position: 'insideLeft' }}/>
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: 'Engine Temp', angle: 90, position: 'insideRight' }}/>
        <Tooltip />
        <Line yAxisId="left" type="monotone" dataKey="hr" stroke="#8884d8" dot={<CustomDot />} />
        <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#82ca9d" dot={false} />
      </LineChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-500 mt-2">Showing last 200 telemetry points. Red dots indicate AI-detected anomalies.</p>
    </div>
  )
}