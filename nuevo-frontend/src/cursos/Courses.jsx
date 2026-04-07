import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // 🔥 Simulación de datos
    const fakeCourses = [
      {
        id: 1,
        title: "React desde cero",
        description: "Aprende React paso a paso",
        image: "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
      },
      {
        id: 2,
        title: "JavaScript Master",
        description: "Domina JavaScript moderno",
        image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",
      },
      {
        id: 3,
        title: "Node.js Backend",
        description: "Crea APIs profesionales",
        image: "https://www.univalle.edu/wp-content/uploads/2024/10/orator.jpg",
      },
      {
        id: 4,
        title: "React desde cero",
        description: "Aprende React paso a paso",
        image: "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
      },
      {
        id: 5,
        title: "JavaScript Master",
        description: "Domina JavaScript moderno",
        image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",
      },
      {
        id: 6,
        title: "Node.js Backend",
        description: "Crea APIs profesionales",
        image: "https://www.univalle.edu/wp-content/uploads/2024/10/orator.jpg",
      },{
        id: 7,
        title: "React desde cero",
        description: "Aprende React paso a paso",
        image: "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
      },
      {
        id: 8,
        title: "JavaScript Master",
        description: "Domina JavaScript moderno",
        image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",
      },
     
    ];

    setTimeout(() => {
      setCourses(fakeCourses);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Cargando cursos...</h2>;
  }

  return (
    <div style={styles.container}>
      
      {/* 🔝 NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={{ margin: 0 }}>Mi Plataforma</h2>
          {/* 🔽 BOTÓN CATEGORÍAS */}
    <div 
      style={styles.menuTrigger}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    > Categorías

      {showMenu && (
        <div style={styles.dropdown}>
          
          {/* COLUMNA 1 */}
          <div>
            <p style={styles.menuTitle}>Desarrollo</p>
            <p>Web Development</p>
            <p>React</p>
            <p>Java</p>
            <p>Spring Boot</p>
          </div>

          {/* COLUMNA 2 */}
          <div>
            <p style={styles.menuTitle}>Negocios</p>
            <p>Emprendimiento</p>
            <p>Marketing</p>
            <p>Finanzas</p>
          </div>

          {/* COLUMNA 3 */}
          <div>
            <p style={styles.menuTitle}>Tecnología</p>
            <p>IA</p>
            <p>Data Science</p>
            <p>Ciberseguridad</p>
          </div>

        </div>
      )}
    </div>
        <div>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>

      <h1 style={styles.title}>Catálogo de Cursos 📚</h1>

      <div style={styles.grid}>
        {courses.map((course) => (
          <div key={course.id} style={styles.card}>
            
            <img src={course.image} alt={course.title} style={styles.image} />

            <div style={styles.content}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <button style={styles.button}>
                Ver curso
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#6ba3f9",
    minHeight: "100vh",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1e293b",
    color: "white",
    padding: "15px 30px",
    borderRadius: "10px",
    marginBottom: "30px",
  },

  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "white",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },

  content: {
    padding: "15px",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    background: "#4facfe",
    color: "#fff",
    cursor: "pointer",
  },
  container: {
    fontFamily: "Arial"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
    position: "relative"
  },

  link: {
    marginLeft: "15px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold"
  },

  title: {
    textAlign: "center",
    marginTop: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px"
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },

  content: {
    padding: "15px"
  },

  // 🔥 NUEVO MENU
  menuTrigger: {
    position: "relative",
    cursor: "pointer",
    fontWeight: "bold"
  },

  dropdown: {
    position: "absolute",
    top: "30px",
    left: "0",
    display: "flex",
    gap: "40px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    zIndex: 1000
  },

  menuTitle: {
    fontWeight: "bold",
    marginBottom: "10px"
  }
};

export default Courses;