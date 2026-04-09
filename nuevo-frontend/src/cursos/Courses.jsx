import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState( false);  

  const handleHover = (e, hover) => {
    if (hover) {
      e.target.style.background = "#ce1717";
      e.target.style.color = "#fff";
    } else {
      e.target.style.background = "rgba(206, 23, 23, 0.1)";
      e.target.style.color = "#ce1717";
    }
  };

  useEffect(() => {
    const fakeCourses = [
      {
        id: 1,
        title: "React desde cero",
        description: "Aprende React paso a paso",
        category: "Desarrollo",
        date: "2024-01-10",
        price: 49,
        duration: "10 horas",
        image: "https://thumbs.dreamstime.com/b/cursos-en-l%C3%ADnea-en-la-peque%C3%B1a-pizarra-d-79511605.jpg",
      },
      {
        id: 2,
        title: "JavaScript Master",
        description: "Domina JavaScript moderno",
        category: "Desarrollo",
        date: "2024-02-15",
        price: 79,
        duration: "15 horas",
        image: "https://www.webempresa.com/university/wp-content/uploads/2023/12/Curso-WP-basico-Tema-80.jpg",
      },
      {
        id: 3,
        title: "Node.js Backend",
        description: "Crea APIs profesionales",
        category: "Tecnología",
        date: "2024-03-01",
        price: 120,
        duration: "20 horas",
        image: "https://www.univalle.edu/wp-content/uploads/2024/10/orator.jpg",
      },
      {
        id: 4,
        title: "Marketing Digital",
        description: "Estrategias modernas",
        category: "Negocios",
        date: "2024-04-10",
        price: 60,
        duration: "8 horas",
        image: "https://picsum.photos/300/200?random=4",
      },
    ];

    setTimeout(() => {
      setCourses(fakeCourses);
      setFilteredCourses(fakeCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // 🔥 FILTROS
  useEffect(() => {
    let filtered = courses;

    if (selectedCategory) {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (selectedDate) {
      filtered = filtered.filter(c => c.date >= selectedDate);
    }

    if (priceFilter) {
      if (priceFilter === "0-50") {
        filtered = filtered.filter(c => c.price <= 50);
      }
      if (priceFilter === "50-100") {
        filtered = filtered.filter(c => c.price > 50 && c.price <= 100);
      }
      if (priceFilter === "100+") {
        filtered = filtered.filter(c => c.price > 100);
      }
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, selectedDate, priceFilter, courses]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Cargando cursos...</h2>;
  }

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2>Mi Plataforma</h2>

        {/* 🔽 CATEGORÍAS */}
<div style={styles.menuTrigger}>
  <span onClick={() => {
    setShowCategoryMenu(!showCategoryMenu);
    setShowPriceMenu(false);
  }}>
    Categorías {showCategoryMenu ? "▲" : "▼"}
  </span>

  {showCategoryMenu && (
    <div style={styles.dropdown}>
      {["Desarrollo", "Negocios", "Tecnología"].map((cat) => (
        <p
          key={cat}
          onClick={() => {
            setSelectedCategory(cat);
            setShowCategoryMenu(false);
          }}
          style={{
            ...styles.categoryItem,
            color: selectedCategory === cat ? "#4f46e5" : "#000",
            fontWeight: selectedCategory === cat ? "bold" : "normal"
          }}
        >
          {cat}
        </p>
      ))}
    </div>
  )}
</div>

{/* 💰 PRECIO */}
<div style={styles.menuTrigger}>
  <span onClick={() => {
    setShowPriceMenu(!showPriceMenu);
    setShowCategoryMenu(false);
  }}>
    Precio {showPriceMenu ? "▲" : "▼"}
  </span>

  {showPriceMenu && (
    <div style={styles.dropdown}>
      <p onClick={() => setPriceFilter("0-50")} style={styles.categoryItem}>
        $0 - $50
      </p>
      <p onClick={() => setPriceFilter("50-100")} style={styles.categoryItem}>
        $50 - $100
      </p>
      <p onClick={() => setPriceFilter("100+")} style={styles.categoryItem}>
        +$100
      </p>
    </div>
  )}
</div>

        {/* FECHA */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={styles.dateInput}
        />

        {/* USUARIO */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaUser style={{ marginRight: "10px" }} />

          <Link
            to="/login"
            style={styles.link}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={styles.link}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Register
          </Link>
        </div>
      </div>

      <h1 style={styles.title}>Catálogo de Cursos 📚</h1>

      {/* RESET */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => {
            setSelectedCategory("");
            setSelectedDate("");
            setPriceFilter("");
          }}
          style={styles.resetButton}
        >
          Limpiar filtros
        </button>
      </div>

      {/* CURSOS */}
      <div style={styles.grid}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={styles.card}>
            <img src={course.image} alt="" style={styles.image} />

            <div style={styles.content}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>📂 {course.category}</p>
              <p>💰 ${course.price}</p>
              <p>⏱ {course.duration}</p>
              <small>{course.date}</small>

              <button style={styles.button}>Ver curso</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px 30px"
  },

  menuTrigger: {
  position: "relative",
  cursor: "pointer",
  fontWeight: "bold",
  padding: "8px 12px",
  borderRadius: "8px",
  background: "#f1f5f9",
  transition: "0.3s"
},

  dropdown: {
    position: "absolute",
    top: "60px",
    background: "#fff",
    padding: "20px",
    display: "flex",
    gap: "40px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
  },

  categoryItem: {
    cursor: "pointer",
    padding: "5px"
  },

  menuTitle: {
    fontWeight: "bold"
  },

  link: {
    marginLeft: "10px",
    padding: "8px 15px",
    borderRadius: "8px",
    border: "1px solid #ce1717",
    background: "rgba(206,23,23,0.1)",
    textDecoration: "none",
    color: "#ce1717"
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: "40px",
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
    overflow: "hidden"
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
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px"
  },

  resetButton: {
    margin: "10px",
    padding: "8px 15px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px"
  },

  dateInput: {
    padding: "6px"
  }
};

export default Courses;