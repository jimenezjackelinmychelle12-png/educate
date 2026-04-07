import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fakeCourses = [
      {
        id: 1,
        title: "React desde cero",
        description: "Aprende React paso a paso",
        category: "Desarrollo",
        date: "2024-01-10",
        image: "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
      },
      {
        id: 2,
        title: "JavaScript Master",
        description: "Domina JavaScript moderno",
        category: "Desarrollo",
        date: "2024-02-15",
        image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",
      },
      {
        id: 3,
        title: "Node.js Backend",
        description: "Crea APIs profesionales",
        category: "Tecnología",
        date: "2024-03-01",
        image: "https://www.univalle.edu/wp-content/uploads/2024/10/orator.jpg",
      },
      {
        id: 4,
        title: "Marketing Digital",
        description: "Estrategias modernas",
        category: "Negocios",
        date: "2024-04-10",
        image: "https://picsum.photos/300/200?random=4",
      },
      {
        id: 1,
        title: "React desde cero",
        description: "Aprende React paso a paso",
        category: "Desarrollo",
        date: "2024-01-10",
        image: "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
      },
      {
        id: 2,
        title: "JavaScript Master",
        description: "Domina JavaScript moderno",
        category: "Desarrollo",
        date: "2024-02-15",
        image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",
      },
      {
        id: 3,
        title: "Node.js Backend",
        description: "Crea APIs profesionales",
        category: "Tecnología",
        date: "2024-03-01",
        image: "https://www.univalle.edu/wp-content/uploads/2024/10/orator.jpg",
      },
      {
        id: 4,
        title: "Marketing Digital",
        description: "Estrategias modernas",
        category: "Negocios",
        date: "2024-04-10",
        image: "https://picsum.photos/300/200?random=4",
      },
    ];

    setTimeout(() => {
      setCourses(fakeCourses);
      setFilteredCourses(fakeCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // 🔥 FILTRO
  useEffect(() => {
    let filtered = courses;

    if (selectedCategory) {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (selectedDate) {
      filtered = filtered.filter(c => c.date >= selectedDate);
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, selectedDate, courses]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Cargando cursos...</h2>;
  }

  return (
    <div style={styles.container}>
      
      {/* 🔝 NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={{ margin: 0 }}>Mi Plataforma</h2>

        {/* 🔽 CATEGORÍAS */}
        <div
          style={styles.menuTrigger}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          Categorías

          {showMenu && (
           /* <div style={styles.dropdown}>
              <div>
                <p style={styles.menuTitle}>Desarrollo</p>
                <p onClick={() => setSelectedCategory("Desarrollo")}>React</p>
                <p onClick={() => setSelectedCategory("Desarrollo")}>Java</p>
              </div>

              <div>
                <p style={styles.menuTitle}>Negocios</p>
                <p onClick={() => setSelectedCategory("Negocios")}>Marketing</p>
              </div>

              <div>
                <p style={styles.menuTitle}>Tecnología</p>
                <p onClick={() => setSelectedCategory("Tecnología")}>IA</p>
              </div>
            </div>*/
            <div style={styles.dropdown}>
  {["Desarrollo", "Negocios", "Tecnología"].map((cat) => (
    <p
      key={cat}
      onClick={() =>
        setSelectedCategory(
          selectedCategory === cat ? "" : cat // 🔥 toggle
        )
      }
      style={{
        cursor: "pointer",
        padding: "5px",
        borderRadius: "5px",
        background:
          selectedCategory === cat ? "#4f46e5" : "transparent",
        color:
          selectedCategory === cat ? "#fff" : "#000",
        fontWeight: "bold",
      }}
    >
      {cat}
    </p>
  ))}
</div>
          )}
        </div>

        {/* 🔍 FILTRO POR FECHA */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={styles.dateInput}
        />

        <div>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>

      <h1 style={styles.title}>Catálogo de Cursos 📚</h1>

      {/* 🔥 BOTÓN RESET */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setSelectedCategory("");
            setSelectedDate("");
          }}
          style={styles.resetButton}
        >
          Limpiar filtros
        </button>
      </div>

      {/* 📚 CURSOS */}
      <div style={styles.grid}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={styles.card}>
            
            <img src={course.image} alt={course.title} style={styles.image} />

            <div style={styles.content}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <small>{course.category} | {course.date}</small>

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
    fontFamily: "Arial",
    background: "#f8fafc",
    minHeight: "100vh"
  },

  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#fff",
    borderBottom: "1px solid #ddd",
    position: "relative",
    gap: "20px"
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
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },

  content: {
    padding: "15px"
  },

  button: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer"
  },

  resetButton: {
    padding: "8px 15px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer"
  },

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
  },

  dateInput: {
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  }
};

export default Courses;