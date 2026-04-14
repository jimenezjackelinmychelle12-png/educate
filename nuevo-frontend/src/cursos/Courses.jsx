import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [categoria, setCategoria] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let url = `http://localhost:9095/cursos?pageNumber=${page}&pageSize=6`;

        if (categoria && categoria.trim() !== "") {
          url += `&categoria=${categoria}`;
        }

        if (priceFilter) {
          if (priceFilter === "0-50") url += `&precioMin=0&precioMax=50`;
          if (priceFilter === "50-100") url += `&precioMin=50&precioMax=100`;
          if (priceFilter === "100+") url += `&precioMin=100`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setCourses(data.content || []);
        setTotalPages(data.totalPages || 0);

        window.scrollTo({ top: 0, behavior: "smooth" });

      } catch (err) {
        console.error(err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [page, categoria, priceFilter]);

  const getPages = () => {
    const start = Math.max(0, page - 2);
    const end = Math.min(totalPages, page + 3);
    return [...Array(end - start).keys()].map(i => start + i);
  };

  return (
    <div style={styles.container}>

      {/* 🔥 NAVBAR COMPLETO */}
      <div style={styles.navbar}>

        <h2 style={{ color: "#1e293b" }}>EduPlatform</h2>

        {/* 🔥 FILTROS EN NAVBAR */}
        <div style={{ display: "flex", gap: "15px" }}>

          {/* CATEGORÍA */}
          <div style={styles.menuTrigger}>
            <span onClick={() => {
              setShowCategoryMenu(!showCategoryMenu);
              setShowPriceMenu(false);
            }}>
              Categoría {showCategoryMenu ? "▼" : "▲"}
            </span>

            {showCategoryMenu && (
              <div style={styles.dropdown}>
                {["Programación","Backend","Frontend","Desarrollo", "negocios"].map((cat) => (

                  <p
                    key={cat}
                    style={styles.categoryItem}
                    onMouseEnter={(e) => e.target.style.background = "#f1f5f9"}
                    onMouseLeave={(e) => e.target.style.background = "transparent"}
                    onClick={() => {
                      setCategoria(cat);
                      setPage(0);
                      setShowCategoryMenu(false);
                    }}
                  >
                    {cat}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* PRECIO */}
          <div style={styles.menuTrigger}>
            <span onClick={() => {
              setShowPriceMenu(!showPriceMenu);
              setShowCategoryMenu(false);
            }}>
              Precio {showPriceMenu ? "▼" : "▲"}
            </span>

            {showPriceMenu && (
              <div style={styles.dropdown}>
                <p onClick={() => { setPriceFilter("0-50"); setPage(0); }} style={styles.categoryItem}>0 - 50</p>
                <p onClick={() => { setPriceFilter("50-100"); setPage(0); }} style={styles.categoryItem}>50 - 100</p>
                <p onClick={() => { setPriceFilter("100+"); setPage(0); }} style={styles.categoryItem}>100+</p>
              </div>
            )}
          </div>

          {/* RESET */}
          <button
            onClick={() => {
              setCategoria("");
              setPriceFilter("");
              setPage(0);
            }}
            style={styles.resetButton}
          >
            Limpiar
          </button>

        </div>

        {/* 🔥 USUARIO */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaUser style={{ marginRight: "10px", color: "#4f46e5" }} />

          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>

      <h1 style={styles.title}>Catálogo de Cursos 📚</h1>

      {/* 🔥 GRID */}
      <div style={styles.grid}>
        {courses.length === 0 ? (
          <p style={{ color: "white" }}>No hay cursos</p>
        ) : (
          courses.map((c) => (
            <div key={c.id} style={styles.card}>
              <img src={c.imagen || c.image} style={styles.image} />

              <div style={styles.content}>
                <h3>{c.titulo || c.title}</h3>

                <p>📂 {c.categoria || c.category}</p>
                <p>💰 ${c.precio || c.price}</p>

                <button style={styles.button}>
                  Ver curso
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔥 PAGINACIÓN */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>

        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          ⬅
        </button>

        {getPages().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              margin: "0 5px",
              fontWeight: page === num ? "bold" : "normal"
            }}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          ➡
        </button>

      </div>

    </div>
  );
}

//////////////////////////////////////
// 🎨 ESTILOS PRO (MISMO LOGIN)
//////////////////////////////////////

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
      url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  navbar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  position: "relative",   // 🔥 CLAVE
  zIndex: 1000            // 🔥 CLAVE
},

  menuTrigger: {
    position: "relative",
    cursor: "pointer",
    fontWeight: "bold",
    padding: "8px 14px",
    borderRadius: "8px",
    background: "#f1f5f9"
  },

  dropdown: {
  position: "absolute",
  top: "60px",
  left: "50%",
  transform: "translateX(-50%)",
  minWidth: "220px",
  background: "rgba(255,255,255,0.98)",
  padding: "15px 10px",
  borderRadius: "14px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  backdropFilter: "blur(12px)",
  zIndex: 9999,
  animation: "fadeDown 0.25s ease"
},
categoryItem: {
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s",
},
card: {
  position: "relative",
  zIndex: 1   // bajo
},
  categoryItem: {
    cursor: "pointer",
    padding: "6px"
  },

  link: {
    marginLeft: "10px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #4f46e5",
    background: "rgba(79,70,229,0.1)",
    textDecoration: "none",
    color: "#4f46e5",
    fontWeight: "bold"
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: "42px",
    marginTop: "30px",
    textShadow: "2px 2px 10px rgba(0,0,0,0.7)"
  },

 grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: "30px",
  position: "relative",
  zIndex: 1   // 🔥 MÁS BAJO
},

  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "12px",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "0.3s"
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
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  },

  resetButton: {
    margin: "15px",
    padding: "10px 18px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  dateInput: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }
};

export default Courses;
