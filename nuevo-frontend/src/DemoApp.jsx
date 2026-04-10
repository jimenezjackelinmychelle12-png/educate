import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import CreateCourse from "./CreateCourse";

export default function DemoApp() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");

  const [coursesState, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const navigate = useNavigate();

  ////////////////////////////////////////////
  // 👨‍🏫 CURSOS DEL DOCENTE
  ////////////////////////////////////////////
  const [teacherCourses, setTeacherCourses] = useState([
    {
      id: 1,
      title: "React Avanzado",
      description: "Hooks, Context y buenas prácticas",
      image:
        "https://observatorio.tec.mx/wp-content/uploads/2022/05/cursosenli%CC%81neacalidad.jpeg",
    },
    {
      id: 2,
      title: "JavaScript Intermedio",
      description: "Closures, async/await y más",
      image:
        "https://media.istockphoto.com/id/1326992054/es/foto/retrato-de-un-joven-adulto-indio-con-auriculares-mirando-la-pantalla-de-la-computadora-port%C3%A1til.jpg",
    },
  ]);

  ////////////////////////////////////////////
  // 🔥 CREAR CURSO
  ////////////////////////////////////////////
  const handleCreateCourse = (newCourse) => {
    const courseWithId = {
      ...newCourse,
      id: teacherCourses.length + 1,
    };

    setTeacherCourses([...teacherCourses, courseWithId]);
    setShowForm(false);
  };

  ////////////////////////////////////////////
  // ✏️ EDITAR CURSO
  ////////////////////////////////////////////
  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  const handleUpdate = () => {
    setTeacherCourses((prev) =>
      prev.map((c) =>
        c.id === editingCourse.id ? editingCourse : c
      )
    );

    setEditingCourse(null);
  };

  ////////////////////////////////////////////
  // 👥 USUARIOS
  ////////////////////////////////////////////
  const fakeUsers = [
    {
      id: 1,
      nombre: "Rodrigo Saravia",
      email: "rodrigo@gmail.com",
      rol: "estudiante",
      avatar: "https://i.pravatar.cc/150?img=3",
      cursos: 3,
    },
    {
      id: 2,
      nombre: "Carlos Mendoza",
      email: "carlos@edu.com",
      rol: "docente",
      avatar: "https://i.pravatar.cc/150?img=12",
      especialidad: "Frontend",
    },
    {
      id: 3,
      nombre: "Ana Torres",
      email: "admin@edu.com",
      rol: "admin",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  ////////////////////////////////////////////
  // 📚 CURSOS GENERALES
  ////////////////////////////////////////////
  const courses = [
    {
      id: 1,
      title: "React desde cero",
      description: "Aprende React paso a paso",
      category: "Desarrollo",
      date: "2024-01-10",
      price: 49,
      duration: "10 horas",
      image:
        "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCourses(courses);
      setFilteredCourses(courses);
      setLoading(false);
    }, 1000);
  }, []);

  ////////////////////////////////////////////
  // 🔐 LOGIN
  ////////////////////////////////////////////
  const login = (email) => {
    const found = fakeUsers.find((u) => u.email === email);
    if (found) setUser(found);
  };

  const logout = () => {
    setUser(null);
    setView("home");
  };

  ////////////////////////////////////////////
  // 🔐 LOGIN UI
  ////////////////////////////////////////////
  if (!user) {
    return (
      <>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </BackButton>

        <div style={styles.loginContainer}>
          <div style={styles.loginCard}>
            <h2>Iniciar Sesión</h2>

            {fakeUsers.map((u) => (
              <button
                key={u.id}
                style={styles.loginButton}
                onClick={() => login(u.email)}
              >
                <img src={u.avatar} style={styles.loginAvatar} />
                {u.email} ({u.rol})
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  ////////////////////////////////////////////
  // 🧠 APP UI
  ////////////////////////////////////////////
  return (
    <div style={styles.appContainer}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3>EduPlatform</h3>

        <div style={styles.navRight}>
          <button onClick={() => setView("home")} style={styles.navBtn}>
            Inicio
          </button>

          <button onClick={() => setView("profile")} style={styles.navBtn}>
            Perfil
          </button>

          <div style={styles.userBox}>
            <img src={user.avatar} style={styles.navAvatar} />
            <span>{user.nombre}</span>
          </div>

          <button onClick={logout} style={styles.logout}>
            Salir
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={styles.content}>
        {view === "home" && (
          <>
            {/* 👨‍🏫 DOCENTE */}
            {user.rol === "docente" && (
              <>
                <h2 style={styles.title}>Mis Cursos 👨‍🏫</h2>

                <button
                  style={styles.createButton}
                  onClick={() => setShowForm(true)}
                >
                  + Crear Curso
                </button>

                {showForm && (
                  <CreateCourse onCreate={handleCreateCourse} />
                )}

                {/* ✏️ FORM EDITAR */}
                {editingCourse && (
                  <div style={styles.editBox}>
                    <h3>Editando: {editingCourse.title}</h3>

                    <input
                      value={editingCourse.title}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          title: e.target.value,
                        })
                      }
                      placeholder="Título"
                    />

                    <input
                      value={editingCourse.description}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          description: e.target.value,
                        })
                      }
                      placeholder="Descripción"
                    />

                    <button onClick={handleUpdate}>
                      Guardar cambios
                    </button>
                  </div>
                )}

                {/* 📦 LISTA */}
                <div style={styles.grid}>
                  {teacherCourses.map((course) => (
                    <div key={course.id} style={styles.cardPro}>
                      <img src={course.image} style={styles.imagePro} />

                      <div style={styles.contentPro}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        <button onClick={() => handleEdit(course)}>
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

//////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////
const styles = {
  loginContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  loginCard: {
    background: "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  loginButton: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  loginAvatar: {
    width: "30px",
    borderRadius: "50%",
  },

  appContainer: {
    minHeight: "100vh",
    background:
      "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "rgba(30,41,59,0.9)",
    backdropFilter: "blur(10px)",
    color: "#fff",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  navBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  navAvatar: {
    width: "35px",
    borderRadius: "50%",
  },

  content: {
    padding: "30px",
  },

  title: {
    textAlign: "center",
    fontSize: "36px",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  cardPro: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "15px",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },

  imagePro: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },

  contentPro: {
    padding: "15px",
  },

  buttonPro: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  createButton: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
  },

  editBox: {
    marginBottom: "25px",
    padding: "20px",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "12px",
    maxWidth: "400px",
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
};
const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;
  border-radius: 8px;
  border: none;

  background: rgba(255,255,255,0.2);
  color: white;
  font-weight: bold;
  cursor: pointer;
  backdrop-filter: blur(5px);

  transition: 0.3s;

  &:hover {
    background: rgba(255,255,255,0.4);
    transform: translateX(-3px);
  }
`;