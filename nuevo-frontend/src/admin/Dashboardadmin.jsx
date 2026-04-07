import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboardadmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  // 🔄 Cargar usuarios desde backend
  useEffect(() => {
    fetch("http://localhost:9095/api/usuarios")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener usuarios");
        }
        return res.json();
      })
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la información");
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      {/* 🔹 SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li className="active">Inicio</li>

          <li>
            <Link to="/historial">Historial</Link>
          </li>

        <li>
            <Link to="/demo">Demostracion</Link>

          </li>
          <li>
            <Link to="/profile">Profile</Link>
            
          </li>
          <li>Configuración</li>

          <li>
             <Link to="/login">Salir</Link>
          </li>
        </ul>
      </aside>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <main className="main">
        
        {/* HEADER */}
        <div className="header">
          <h1>Panel de Administración</h1>
          <input type="text" placeholder="Buscar..." />
        </div>

        {/* CARDS */}
        <div className="cards">
          <div className="card blue">
            <h3>Total Usuarios</h3>
            <p>{usuarios.length}</p>
          </div>

          <div className="card green">
            <h3>Activos</h3>
            <p>{usuarios.length}</p>
          </div>


          <div className="card dark">
            <h3>Otros</h3>
            <p>
              {usuarios.filter((u) => u.tipo !== "ADMIN").length}
            </p>
          </div>
        </div>

        {/* TABLA */}
        <section className="table-section">
          <h2>Usuarios</h2>

          {/* Estados */}
          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido P</th>
                  <th>Apellido M</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5">No hay usuarios</td>
                  </tr>
                ) : (
                  usuarios.map((user) => (
                    <tr key={user.id}>
                      <td>{user.nombre}</td>
                      <td>{user.apellidoPaterno}</td>
                      <td>{user.apellidoMaterno}</td>
                      <td>{user.correo}</td>
                      <td>{user.tipo}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </section>

      </main>
    </div>
  );
};

export default Dashboardadmin;