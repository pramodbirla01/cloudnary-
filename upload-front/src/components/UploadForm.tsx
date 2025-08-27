import React, { useState } from "react";
import { uploadImage } from "../api/upload";

export default function UploadForm({ onUpload }: { onUpload: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image file.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await uploadImage(file);
      setFile(null);
      onUpload();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md mx-auto">
  <h2 className="text-xl font-bold mb-2 text-blue-700">Upload Image</h2>
      <label className="block text-base font-semibold text-gray-700 mb-1">Select Image</label>
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 text-gray-800 font-semibold"
      />
      {!file && <span className="text-gray-700 font-semibold text-sm">No file chosen</span>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Uploading...
          </>
        ) : "Upload"}
      </button>
    </form>
  );
}
