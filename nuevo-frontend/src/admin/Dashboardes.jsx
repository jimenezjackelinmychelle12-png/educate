import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaHome,
  FaTasks,
  FaBookOpen,
  FaCog,
  FaUserCircle,
  FaSearch,
  FaBell,
  FaBook,
  FaClipboardList,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import "./dashboard.css";

const Dashboard2 = () => {
  const [student, setStudent] = useState({
    nombre: "Estudiante",
    rol: "student",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setStudent({
        nombre: user.nombre || user.name || "Estudiante",
        rol: user.rol || user.tipo || "student",
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 👇 REDIRECCIONAR A INICIO CON NOMBRE
  const irInicio = () => {
    navigate("/", {
      state: {
        nombre: student.nombre,
      },
    });
  };

  const firstLetter = student.nombre.charAt(0).toUpperCase();

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-top">
          <div className="dashboard-logo">
            <FaUserGraduate />
            <span>EduPlatform Student</span>
          </div>

          <p className="dashboard-label">ESTUDIANTE</p>

          <ul className="dashboard-menu">
            <li className="active">
              <Link to="/dashboard2">
                <FaHome /> Inicio
              </Link>
            </li>

            <li>
              <Link to="/tasks">
                <FaTasks /> Tareas
              </Link>
            </li>

            {/* 👇 BOTÓN CURSOS */}
            <li>
              <button onClick={irInicio} className="menu-btn">
                <FaBookOpen /> Cursos
              </button>
            </li>

            <li>
              <Link to="/settings">
                <FaCog /> Configuración
              </Link>
            </li>

            <li>
              <Link to="/profile">
                <FaUserCircle /> Perfil
              </Link>
            </li>

            {/* LOGOUT */}
            <li onClick={logout} className="logout-item">
              <FaSignOutAlt /> Cerrar sesión
            </li>
          </ul>
        </div>

        {/* USER PROFILE */}
        <div className="dashboard-profile">
          <div className="dashboard-avatar">{firstLetter}</div>
          <div>
            <h4>{student.nombre}</h4>
            <p>Panel Académico</p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Hola, {student.nombre} 👋</h1>
            <p>Gestiona tus cursos, tareas y progreso académico</p>
          </div>

          <div className="dashboard-actions">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Buscar cursos o tareas..." />
            </div>

            <button className="notify-btn">
              <FaBell />
            </button>
          </div>
        </div>

        <section className="dashboard-hero">
          <h2>Bienvenido de nuevo, {student.nombre} 🚀</h2>

          <p>
            Continúa aprendiendo, revisa tus tareas y mantén tu progreso bajo
            control.
          </p>

          <div className="quick-actions">
            {/* 👇 BOTÓN EXPLORAR CURSOS */}
            <button onClick={irInicio} className="quick-btn primary">
              Explorar cursos
            </button>

            <Link to="/tasks" className="quick-btn secondary">
              Ver tareas
            </Link>
          </div>
        </section>

        <div className="dashboard-cards">
          <div className="stat-card blue card">
            <div>
              <h3>Cursos</h3>
              <p>6</p>
            </div>

            <FaBook className="card-icon" />
          </div>

          <div className="stat-card orange card">
            <div>
              <h3>Tareas</h3>
              <p>12</p>
            </div>

            <FaClipboardList className="card-icon" />
          </div>

          <div className="stat-card green card">
            <div>
              <h3>Progreso</h3>
              <p>78%</p>
            </div>

            <FaChartLine className="card-icon" />
          </div>
        </div>

        <section className="dashboard-table-card">
          <div className="table-top">
            <h2>Proyectos Académicos</h2>
            <span>Este mes</span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Progreso</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="3" className="empty-row">
                    No hay proyectos registrados aún.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard2;