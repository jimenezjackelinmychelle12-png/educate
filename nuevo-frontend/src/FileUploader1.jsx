import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const FileUploader1 = () => {
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleClick = () => fileInputRef.current.click();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile(file);
  };

  const uploadFile = async (file) => {
    setCurrentFile(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:9095/api/fileManager/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          },
        }
      );

      fetchFiles();

    } catch (error) {
      console.error(error);
    } finally {
      setCurrentFile(null);
      setProgress(0);
    }
  };

  const fetchFiles = async () => {
    const res = await axios.get(
      "http://localhost:9095/api/fileManager/files"
    );
    setUploadedFiles(res.data);
  };

  const downloadFile = (id) => {
    window.open(
      `http://localhost:9095/api/fileManager/files/${id}`
    );
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="wrapper">
      <header>File Manager</header>

      <div className="form" onClick={handleClick}>
        <input type="file" hidden ref={fileInputRef} onChange={handleFile} />
        <p>Click para subir archivo</p>
      </div>

      {currentFile && (
        <div>
          <p>{currentFile}</p>
          <progress value={progress} max="100" />
        </div>
      )}

      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.id}>
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
            <button onClick={() => downloadFile(file.id)}>
              Descargar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader1;