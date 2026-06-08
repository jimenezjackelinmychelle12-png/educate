import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaHome,
  FaHistory,
  FaFlask,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaUsers,
  FaUserShield,
  FaUserGraduate,
  FaEye,
  FaTrashAlt,
  FaUserCog,
} from "react-icons/fa";
import "./dashboard.css";

const Dashboardadmin = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // 👤 TRAER USUARIO LOGUEADO
  // =========================
  const [adminData, setAdminData] = useState({
    nombre: "Administrador",
    inicial: "A",
  });

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);

      const nombreCompleto = `${usuario.nombre || ""} ${
        usuario.apellidoPaterno || ""
      } ${usuario.apellidoMaterno || ""}`.trim();

      setAdminData({
        nombre: nombreCompleto || "Administrador",
        inicial: (usuario.nombre || "A").charAt(0).toUpperCase(),
      });
    }
  }, []);

  // =========================
  // OBTENER USUARIOS
  // =========================
  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:9095/api/usuarios");
      if (!res.ok) throw new Error("Error al obtener usuarios");

      const data = await res.json();
      setUsuarios(data);
      setUsuariosFiltrados(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la información");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // =========================
  // FILTRAR USUARIOS
  // =========================
  useEffect(() => {
    const filtrados = usuarios.filter((user) => {
      const texto =
        `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno} ${user.correo} ${user.tipo}`.toLowerCase();

      return texto.includes(busqueda.toLowerCase());
    });

    setUsuariosFiltrados(filtrados);
  }, [busqueda, usuarios]);

  // =========================
  // STATS
  // =========================
  const stats = useMemo(() => {
    const total = usuarios.length;
    const admins = usuarios.filter(
      (u) => u.tipo?.trim().toUpperCase() === "ADMIN"
    ).length;
    const estudiantes = usuarios.filter(
      (u) => u.tipo?.trim().toUpperCase() === "ESTUDIANTE"
    ).length;
    const docentes = usuarios.filter(
      (u) => u.tipo?.trim().toUpperCase() === "DOCENTE"
    ).length;

    return { total, admins, estudiantes, docentes };
  }, [usuarios]);

  // =========================
  // CERRAR SESIÓN
  // =========================
  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usuario");
        navigate("/login");
      }
    });
  };

  // =========================
  // MOSTRAR / EDITAR USUARIO
  // =========================
  const mostrarUsuario = (user) => {
  const tipo = user.tipo?.trim().toUpperCase();

  // 🔒 No permitir modificar ADMIN
  if (tipo === "ADMIN") {
    Swal.fire({
      title: "👑 Usuario Administrador",
      html: `
        <div style="text-align:left; line-height:1.8">
          <p><b>Nombre:</b> ${user.nombre}</p>
          <p><b>Correo:</b> ${user.correo}</p>
          <p><b>Rol:</b> ${user.tipo}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#2563eb",
    });
    return;
  }

  Swal.fire({
    title: "Editar tipo de usuario",
    html: `
      <div style="text-align:left; line-height:1.8">
        <p><b>Nombre:</b> ${user.nombre}</p>
        <p><b>Correo:</b> ${user.correo}</p>

        <label><b>Tipo:</b></label>
        <select id="tipo" class="swal2-select">
          <option value="DOCENTE" ${tipo === "DOCENTE" ? "selected" : ""}>Docente</option>
          <option value="ESTUDIANTE" ${tipo === "ESTUDIANTE" ? "selected" : ""}>Estudiante</option>
        </select>
      </div>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    confirmButtonColor: "#2563eb",

    preConfirm: () => {
      const nuevoTipo = document.getElementById("tipo").value.toUpperCase();

      if (nuevoTipo === tipo) {
        Swal.showValidationMessage("Selecciona un tipo diferente");
        return false;
      }

      return nuevoTipo;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      cambiarTipo(user.id, result.value);
    }
  });
};
const cambiarTipoRapido = async (user) => {
  const tipoActual = user.tipo?.trim().toUpperCase();

  // 🔒 No modificar ADMIN
  if (tipoActual === "ADMIN") {
    Swal.fire("Bloqueado", "No puedes modificar un ADMIN", "warning");
    return;
  }

  // 🔄 Alternar tipo
  const nuevoTipo =
    tipoActual === "DOCENTE" ? "ESTUDIANTE" : "DOCENTE";

  try {
    Swal.fire({
      title: "Cambiando...",
      text: `${tipoActual} → ${nuevoTipo}`,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await fetch(
      `http://localhost:9095/api/usuarios/${user.id}/tipo`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo: nuevoTipo }),
      }
    );

    const data = await res.text();

    if (!res.ok) throw new Error(data);

    Swal.fire("Actualizado", `${tipoActual} → ${nuevoTipo}`, "success");

    obtenerUsuarios(); // 🔄 refrescar tabla
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};
const toggleBloqueo = async (user) => {
  const accion = user.bloqueado ? "desbloquear" : "bloquear";

  Swal.fire({
    title: `¿${accion.charAt(0).toUpperCase() + accion.slice(1)} usuario?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: `Sí, ${accion}`,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#dc2626",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:9095/api/usuarios/${user.id}/bloqueo`,
          {
            method: "PUT",
          }
        );

        if (!res.ok) throw new Error();

        Swal.fire(
          "Actualizado",
          `Usuario ${accion}do correctamente`,
          "success"
        );

        obtenerUsuarios();

      } catch {
        Swal.fire("Error", "No se pudo actualizar", "error");
      }
    }
  });
};


  const cambiarTipo = async (id, nuevoTipo) => {
  try {
    // 🔄 Loading
    Swal.fire({
      title: "Actualizando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await fetch(
      `http://localhost:9095/api/usuarios/${id}/tipo`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo: nuevoTipo.toUpperCase() }),
      }
    );

    const data = await res.text();

    if (!res.ok) {
      throw new Error(data);
    }

    // ✅ Éxito
    Swal.fire({
      title: "Actualizado",
      text: data,
      icon: "success",
      confirmButtonColor: "#2563eb",
    });

    obtenerUsuarios(); // 🔄 recargar tabla

  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.message || "No se pudo actualizar",
      icon: "error",
      confirmButtonColor: "#dc2626",
    });
  }
};

  const eliminarUsuario = (id) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:9095/api/usuarios/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error();

          Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
          obtenerUsuarios();
        } catch {
          Swal.fire("Error", "No se pudo eliminar", "error");
        }
      }
    });
  };
  
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div>
          <div className="dashboard-logo">
            <FaUserShield />
            <span>Rox Admin</span>
          </div>

          <p className="dashboard-label">ADMINISTRADOR</p>

          <ul className="dashboard-menu">
            <li className="active">
              <Link to="/dashboard">
                <FaHome /> Inicio
              </Link>
            </li>

            <li>
              <Link to="/reporte">
                <FaHistory /> Historial
              </Link>
            </li>

            <li>
              <Link to="/demo">
                <FaFlask /> Demo
              </Link>
            </li>

            <li onClick={cerrarSesion}>
              <FaSignOutAlt /> Cerrar sesión
            </li>
          </ul>
        </div>

        <div className="dashboard-profile">
          <div className="dashboard-avatar">{adminData.inicial}</div>
          <div>
            <h4>{adminData.nombre}</h4>
            <p>Control total</p>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Panel de Administración</h1>
            <p>Gestiona usuarios, roles y accesos de la plataforma</p>
          </div>

          <div className="dashboard-actions">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <button className="notify-btn">
              <FaBell />
            </button>
          </div>
        </header>

        <section className="dashboard-hero">
          <h2>Bienvenido, {adminData.nombre} 👑</h2>
          <p>Administra usuarios, permisos y mantén el control total del sistema.</p>
        </section>

        <div className="dashboard-cards">
          <div className="stat-card blue">
            <div className="stat-icon"><FaUsers /></div>
            <div>
              <h3>Total Usuarios</h3>
              <p>{stats.total}</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon"><FaUserGraduate /></div>
            <div>
              <h3>Estudiantes</h3>
              <p>{stats.estudiantes}</p>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon"><FaUserCog /></div>
            <div>
              <h3>Docentes</h3>
              <p>{stats.docentes}</p>
            </div>
          </div>

          <div className="stat-card dark">
            <div className="stat-icon"><FaUserShield /></div>
            <div>
              <h3>Admins</h3>
              <p>{stats.admins}</p>
            </div>
          </div>
        </div>

        <section className="dashboard-table-card">
          <div className="table-top">
            <h2>Usuarios registrados</h2>
            <span>{usuariosFiltrados.length} resultados</span>
          </div>

          {loading && <p className="table-message">Cargando usuarios...</p>}
          {error && <p className="table-error">{error}</p>}

          {!loading && !error && (
            <div className="table-wrapper">
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
                  {usuariosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-row">
                        No se encontraron usuarios
                      </td>
                    </tr>
                  ) : (
                    usuariosFiltrados.map((user) => (
                      <tr key={user.id} style={{ backgroundColor: user.bloqueado ? "#acacac9d" : "",
                                                color: user.bloqueado ? "#fff" : "", 
                                                opacity: user.bloqueado ? 0.8 : 1, }}>
                        <td>{user.nombre}</td>
                        <td>{user.apellidoPaterno}</td>
                        <td>{user.apellidoMaterno}</td>
                        <td>{user.correo}</td>
                        <td>
                          <span
                            className={`badge ${user.tipo?.toLowerCase()}`}
                            style={{
                              opacity: user.bloqueado ? 0.6 : 1,
                            }}
                          >
                            {user.tipo} {user.bloqueado && "🚫"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-view"
                              onClick={() => mostrarUsuario(user)}
                            >
                              <FaEye /> Editar
                            </button>

                            <button
                              className="btn-delete"
                              onClick={() => eliminarUsuario(user.id)}
                            >
                              <FaTrashAlt /> Eliminar
                            </button>
                            <button
                              className={`btn-block ${user.bloqueado ? "bloqueado" : ""}`}
                              onClick={() => toggleBloqueo(user)}
                              disabled={user.tipo === "ADMIN"}
                            >
                              {user.tipo === "ADMIN"
                                ? "👑 Admin"
                                : user.bloqueado
                                ? "🔓 Desbloquear"
                                : "🔒 Bloquear"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboardadmin;