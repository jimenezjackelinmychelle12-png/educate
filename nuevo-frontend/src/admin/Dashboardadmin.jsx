import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./dashboard.css";

const Dashboardadmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Obtener usuarios
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

  // 🔥 VER + EDITAR (CON VALIDACIÓN ADMIN)
  const mostrarUsuario = (user) => {

    // 🔥 NORMALIZAR
    const tipo = user.tipo?.trim().toUpperCase();

    // ✅ ADMIN → SOLO VER (SIN COMBO)
    if (tipo === "ADMIN") {
      Swal.fire({
        title: "👤 Usuario ADMIN",
        html: `
          <p><b>Nombre:</b> ${user.nombre}</p>
          <p><b>Apellido:</b> ${user.apellidoPaterno} ${user.apellidoMaterno}</p>
          <p><b>Correo:</b> ${user.correo}</p>
          <p><b>Tipo:</b> ${user.tipo}</p>
        `,
        icon: "info"
      });
      return;
    }

    // ✅ NO ADMIN → MOSTRAR COMBO CON VALOR ACTUAL
    Swal.fire({
      title: "Editar Tipo de Usuario",
      html: `
        <p><b>Nombre:</b> ${user.nombre}</p>
        <p><b>Correo:</b> ${user.correo}</p>

        <label><b>Tipo:</b></label>
        <select id="tipo" class="swal2-select">
          <option value="DOCENTE" ${tipo === "DOCENTE" ? "selected" : ""}>Docente</option>
          <option value="ESTUDIANTE" ${tipo === "ESTUDIANTE" ? "selected" : ""}>Estudiante</option>
        </select>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        const nuevoTipo = document.getElementById("tipo").value;

        if (nuevoTipo === tipo) {
          Swal.showValidationMessage("Selecciona un tipo diferente");
        }

        return nuevoTipo;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarTipo(user.id, result.value);
      }
    });
  };

  // 🔄 CAMBIAR TIPO
  const cambiarTipo = (id, nuevoTipo) => {
    fetch(`http://localhost:9095/api/usuarios/${id}/tipo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tipo: nuevoTipo })
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        Swal.fire("Actualizado", "Tipo cambiado correctamente", "success");
        obtenerUsuarios();
      })
      .catch(() => {
        Swal.fire("Error", "No se pudo actualizar", "error");
      });
  };

  // ❌ ELIMINAR
  const eliminarUsuario = (id) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      text: "No se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:9095/api/usuarios/${id}`, {
          method: "DELETE"
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            Swal.fire("Eliminado", "Usuario eliminado", "success");
            obtenerUsuarios();
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo eliminar", "error");
          });
      }
    });
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li className="active">Inicio</li>
          <li><Link to="/reporte">Historial</Link></li>
          <li><Link to="/demo">Demostracion</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li>Configuración</li>
          <li><Link to="/login">Salir</Link></li>
        </ul>
      </aside>

      {/* MAIN */}
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
            <p>{usuarios.filter((u) => u.tipo?.trim().toUpperCase() !== "ADMIN").length}</p>
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
                  <th>Acciones</th>
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
                        <button onClick={() => mostrarUsuario(user)}>
                          👁️ Ver / Editar
                        </button>

                        <button
                          onClick={() => eliminarUsuario(user.id)}
                          style={{
                            marginLeft: "10px",
                            background: "red",
                            color: "white"
                          }}
                        >
                          🗑️ Eliminar
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

export default Dashboardadmin;