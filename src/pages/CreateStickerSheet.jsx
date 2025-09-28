import React, { useState, useRef } from "react";

const getFileIcon = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "🖼️";
  if (["pdf"].includes(ext)) return "📄";
  if (["zip", "rar"].includes(ext)) return "🗜️";
  if (["doc", "docx"].includes(ext)) return "📃";
  return "📁";
};

export default function CreateStickerSheet() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Keep track of intervals per file to avoid conflicts
  const uploadIntervals = useRef({});

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => {
      setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
    });
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const removeFile = (index) => {
    const file = files[index];
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[file.name];
      return updated;
    });

    // Clear interval if uploading
    if (uploadIntervals.current[file.name]) {
      clearInterval(uploadIntervals.current[file.name]);
      delete uploadIntervals.current[file.name];
    }
  };

  const simulateUpload = () => {
    files.forEach((file) => {
      if (uploadIntervals.current[file.name]) return; // skip if already uploading
      let progress = uploadProgress[file.name] || 0;

      uploadIntervals.current[file.name] = setInterval(() => {
        progress += Math.random() * 10; // increment randomly
        if (progress >= 100) {
          progress = 100;
          clearInterval(uploadIntervals.current[file.name]);
          delete uploadIntervals.current[file.name];
        }
        setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
      }, 300);
    });
  };

  return (
    <div className="mt-10 space-y-6 max-w-lg mx-auto p-6 rounded-2xl shadow-lg bg-white font-serif">
      {/* File input */}

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="fileInput"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
        >
          Choose Files
        </label>
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Drag and drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
        onClick={() => document.getElementById("fileInputDrop").click()}
      >
        <input
          id="fileInputDrop"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <p className="text-gray-500 text-center">
          Or drag & drop files here
          {/* , or{" "} */}
          {/* <span className="text-blue-600 underline">browse</span> */}
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Selected Files:</h3>
          <ul className="space-y-3">
            {files.map((file, idx) => (
              <li
                key={idx}
                className="flex flex-col p-3 bg-gray-50 rounded-lg border hover:shadow-sm transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getFileIcon(file.name)}</span>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB •{" "}
                        {file.type || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      uploadProgress[file.name] === 100
                        ? "bg-green-500"
                        : "bg-blue-600"
                    }`}
                    style={{ width: `${uploadProgress[file.name] || 0}%` }}
                  ></div>
                </div>
                {/* Completed state */}
                {uploadProgress[file.name] === 100 && (
                  <p className="text-green-600 text-sm mt-1 flex items-center space-x-1">
                    <span>✅</span>
                    <span>Upload complete</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload button */}
      {files.length > 0 && (
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={simulateUpload}
        >
          Upload Files
        </button>
      )}
    </div>
  );
}
