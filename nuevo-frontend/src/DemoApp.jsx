import { useState } from "react";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import CreateCourse from "./CreateCourse";

export default function DemoApp() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const navigate = useNavigate();

 ////////////////////////////////////////////
  // 👨‍🏫 CURSOS DEL ESTUDIANTE
  ////////////////////////////////////////////
  const courses = [
    {
        id: Date.now(),
        title: "React desde cero",
        description: "Aprende React paso a paso",
        category: "Desarrollo",
        date: "2024-01-10",
        price: 49,
        duration: "10 horas",
        image: "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
      },
      {
        id: Date.now(),
        title: "JavaScript Master",
        description: "Domina JavaScript moderno",
        category: "Desarrollo",
        date: "2024-02-15",
        price: 79,
        duration: "15 horas",
        image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",
      },
      {
        id: Date.now(),
        title: "Node.js Backend",
        description: "Crea APIs profesionales",
        category: "Tecnología",
        date: "2024-03-01",
        price: 120,
        duration: "20 horas",
        image: "https://www.univalle.edu/wp-content/uploads/2024/10/orator.jpg",
      },
      {
        id: Date.now(),
        title: "Marketing Digital",
        description: "Estrategias modernas",
        category: "Negocios",
        date: "2024-04-10",
        price: 60,
        duration: "8 horas",
        image: "https://bolivia.aprender21.com/images/cursos-online-aprender21.webp",
      },
    ];

  ////////////////////////////////////////////
  // 👨‍🏫 CURSOS DEL DOCENTE
  ////////////////////////////////////////////
  const [teacherCourses, setTeacherCourses] = useState([
    {
      id: Date.now(),
      title: "React Avanzado",
      description: "Hooks, Context y buenas prácticas",
      image: "https://observatorio.tec.mx/wp-content/uploads/2022/05/cursosenli%CC%81neacalidad.jpeg",
    },
    /*{
      id: Date.now(),
      title: "JavaScript Intermedio",
      description: "Closures, async/await y más",
      image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",    
    },*/
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
  // 🧠 APP
  ////////////////////////////////////////////

  // 🔥 CATÁLOGO GLOBAL (ESTUDIANTE)
const allCourses = [...teacherCourses, ...courses];

  return (
    <div style={styles.appContainer}>
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

      <div style={styles.content}>
        {view === "home" && (
          <>
           {user.rol === "estudiante" && (
              <>
                <h2 style={styles.title}>Catálogo de Cursos 📚</h2>

                <div style={styles.grid}>
                  {allCourses.map((course) => (
                    <div key={course.id} style={styles.cardPro}>
                      <img src={course.image} style={styles.imagePro} />

                      <div style={styles.contentPro}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        <p>📂 {course.category}</p>
                        <p>💰 ${course.price}</p>
                        <p>⏱ {course.duration}</p>
                        <small>{course.date}</small>

                        <button style={styles.buttonPro}>
                          Ver curso
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {user.rol === "docente" && (
              <>
                <h2 style={styles.title}>Mis Cursos 👨‍🏫</h2>

                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <button
                    style={styles.createButton}
                    onClick={() => setShowForm(true)}
                  >
                    + Crear Curso
                  </button>
                </div>

                {showForm && (
                  <CreateCourse onCreate={handleCreateCourse} />
                )}

                {/* ✏️ FORM EDITAR */}
                {editingCourse && (
                  
  <div className="modalOverlay">
    <div className="modal">

      <h2 style={{ marginBottom: "15px" }}>
        ✏️ Editar Curso
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        <input
          placeholder="Título del curso"
          value={editingCourse.title || ""}
          onChange={(e) =>
            setEditingCourse({
              ...editingCourse,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Descripción"
          value={editingCourse.description || ""}
          onChange={(e) =>
            setEditingCourse({
              ...editingCourse,
              description: e.target.value,
            })
          }
        />

        <input
          placeholder="Categoría"
          value={editingCourse.category || ""}
          onChange={(e) =>
            setEditingCourse({
              ...editingCourse,
              category: e.target.value,
            })
          }
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Precio"
            value={editingCourse.price || ""}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                price: e.target.value,
              })
            }
          />

          <input
            placeholder="Duración"
            value={editingCourse.duration || ""}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                duration: e.target.value,
              })
            }
          />
        </div>

        <input
          placeholder="URL de imagen"
          value={editingCourse.image || ""}
          onChange={(e) =>
            setEditingCourse({
              ...editingCourse,
              image: e.target.value,
            })
          }
        />

      </div>

      {/* BOTONES */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px"
      }}>
        <button onClick={() => setEditingCourse(null)}>
          Cancelar
        </button>

        <button onClick={handleUpdate}>
          Guardar cambios
        </button>
      </div>

    </div>
  </div>
                )}

                <div style={styles.grid}>
                  {teacherCourses.map((course) => (
                    <div key={course.id} style={styles.cardPro}>
                      <img src={course.image} style={styles.imagePro} />

                      <div style={styles.contentPro}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(course)}
                        >
                          Gestionar curso
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
// 🎨 ESTILOS PRO
//////////////////////////////////////////////////

const styles = {
  loginContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
    backgroundSize: "cover",
  },

  loginCard: {
    background: "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    textAlign: "center",
  },

  loginButton: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
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
    background: "#f1f5f9",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#1e293b",
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
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  img: {
    width: "100%",
    borderRadius: "8px",
  },

  profileCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
  },

  avatar: {
    width: "100px",
    borderRadius: "50%",
  },

  role: {
    color: "#4f46e5",
    fontWeight: "bold",
  },

  profileInfo: {
    textAlign: "left",
    marginTop: "15px",
  },
  title: {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "20px",
  color: "#1e293b"
},

cardPro: {
  background: "rgba(255,255,255,0.95)",
  borderRadius: "12px",
  overflow: "hidden",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  transition: "0.3s"
},

imagePro: {
  width: "100%",
  height: "150px",
  objectFit: "cover"
},

contentPro: {
  padding: "15px"
},

buttonPro: {
  width: "100%",
  padding: "10px",
  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px"
},

createButton: {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #10b981, #059669)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
},
editBoxPro: {
  margin: "30px auto",
  padding: "25px",
  maxWidth: "420px",
  background: "rgba(255,255,255,0.95)",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  animation: "fadeIn 0.3s ease"
},

inputPro: {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  transition: "0.2s",
},

buttonSave: {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
},

buttonCancel: {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#e5e7eb",
  cursor: "pointer",
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
