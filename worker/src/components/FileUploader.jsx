'use client'
import { useState } from 'react'
import axios from 'axios'

export default function FileUploader(){
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')
  const [jobId, setJobId] = useState(null)

  async function upload(){
    if(!file) return alert('Choose a file')
    const form = new FormData(); form.append('file', file)
    setStatus(`Uploading ${file.name} to ingestion queue...`)
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/ingest/file`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
        setJobId(res.data.jobId)
        setStatus(`File uploaded successfully! Job ID: ${res.data.jobId}. Worker processing started.`);
    } catch(error) {
        setStatus(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <input type="file" onChange={e=>setFile(e.target.files[0])} className="border p-2 rounded mr-4 bg-white" />
      <button onClick={upload} disabled={!file} className={`px-6 py-2 rounded font-semibold ${file ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}>
        Enqueue for Processing
      </button>
      <div className={`mt-3 p-2 text-sm ${jobId ? 'text-green-800' : 'text-gray-700'}`}>{status}</div>
    </div>
  )
}