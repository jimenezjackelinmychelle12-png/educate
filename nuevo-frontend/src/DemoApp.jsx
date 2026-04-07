import { useState } from "react";

export default function DemoApp() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home"); // 🔥 control de vistas

  const fakeUsers = [
    { nombre: "Rodrigo", email: "student@test.com", rol: "student" },
    { nombre: "Carlos", email: "teacher@test.com", rol: "teacher" },
    { nombre: "Ana", email: "super@test.com", rol: "superadmin" },
  ];

  const courses = [
    {
      id: 1,
      title: "React desde cero",
      desc: "Aprende React fácil",
      img: "https://source.unsplash.com/400x250/?coding",
    },
    {
      id: 2,
      title: "JavaScript Pro",
      desc: "Domina JS moderno",
      img: "https://source.unsplash.com/400x250/?javascript",
    },
  ];

  const login = (email) => {
    const found = fakeUsers.find((u) => u.email === email);
    if (found) setUser(found);
  };

  const logout = () => {
    setUser(null);
    setView("home");
  };

  // 🔐 LOGIN
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Login Demo 🔐</h2>

          {fakeUsers.map((u) => (
            <button
              key={u.email}
              style={styles.button}
              onClick={() => login(u.email)}
            >
              {u.email} ({u.rol})
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3>Plataforma Cursos</h3>

        <div>
          <button onClick={() => setView("home")} style={styles.navBtn}>
            Inicio
          </button>

          <button onClick={() => setView("profile")} style={styles.navBtn}>
            Perfil
          </button>

          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={styles.content}>
        
        {/* HOME */}
        {view === "home" && (
          <>
            {user.rol === "student" && (
              <>
                <h2>Catálogo 📚</h2>
                <div style={styles.grid}>
                  {courses.map((c) => (
                    <div key={c.id} style={styles.cardCourse}>
                      <img src={c.img} style={styles.img} />
                      <h4>{c.title}</h4>
                      <p>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {user.rol === "admin" && (
              <>
                <h2>Panel Admin 🛠️</h2>
                <p>Gestión de usuarios</p>
              </>
            )}

            {user.rol === "superadmin" && (
              <>
                <h2>Super Admin 👑</h2>
                <p>Control total del sistema</p>
              </>
            )}
          </>
        )}

        {/* PERFIL 🔥 */}
        {view === "profile" && (
          <div style={styles.profileCard}>
            
            <img
              src="https://i.pravatar.cc/150"
              style={styles.avatar}
            />

            <h2>{user.nombre}</h2>
            <p style={styles.role}>{user.rol.toUpperCase()}</p>

            <div style={styles.profileInfo}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.rol}</p>

              {/* 🔥 contenido según rol */}
              {user.rol === "student" && (
                <p>📚 Cursos inscritos: 3</p>
              )}

              {user.rol === "admin" && (
                <p>🛠️ Gestiona usuarios y cursos</p>
              )}

              {user.rol === "superadmin" && (
                <p>👑 Acceso total al sistema</p>
              )}
            </div>

          </div>
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
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    background: "#4facfe",
    color: "#fff",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#4facfe",
    color: "#fff",
  },
  navBtn: {
    marginRight: "10px",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  logout: {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  content: {
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  cardCourse: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  img: {
    width: "100%",
    borderRadius: "8px",
  },

  // 🔥 PERFIL
  profileCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  role: {
    color: "#4facfe",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  profileInfo: {
    textAlign: "left",
  },
};