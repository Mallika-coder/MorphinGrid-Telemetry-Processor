import FileUploader from '../../components/FileUploader'
import { UploadCloud } from 'lucide-react';

export default function Upload(){
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-indigo-700"><UploadCloud className="w-6 h-6 mr-2" /> Telemetry Ingestion</h2>
      <p className="text-gray-600 mb-4">Upload large telemetry files (.csv) for asynchronous processing, validation, and AI anomaly detection via the worker queue.</p>
      <FileUploader />
    </div>
  )
}