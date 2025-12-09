// frontend/app/page.js
'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  // Initial fetch
  fetch(`${backendUrl}/api/data/query?limit=10`)
    .then(res => res.json())
    .then(initialData => setData(initialData.data)) // <-- fix here
    .catch(err => console.error('Error fetching data:', err));

  // Socket connection
  const socket = io(socketUrl);

  socket.on('connect', () => setSocketConnected(true));
  socket.on('disconnect', () => setSocketConnected(false));

  socket.on('dataUpdate', (updatedItem) => {
    setData(prevData => {
      const index = prevData.findIndex(item => item._id === updatedItem._id);
      if (index !== -1) {
        const newData = [...prevData];
        newData[index] = updatedItem;
        return newData;
      }
      return [...prevData, updatedItem];
    });
  });

  return () => socket.disconnect();
}, []);


  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to MorphinGrid!</h1>
      <p>Socket status: {socketConnected ? 'Connected' : 'Disconnected'}</p>

      <h2>Data from backend:</h2>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
