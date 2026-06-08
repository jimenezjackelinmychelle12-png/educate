import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserEdit,
  FaSave,
  FaCamera,
  FaArrowLeft,
  FaIdBadge,
} from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
  });

  const [edit, setEdit] = useState(false);

  // 🔥 cargar usuario desde localStorage
  useEffect(() => {
    const sessionUser = JSON.parse(localStorage.getItem("user"));

    if (sessionUser) {
      setUser({
        id: sessionUser.id || "",
        nombre: sessionUser.nombre || "",
        apellidoPaterno: sessionUser.apellidoPaterno || "",
        apellidoMaterno: sessionUser.apellidoMaterno || "",
        correo: sessionUser.correo || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 GUARDAR EN BACKEND
  const handleSave = async () => {
  try {
    const res = await fetch(
      `http://localhost:9095/api/usuarios/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const data = await res.text();
    console.log("RESPUESTA:", data);

    if (!res.ok) throw new Error(data);

    alert("OK");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  return (
    <div style={styles.container}>
      {/* BOTÓN VOLVER */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft /> Volver
      </button>

      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.avatarWrapper}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.nombre || "Usuario"
              )}&background=4f46e5&color=fff&size=160`}
              alt="avatar"
              style={styles.avatar}
            />
            <button style={styles.cameraBtn}>
              <FaCamera />
            </button>
          </div>

          <h2 style={styles.name}>
            {user.nombre} {user.apellidoPaterno}
          </h2>

          <p style={styles.role}>Usuario</p>
        </div>

        {/* FORM */}
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label>ID de Usuario</label>
            <div style={styles.inputWrap}>
              <FaIdBadge style={styles.icon} />
              <input value={user.id} disabled style={styles.input} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Nombre</label>
            <div style={styles.inputWrap}>
              <FaUserCircle style={styles.icon} />
              <input
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                disabled={!edit}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Apellido Paterno</label>
            <div style={styles.inputWrap}>
              <input
                name="apellidoPaterno"
                value={user.apellidoPaterno}
                onChange={handleChange}
                disabled={!edit}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Apellido Materno</label>
            <div style={styles.inputWrap}>
              <input
                name="apellidoMaterno"
                value={user.apellidoMaterno}
                onChange={handleChange}
                disabled={!edit}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Correo electrónico</label>
            <div style={styles.inputWrap}>
              <FaEnvelope style={styles.icon} />
              <input value={user.correo} disabled style={styles.input} />
            </div>
          </div>
        </div>

        {/* ACTION */}
        {!edit ? (
          <button style={styles.editButton} onClick={() => setEdit(true)}>
            <FaUserEdit /> Editar perfil
          </button>
        ) : (
          <button style={styles.saveButton} onClick={handleSave}>
            <FaSave /> Guardar cambios
          </button>
        )}
      </div>
    </div>
  );
}

//////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)",
    padding: "20px",
    position: "relative",
  },

  backButton: {
    position: "absolute",
    top: "24px",
    left: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255,255,255,0.14)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(255,255,255,0.96)",
    borderRadius: "28px",
    padding: "34px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
  },

  header: {
    textAlign: "center",
    marginBottom: "28px",
  },

  avatarWrapper: {
    position: "relative",
    width: "120px",
    margin: "0 auto 16px",
  },

  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
  },

  cameraBtn: {
    position: "absolute",
    bottom: "6px",
    right: "6px",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },

  name: {
    fontSize: "24px",
    fontWeight: "800",
  },

  role: {
    fontSize: "14px",
    color: "#64748b",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "10px",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
  },

  icon: {
    color: "#64748b",
  },

  editButton: {
    marginTop: "20px",
    padding: "12px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
  },

  saveButton: {
    marginTop: "20px",
    padding: "12px",
    border: "none",
    background: "#10b981",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
  },
};