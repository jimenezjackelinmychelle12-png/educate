import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
const Dashboarddoc = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li className="active">Inicio</li>
          <li>Tareas</li>
          <li>Usuarios</li>
          <li>Configuración</li>
        </ul>
        <li>
         <Link to="/login">Profile</Link>
        </li>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="header">
          <h1>Panel de control</h1>
          <input type="text" placeholder="Buscar..." />
        </header>

       

        {/* Tabla */}
        <section className="table-section">
          <h2>Proyectos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Progreso</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
        </section>

    
      </main>
    </div>
  );
};

export default Dashboarddoc;