
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBook,
  FaUsers,
  FaPlusCircle,
  FaSearch,
  FaBell,
  FaGraduationCap,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";

import "./dashboard.css";

const Dashboard2 = () => {

  //////////////////////////////////////////
  // STATES
  //////////////////////////////////////////

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("new");

  const navigate = useNavigate();

  //////////////////////////////////////////
  // DOCENTE
  //////////////////////////////////////////

  const usuario =
    JSON.parse(localStorage.getItem("user"));

  const docenteNombre = usuario?.nombre || "";
  const docenteApellido = usuario?.apellido || "";

  const docenteCompleto =
    `${docenteNombre} ${docenteApellido}`.trim();

  //////////////////////////////////////////
  // TOKEN
  //////////////////////////////////////////

  const token = localStorage.getItem("token");

  //////////////////////////////////////////
  // GET COURSES
  //////////////////////////////////////////

  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const response = await fetch(
          "http://localhost:9095/cursos",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener cursos");
        }

        const data = await response.json();

        setCourses(data.content || []);

      } catch (error) {

        console.error(error);
        setCourses([]);

      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

  }, [token]);

  //////////////////////////////////////////
  // ORDEN (NUEVO ↔ VIEJO)
  //////////////////////////////////////////

  const sortedCourses = [...courses].sort((a, b) => {

    if (sortOrder === "new") {
      return b.id - a.id;
    }

    return a.id - b.id;
  });

  //////////////////////////////////////////
  // TOTAL STUDENTS
  //////////////////////////////////////////

  const totalStudents = Array.isArray(courses)
    ? courses.reduce(
        (acc, course) =>
          acc + (course.studentsCount || 0),
        0
      )
    : 0;

  //////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="dashboard-top">

          <div className="dashboard-logo">
            <FaGraduationCap />
            <span>EduPlatform</span>
          </div>

          <p className="dashboard-label">
            DOCENTE PANEL Rox
          </p>

          <ul className="dashboard-menu">

            <li className="active">
              <Link to="/dashboard">
                <FaChartLine />
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/CreateCourse">
                <FaPlusCircle />
                Crear Curso
              </Link>
            </li>

            <li>
              <button onClick={logout}>
                Salir
              </button>
            </li>

          </ul>

        </div>

        {/* PROFILE */}
        <div className="dashboard-profile">

          <div className="dashboard-avatar">
            {docenteCompleto?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h4>{docenteCompleto || "Docente"}</h4>
            <p>
              <FaUserTie style={{ marginRight: "8px" }} />
              Panel Educativo
            </p>
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* HEADER */}
        <div className="dashboard-header">

          <div>
            <h1>
              Bienvenido,{" "}
              <span style={{ color: "#2563eb", fontWeight: "800" }}>
                {docenteCompleto}
              </span>{" "}
              👋
            </h1>
            <p>Gestiona tus cursos y estudiantes</p>
          </div>

          <div className="dashboard-actions">

            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Buscar curso..." />
            </div>

            <button className="notify-btn">
              <FaBell />
            </button>

          </div>

        </div>

        {/* HERO */}
        <section className="dashboard-hero">
          <h2>Tus Cursos 🎓</h2>
          <p>Administra tus cursos fácilmente</p>
        </section>

        {/* STATS */}
        <section className="dashboard-cards">

          <div className="stat-card blue">
            <h3>Total Cursos</h3>
            <p>{courses.length}</p>
          </div>

          <div className="stat-card green">
            <h3>Estudiantes</h3>
            <p>{totalStudents}</p>
          </div>

        </section>

        {/* COURSES */}
        <section className="dashboard-table-card">

          <div className="table-top">

            <h2>Lista de Cursos</h2>

            <span>{courses.length} cursos</span>

            {/* BOTÓN ORDEN */}
            <button
              onClick={() =>
                setSortOrder(
                  sortOrder === "new" ? "old" : "new"
                )
              }
              style={{
                marginLeft: "10px",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              {sortOrder === "new"
                ? "🔽 Nuevos"
                : "🔼 Viejos"}
            </button>

          </div>

          {loading ? (
            <p>Cargando cursos...</p>
          ) : courses.length === 0 ? (
            <p>No tienes cursos</p>
          ) : (

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(300px,1fr))",
                gap: "20px",
              }}
            >

              {sortedCourses.map((course) => (

                <div
                  key={course.id}
                  style={{
                    background: "#fff",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                >

                  <img
                    src={course.imagenUrl}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ padding: "20px" }}>

                    <h3>{course.titulo}</h3>
                    <p>{course.descripcion}</p>

                    <p>📂 {course.categoria}</p>
                    <p>⏱ {course.duracionLeccion}</p>
                    <p>👨‍🎓 {course.studentsCount || 0}</p>
                    <p>💰 ${course.precio || 0}</p>

                    <Link to={`/teacher/course/${course.id}`}>
                      <button
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "none",
                          borderRadius: "14px",
                          background:
                            "linear-gradient(135deg,#2563eb,#3b82f6)",
                          color: "#fff",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Gestionar Curso
                      </button>
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
};

export default Dashboard2;