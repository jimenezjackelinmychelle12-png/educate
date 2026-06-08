import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaClock,
  FaStar,
  FaUserGraduate,
  FaArrowLeft,
  FaPlayCircle,
  FaHeart,
} from "react-icons/fa";

function InfCur() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  const [inscritos, setInscritos] = useState([]);
  const [showStudents, setShowStudents] = useState(false);

  // 👤 Usuario logeado
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("usuario")) ||
    {};

  // 👤 Nombre completo
  const studentName = `
    ${user?.nombre || user?.name || ""}
    ${user?.apellidoPaterno || ""}
    ${user?.apellidoMaterno || ""}
  `
    .replace(/\s+/g, " ")
    .trim();

  // 👑 Nombre final
  const displayName =
    studentName && studentName.length > 0
      ? studentName
      : "Estudiante";

  // 🔠 Inicial
  const firstLetter = displayName.charAt(0).toUpperCase();

  // 🚀 INSCRIBIRSE
  const inscribirse = async () => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("usuario"));

      if (!user) {
        alert("Debes iniciar sesión");
        return;
      }

      const res = await fetch(
        "http://localhost:9095/inscripciones",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuarioId: user.id,
            cursoId: parseInt(id),
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      alert("Inscripción exitosa 🚀");

      // 🔄 RECARGAR INSCRITOS
      obtenerInscritos();

    } catch (error) {
      console.error(error);
      alert("Ya estás inscrito o ocurrió un error");
    }
  };

  // 👨‍🎓 OBTENER INSCRITOS
  const obtenerInscritos = async () => {
    try {
      const res = await fetch(
        `http://localhost:9095/inscripciones/curso/${id}`
      );

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      setInscritos(data);

    } catch (error) {
      console.error(error);
    }
  };

  // 📚 OBTENER CURSO
  useEffect(() => {
    const obtenerCurso = async () => {
      try {
        const res = await fetch(
          `http://localhost:9095/cursos/${id}`
        );

        if (!res.ok) {
          throw new Error("Curso no encontrado");
        }

        const data = await res.json();

        setCurso(data);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    obtenerCurso();
    obtenerInscritos();

  }, [id]);

  // ⏳ Loading
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h2 style={{ color: "#fff" }}>
          Cargando curso...
        </h2>
      </div>
    );
  }

  // ❌ Error
  if (!curso) {
    return (
      <div style={styles.loadingContainer}>
        <h2 style={{ color: "#fff" }}>
          Curso no encontrado
        </h2>
      </div>
    );
  }

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

        {/* PERFIL */}
        <div
          style={styles.profileBox}
          onClick={() => navigate("/profile")}
        >
          <div style={styles.avatar}>
            {firstLetter}
          </div>

          <div>
            <h4 style={styles.userName}>
              {displayName}
            </h4>

            <p style={styles.userRole}>
              Perfil del estudiante
            </p>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div style={styles.content}>

        {/* VOLVER */}
        <button
          onClick={() => navigate("/")}
          style={styles.backBtn}
        >
          <FaArrowLeft />
          Volver a cursos
        </button>

        {/* CARD */}
        <div style={styles.courseCard}>

          {/* IMAGEN */}
          <img
            src={curso.imagen || curso.image}
            alt={curso.titulo || curso.title}
            style={styles.image}
          />

          {/* INFO */}
          <div style={styles.info}>

            <span style={styles.category}>
              {curso.categoria || curso.category}
            </span>

            <h1 style={styles.title}>
              {curso.titulo || curso.title}
            </h1>

            <p style={styles.description}>
              {curso.descripcion ||
                "Curso premium diseñado para mejorar tus habilidades profesionales y técnicas."}
            </p>

            {/* META */}
            <div style={styles.metaRow}>

              <div style={styles.meta}>
                <FaClock />
                8 horas
              </div>

              <div style={styles.meta}>
                <FaUserGraduate />
                {inscritos.length} estudiantes
              </div>

              <div style={styles.meta}>
                <FaStar />
                4.9
              </div>

            </div>

            {/* PRECIO */}
            <div style={styles.price}>
              ${curso.precio || curso.price}
            </div>

            {/* BOTONES */}
            <div style={styles.buttons}>

              <button
                style={styles.primaryBtn}
                onClick={inscribirse}
              >
                <FaPlayCircle />
                Inscribirse
              </button>

              <button style={styles.secondaryBtn}>
                <FaHeart />
                Añadir a favoritos
              </button>

              <button
                style={styles.studentsBtn}
                onClick={() =>
                  setShowStudents(!showStudents)
                }
              >
                👨‍🎓 Ver inscritos
              </button>

            </div>
          </div>
        </div>

        {/* LISTA DE INSCRITOS */}
            {showStudents && (
            <div style={styles.studentsSection}>

                <h2 style={styles.sectionTitle}>
                Estudiantes inscritos
                </h2>

                {inscritos.length === 0 ? (

                <p style={styles.emptyText}>
                    No hay estudiantes inscritos
                </p>

                ) : (

                inscritos.map((inscrito, index) => (

                    <div
                    key={index}
                    style={styles.studentCard}
                    >

                    {/* AVATAR */}
                    <div style={styles.studentAvatar}>
                        {inscrito.nombreUsuario
                        ?.charAt(0)
                        ?.toUpperCase() || "E"}
                    </div>

                    {/* INFO */}
                    <div>

                        <h4 style={styles.studentName}>
                        {inscrito.nombreUsuario}{" "}
                        {inscrito.apellidoUsuario}
                        </h4>

                        <p style={styles.studentEmail}>
                        ID Usuario: {inscrito.usuarioId}
                        </p>

                    </div>
                    </div>

                ))

                )}

            </div>
            )}

        {/* EXTRA */}
        <div style={styles.extraSection}>

          <h2 style={styles.sectionTitle}>
            ¿Qué aprenderás?
          </h2>

          <ul style={styles.list}>
            <li>✅ Dominar conceptos avanzados</li>
            <li>✅ Crear proyectos reales</li>
            <li>✅ Mejorar tu perfil profesional</li>
            <li>✅ Aprender buenas prácticas</li>
            <li>✅ Aplicar proyectos reales en producción</li>
          </ul>

        </div>
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
    paddingBottom: "50px",
  },

  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
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
    fontWeight: "bold",
  },

  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.1)",
    padding: "10px 14px",
    borderRadius: "16px",
    cursor: "pointer",
  },

  avatar: {
    width: "46px",
    height: "46px",
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
    fontWeight: "bold",
  },

  userRole: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "12px",
  },

  content: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "0 20px",
  },

  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "24px",
    background: "rgba(255,255,255,0.08)",
    padding: "12px 18px",
    borderRadius: "14px",
    fontWeight: "bold",
    fontSize: "14px",
  },

  courseCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "28px",
    overflow: "hidden",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  image: {
    width: "100%",
    height: "100%",
    minHeight: "500px",
    objectFit: "cover",
  },

  info: {
    padding: "40px",
    color: "#fff",
  },

  category: {
    background: "rgba(79,70,229,0.2)",
    color: "#c7d2fe",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
    display: "inline-block",
    marginBottom: "20px",
  },

  title: {
    fontSize: "42px",
    marginBottom: "20px",
    lineHeight: "1.2",
  },

  description: {
    color: "#cbd5e1",
    fontSize: "17px",
    lineHeight: "1.8",
    marginBottom: "24px",
  },

  metaRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  meta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.08)",
    padding: "10px 14px",
    borderRadius: "12px",
    color: "#fff",
  },

  price: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#a5b4fc",
    marginBottom: "28px",
  },

  buttons: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    border: "none",
    padding: "14px 24px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
  },

  secondaryBtn: {
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "14px 24px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  studentsBtn: {
    border: "none",
    padding: "14px 24px",
    borderRadius: "16px",
    background: "#0ea5e9",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  },

  studentsSection: {
    marginTop: "40px",
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "24px",
  },

  studentCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "rgba(255,255,255,0.06)",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "16px",
  },

  studentAvatar: {
    width: "50px",
    height: "50px",
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

  studentName: {
    color: "#fff",
    margin: 0,
  },

  studentEmail: {
    color: "#cbd5e1",
    margin: 0,
    fontSize: "14px",
  },

  emptyText: {
    color: "#cbd5e1",
  },

  extraSection: {
    marginTop: "40px",
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "24px",
    backdropFilter: "blur(12px)",
  },

  sectionTitle: {
    color: "#fff",
    marginBottom: "20px",
    fontSize: "28px",
  },

  list: {
    color: "#cbd5e1",
    lineHeight: "2.2",
    fontSize: "16px",
    paddingLeft: "20px",
  },
};

export default InfCur;