import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboardad1 = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 OBTENER USUARIOS
  const obtenerUsuarios = () => {
    fetch("http://localhost:9095/api/usuarios")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
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
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // 🔄 CAMBIAR TIPO
  const cambiarTipo = (id) => {
    const nuevoTipo = prompt("Nuevo tipo (DOCENTE / ESTUDIANTE)");

    if (!nuevoTipo) return;

    fetch(`http://localhost:9095/api/usuarios/${id}/tipo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tipo: nuevoTipo })
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Tipo actualizado");
        obtenerUsuarios(); // 🔄 refresca
      })
      .catch(() => {
        alert("Error al actualizar");
      });
  };

  // ❌ ELIMINAR
  const eliminarUsuario = (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;

    fetch(`http://localhost:9095/api/usuarios/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Usuario eliminado");
        obtenerUsuarios(); // 🔄 refresca
      })
      .catch(() => {
        alert("Error al eliminar");
      });
  };

  return (
    <div className="dashboard">
      {/* 🔹 SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li className="active">Inicio</li>

          <li>
            <Link to="/reporte">Historial</Link>
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

      {/* 🔹 MAIN */}
      <main className="main">
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
                  <th>Acciones</th> {/* 👈 agregado */}
                </tr>
              </thead>

              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="6">No hay usuarios</td>
                  </tr>
                ) : (
                  usuarios.map((user) => (
                    <tr key={user.id}>
                      <td>{user.nombre}</td>
                      <td>{user.apellidoPaterno}</td>
                      <td>{user.apellidoMaterno}</td>
                      <td>{user.correo}</td>
                      <td>{user.tipo}</td>

                      <td>
                        <button onClick={() => cambiarTipo(user.id)}>
                          Editar
                        </button>

                        <button
                          onClick={() => eliminarUsuario(user.id)}
                          style={{
                            marginLeft: "10px",
                            background: "red",
                            color: "white"
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
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

export default Dashboardad1;