import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSearch,
  FaStar,
  FaClock,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [categoria, setCategoria] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [search, setSearch] = useState("");

  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showPriceMenu, setShowPriceMenu] = useState(false);

  // 👤 ESTUDIANTE LOGEADO
  const [student, setStudent] = useState({
    nombre: "Estudiante",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 Obtiene el usuario logeado
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("usuario"));

    if (user) {
      setStudent({
        nombre:
          `${user.nombre || ""} ${user.apellidoPaterno || ""}`.trim() ||
          user.name ||
          "Estudiante",
      });
    }
  }, []);

  // 🔓 CERRAR SESIÓN
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // 🔤 INICIAL DEL PERFIL
  const firstLetter = student.nombre.charAt(0).toUpperCase();

  const categories = [
    "Programación",
    "Backend",
    "Frontend",
    "Desarrollo",
    "Negocios",
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let url = `http://localhost:9095/cursos?pageNumber=${page}&pageSize=6`;

        if (categoria.trim()) url += `&categoria=${categoria}`;

        if (priceFilter === "0-50")
          url += `&precioMin=0&precioMax=50`;

        if (priceFilter === "50-100")
          url += `&precioMin=50&precioMax=100`;

        if (priceFilter === "100+") url += `&precioMin=100`;

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

  const filteredCourses = useMemo(() => {
    return courses.filter((c) =>
      (c.titulo || c.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [courses, search]);

  const getPages = () => {
    const start = Math.max(0, page - 2);
    const end = Math.min(totalPages, page + 3);

    return [...Array(end - start).keys()].map((i) => start + i);
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <header style={styles.navbar}>
        {/* LOGO */}
        <Link to="/dashboard2" style={styles.logoWrap}>
          <div style={styles.logoBadge}>🎓</div>

          <h2 style={styles.logoText}>
            EduPlatform
          </h2>
        </Link>
        <div style={styles.navCenter}>
          {/* SEARCH */}
          <div style={styles.searchBox}>
            <FaSearch style={{ color: "#64748b", marginRight: 8 }} />

            <input
              type="text"
              placeholder="Buscar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* FILTERS */}
          <div style={styles.filterRow}>
            <div style={styles.menuTrigger}>
              <span
                onClick={() => {
                  setShowCategoryMenu(!showCategoryMenu);
                  setShowPriceMenu(false);
                }}
              >
                <FaFilter style={{ marginRight: 6 }} />
                Categoría {showCategoryMenu ? "▲" : "▼"}
              </span>

              {showCategoryMenu && (
                <div style={styles.dropdown}>
                  {categories.map((cat) => (
                    <p
                      key={cat}
                      style={styles.categoryItem}
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

            <div style={styles.menuTrigger}>
              <span
                onClick={() => {
                  setShowPriceMenu(!showPriceMenu);
                  setShowCategoryMenu(false);
                }}
              >
                💰 Precio {showPriceMenu ? "▲" : "▼"}
              </span>

              {showPriceMenu && (
                <div style={styles.dropdown}>
                  <p
                    onClick={() => {
                      setPriceFilter("0-50");
                      setPage(0);
                      setShowPriceMenu(false);
                    }}
                    style={styles.categoryItem}
                  >
                    $0 - $50
                  </p>

                  <p
                    onClick={() => {
                      setPriceFilter("50-100");
                      setPage(0);
                      setShowPriceMenu(false);
                    }}
                    style={styles.categoryItem}
                  >
                    $50 - $100
                  </p>

                  <p
                    onClick={() => {
                      setPriceFilter("100+");
                      setPage(0);
                      setShowPriceMenu(false);
                    }}
                    style={styles.categoryItem}
                  >
                    $100+
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setCategoria("");
                setPriceFilter("");
                setSearch("");
                setPage(0);
              }}
              style={styles.resetButton}
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* 👤 PERFIL DEL ESTUDIANTE */}
        <div style={styles.profileBox}>
          <div style={styles.avatar}>
            {firstLetter}
          </div>

          <div>
            <h4 style={styles.userName}>
              {student.nombre}
            </h4>

            <p style={styles.userRole}>
              Estudiante
            </p>
          </div>

          <button
            onClick={logout}
            style={styles.logoutBtn}
          >
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          Bienvenido {student.nombre} 🚀
        </h1>

        <p style={styles.subtitle}>
          Explora cursos premium y continúa creciendo profesionalmente
        </p>
      </section>

      {/* GRID */}
      <div style={styles.grid}>
        {filteredCourses.length === 0 ? (
          <div style={styles.emptyBox}>
            <h3 style={{ color: "#fff", fontSize: "28px" }}>
              No hay cursos disponibles
            </h3>

            <p style={{ color: "#cbd5e1" }}>
              Prueba con otro filtro o búsqueda
            </p>
          </div>
        ) : (
          filteredCourses.map((c) => (
            <div
              key={c.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.15)";
              }}
            >
              <img
                src={c.imagen || c.image}
                alt={c.titulo || c.title}
                style={styles.image}
              />

              <div style={styles.content}>
                <div style={styles.badgeRow}>
                  <span style={styles.badge}>
                    {c.categoria || c.category}
                  </span>

                  <span style={styles.rating}>
                    <FaStar size={12} /> 4.8
                  </span>
                </div>

                <h3 style={styles.cardTitle}>
                  {c.titulo || c.title}
                </h3>

                <div style={styles.metaRow}>
                  <span style={styles.meta}>
                    <FaClock size={12} /> 8 horas
                  </span>

                  <span style={styles.price}>
                    ${c.precio || c.price}
                  </span>
                </div>

                <Link
                  to={`/curso/${c.id}`}
                  state={{ curso: c }}
                  style={{ textDecoration: "none" }}
                >
                  <button style={styles.button}>Ver curso</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div style={styles.pagination}>
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          style={styles.pageBtn}
        >
          <FaChevronLeft />
        </button>

        {getPages().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              ...styles.pageBtn,
              ...(page === num
                ? styles.pageBtnActive
                : {}),
            }}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          style={styles.pageBtn}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    fontFamily: "Arial, sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 32px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

logoWrap: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
  cursor: "pointer",
},

  logoBadge: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",
    fontSize: "20px",
  },

  logoText: {
    color: "#fff",
    margin: 0,
    fontSize: "24px",
  },

  navCenter: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    padding: "10px 14px",
    borderRadius: "14px",
    width: "320px",
  },

  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
  },

  filterRow: {
    display: "flex",
    gap: "12px",
  },

  menuTrigger: {
    position: "relative",
    cursor: "pointer",
    fontWeight: "bold",
    padding: "10px 14px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
  },

  dropdown: {
    position: "absolute",
    top: "55px",
    left: 0,
    minWidth: "200px",
    background: "#fff",
    borderRadius: "14px",
    padding: "10px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    zIndex: 999,
  },

  categoryItem: {
    padding: "10px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#0f172a",
  },

  resetButton: {
    border: "none",
    padding: "10px 16px",
    borderRadius: "12px",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* 👤 PERFIL */
  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.1)",
    padding: "10px 14px",
    borderRadius: "16px",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
  },

  userName: {
    margin: 0,
    color: "#fff",
    fontSize: "14px",
  },

  userRole: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "12px",
  },

  logoutBtn: {
    border: "none",
    background: "rgba(239,68,68,0.15)",
    color: "#fff",
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    padding: "60px 20px 30px",
  },

  title: {
    color: "#fff",
    fontSize: "52px",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    padding: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.96)",
    borderRadius: "22px",
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },

  content: {
    padding: "18px",
  },

  badgeRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },

  badge: {
    background: "#e0e7ff",
    color: "#4338ca",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#f59e0b",
    fontSize: "13px",
    fontWeight: "bold",
  },

  cardTitle: {
    fontSize: "20px",
    color: "#0f172a",
    marginBottom: "14px",
  },

  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },

  meta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#64748b",
    fontSize: "13px",
  },

  price: {
    color: "#4f46e5",
    fontWeight: "bold",
    fontSize: "22px",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  },

  emptyBox: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px 0 40px",
  },

  pageBtn: {
    width: "42px",
    height: "42px",
    border: "none",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  pageBtnActive: {
    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",
  },
};

export default Courses;