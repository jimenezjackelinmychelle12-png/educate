import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

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
    const res = await axios.get("http://localhost:9095/api/fileManager/files");
    setUploadedFiles(res.data);
  };

  const downloadFile = (id) => {
    window.open(`http://localhost:9095/api/fileManager/files/${id}`);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // 🎨 ESTILOS INLINE (AISLADO SOLO PARA ESTE COMPONENTE)
  const styles = {
    wrapperPage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#6990F2"
    },
    wrapper: {
      width: "430px",
      background: "#fff",
      borderRadius: "5px",
      padding: "30px",
      boxShadow: "7px 7px 12px rgba(0,0,0,0.05)"
    },
    header: {
      color: "#6990F2",
      fontSize: "27px",
      fontWeight: "600",
      textAlign: "center"
    },
    form: {
      height: "167px",
      display: "flex",
      cursor: "pointer",
      margin: "30px 0",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      borderRadius: "5px",
      border: "2px dashed #6990F2",
      color: "#6990F2"
    },
    list: {
      listStyle: "none",
      padding: 0
    },
    item: {
      background: "#E9F0FF",
      padding: "10px",
      marginBottom: "8px",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    button: {
      background: "#6990F2",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.wrapperPage}>
      <div style={styles.wrapper}>
        <header style={styles.header}>File Manager</header>

        <div style={styles.form} onClick={handleClick}>
          <input type="file" hidden ref={fileInputRef} onChange={handleFile} />
          <p>Click para subir archivo</p>
        </div>

        {currentFile && (
          <div>
            <p>{currentFile}</p>
            <progress value={progress} max="100" style={{ width: "100%" }} />
          </div>
        )}

        <ul style={styles.list}>
          {uploadedFiles.map((file) => (
            <li key={file.id} style={styles.item}>
              <span>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>

              <button
                style={styles.button}
                onClick={() => downloadFile(file.id)}
              >
                Descargar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploader1;