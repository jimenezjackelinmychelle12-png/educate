import { useState } from "react";

export default function Profile() {
  // 🔥 usuario simulado
  const [user, setUser] = useState({
    nombre: "Rodrigo Saravia",
    email: "rodrigo@gmail.com",
    rol: "student",
    telefono: "77777777",
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEdit(false);
    alert("Perfil actualizado ✅");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* FOTO */}
        <img
          src="https://i.pravatar.cc/150"
          alt="avatar"
          style={styles.avatar}
        />

        <h2>{user.nombre}</h2>
        <p style={styles.rol}>{user.rol.toUpperCase()}</p>

        {/* FORM */}
        <div style={styles.form}>
          
          <label>Nombre</label>
          <input
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            disabled={!edit}
            style={styles.input}
          />

          <label>Email</label>
          <input
            name="email"
            value={user.email}
            disabled
            style={styles.input}
          />

          <label>Teléfono</label>
          <input
            name="telefono"
            value={user.telefono}
            onChange={handleChange}
            disabled={!edit}
            style={styles.input}
          />

        </div>

        {/* BOTONES */}
        {!edit ? (
          <button style={styles.button} onClick={() => setEdit(true)}>
            Editar perfil
          </button>
        ) : (
          <button style={styles.saveButton} onClick={handleSave}>
            Guardar cambios
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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  rol: {
    color: "#4facfe",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#4facfe",
    color: "#fff",
    cursor: "pointer",
  },
  saveButton: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00c853",
    color: "#fff",
    cursor: "pointer",
  },
};