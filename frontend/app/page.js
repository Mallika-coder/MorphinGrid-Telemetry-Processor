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

    // 1️⃣ Initial fetch from backend
    fetch(`${backendUrl}/api/data`)
      .then(res => res.json())
      .then(initialData => setData(initialData))
      .catch(err => console.error('Error fetching data:', err));

    // 2️⃣ Connect to socket server
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.log('Connected to socket server');
      setSocketConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setSocketConnected(false);
    });

    // 3️⃣ Listen for real-time updates
    // Backend should emit something like: socket.emit('dataUpdate', updatedData)
    socket.on('dataUpdate', (updatedItem) => {
      setData(prevData => {
        // Update existing item if present, else add new
        const index = prevData.findIndex(item => item._id === updatedItem._id);
        if (index !== -1) {
          const newData = [...prevData];
          newData[index] = updatedItem;
          return newData;
        }
        return [...prevData, updatedItem];
      });
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
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
