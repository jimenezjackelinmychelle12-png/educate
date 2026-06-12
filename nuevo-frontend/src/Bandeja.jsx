import { useEffect, useState } from "react";

const API = "http://localhost:9095/bandeja";
const API_USUARIOS = "http://localhost:9095/api/usuarios";

export default function Bandeja() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [contador, setContador] = useState(0);
  const [vista, setVista] = useState("inbox");

  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [emailEmisor, setEmailEmisor] = useState("");
  const [emailDestino, setEmailDestino] = useState("");

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [filtroLeido, setFiltroLeido] = useState("todos");

  // CONTADOR
  const cargarContador = async () => {
    const res = await fetch(`${API}/contador`);
    const data = await res.json();
    setContador(data);
  };

  // USUARIOS
  const cargarUsuarios = async () => {
    try {
      const res = await fetch(API_USUARIOS);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  // NOTIFICACIONES
  const cargarNotificaciones = async (
    pagina = 0,
    tipo = vista
  ) => {
    let url = `${API}?page=${pagina}`;

    if (tipo === "archivadas") {
      url = `${API}/archivadas?page=${pagina}`;
    }

    if (tipo === "papelera") {
      url = `${API}/papelera?page=${pagina}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setNotificaciones(data.content);
    setPage(data.number);
    setTotalPages(data.totalPages);

    cargarContador();
  };

  useEffect(() => {
    cargarNotificaciones();
    cargarUsuarios();
  }, []);

  // CREAR
  const crearNotificacion = async () => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        mensaje,
        emailEmisor,
        emailDestino,
      }),
    });

    setTitulo("");
    setMensaje("");
    setEmailEmisor("");
    setEmailDestino("");

    cargarNotificaciones(page);
  };

  // ACCIONES
  const marcarLeida = (id) =>
    fetch(`${API}/${id}/leer`, {
      method: "PUT",
    });

  const archivar = (id) =>
    fetch(`${API}/${id}/archivar`, {
      method: "PUT",
    });

  const enviarPapelera = (id) =>
    fetch(`${API}/${id}/papelera`, {
      method: "PUT",
    });

  const restaurar = (id) =>
    fetch(`${API}/${id}/restaurar`, {
      method: "PUT",
    });

  // FILTRO
  const notificacionesFiltradas =
    notificaciones.filter((n) => {
      const fecha = new Date(n.fechaEnvio);

      if (
        fechaDesde &&
        fecha < new Date(fechaDesde)
      ) {
        return false;
      }

      if (fechaHasta) {
        const hasta = new Date(fechaHasta);

        hasta.setHours(
          23,
          59,
          59,
          999
        );

        if (fecha > hasta) {
          return false;
        }
      }

      if (
        filtroLeido === "leidas" &&
        !n.leido
      ) {
        return false;
      }

      if (
        filtroLeido === "noleidas" &&
        n.leido
      ) {
        return false;
      }

      return true;
    });

 

return (
  <div
    style={{
      padding: 20,
      maxWidth: 1200,
      margin: "auto",
      fontFamily: "Arial",
    }}
  >
    <h1>🔔 Sistema de Notificaciones</h1>

    {/* CONTADOR */}
    <div
      style={{
        marginBottom: 20,
        padding: 10,
        background: "#f3f4f6",
        borderRadius: 10,
      }}
    >
      <strong>
        🔔 No leídas: {contador}
      </strong>
    </div>

    {/* FILTROS */}
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        display: "flex",
        gap: 15,
        flexWrap: "wrap",
        alignItems: "end",
        background: "#fafafa",
      }}
    >
      <div>
        <label>📅 Fecha Desde</label>
        <br />
        <input
          type="date"
          value={fechaDesde}
          onChange={(e) =>
            setFechaDesde(e.target.value)
          }
        />
      </div>

      <div>
        <label>📅 Fecha Hasta</label>
        <br />
        <input
          type="date"
          value={fechaHasta}
          onChange={(e) =>
            setFechaHasta(e.target.value)
          }
        />
      </div>

      <div>
        <label>📖 Estado</label>
        <br />
        <select
          value={filtroLeido}
          onChange={(e) =>
            setFiltroLeido(e.target.value)
          }
        >
          <option value="todos">
            Todos
          </option>
          <option value="leidas">
            Leídas
          </option>
          <option value="noleidas">
            No Leídas
          </option>
        </select>
      </div>

      <button
        onClick={() => {
          setFechaDesde("");
          setFechaHasta("");
          setFiltroLeido("todos");
        }}
      >
        Limpiar filtros
      </button>
    </div>

    {/* MENÚ */}
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <button
        onClick={() => {
          setVista("inbox");
          cargarNotificaciones(0, "inbox");
        }}
      >
        📥 Bandeja
      </button>

      <button
        onClick={() => {
          setVista("archivadas");
          cargarNotificaciones(
            0,
            "archivadas"
          );
        }}
      >
        📦 Archivadas
      </button>

      <button
        onClick={() => {
          setVista("papelera");
          cargarNotificaciones(
            0,
            "papelera"
          );
        }}
      >
        🗑️ Papelera
      </button>
    </div>

    {/* FORMULARIO */}
    <div
      style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <h3>Nueva Notificación</h3>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) =>
          setTitulo(e.target.value)
        }
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      />

      <textarea
        placeholder="Mensaje"
        value={mensaje}
        onChange={(e) =>
          setMensaje(e.target.value)
        }
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      />
    <select
  value={emailEmisor}
  onChange={(e) =>
    setEmailEmisor(e.target.value)
  }
  style={{
    width: "100%",
    padding: 10,
    marginBottom: 10,
  }}
>
  <option value="">
    Seleccione Emisor
  </option>

  {usuarios.map((u) => (
    <option
      key={u.id}
      value={u.correo}
    >
      {u.nombre} {u.apellidoPaterno} ({u.correo})
    </option>
  ))}
</select>

<select
  value={emailDestino}
  onChange={(e) =>
    setEmailDestino(e.target.value)
  }
  style={{
    width: "100%",
    padding: 10,
    marginBottom: 10,
  }}
>
  <option value="">
    Seleccione Destinatario
  </option>

  {usuarios.map((u) => (
    <option
      key={u.id}
      value={u.correo}
    >
      {u.nombre} {u.apellidoPaterno} ({u.correo})
    </option>
  ))}
</select>

   
      <button onClick={crearNotificacion}>
        Crear Notificación
      </button>
    </div>

    {/* LISTADO */}
    <h2>
      {vista === "inbox" && "📥 Bandeja"}
      {vista === "archivadas" &&
        "📦 Archivadas"}
      {vista === "papelera" &&
        "🗑️ Papelera"}
    </h2>

    {notificacionesFiltradas.length ===
    0 ? (
      <p>No existen registros</p>
    ) : (
      notificacionesFiltradas.map((n) => (
        <div
          key={n.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 10,
            background: n.leido
              ? "#ecfdf5"
              : "#fef2f2",
          }}
        >
          <h3>{n.titulo}</h3>

          <p>{n.mensaje}</p>

          <p>
            <b>Emisor:</b>{" "}
            {n.emailEmisor}
          </p>

          <p>
            <b>Destino:</b>{" "}
            {n.emailDestino}
          </p>

          <p>
            <b>Fecha:</b>{" "}
            {new Date(
              n.fechaEnvio
            ).toLocaleString()}
          </p>

          <p>
            Estado:
            {n.leido
              ? " ✅ Leída"
              : " ❌ No Leída"}
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {!n.leido && (
              <button
                onClick={() =>
                  marcarLeida(n.id)
                }
              >
                📖 Leer
              </button>
            )}

            {vista !== "archivadas" &&
              vista !==
                "papelera" && (
                <button
                  onClick={() =>
                    archivar(n.id)
                  }
                >
                  📦 Archivar
                </button>
              )}

            {vista !==
              "papelera" && (
              <button
                onClick={() =>
                  enviarPapelera(
                    n.id
                  )
                }
              >
                🗑️ Papelera
              </button>
            )}

            {vista ===
              "papelera" && (
              <button
                onClick={() =>
                  restaurar(n.id)
                }
              >
                ♻️ Restaurar
              </button>
            )}
          </div>
        </div>
      ))
    )}

    {/* PAGINACIÓN */}
    <div
      style={{
        marginTop: 20,
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <button
        disabled={page === 0}
        onClick={() =>
          cargarNotificaciones(
            page - 1,
            vista
          )
        }
      >
        ⬅ Anterior
      </button>

      <span>
        Página {page + 1} de{" "}
        {totalPages}
      </span>

      <button
        disabled={
          page + 1 >= totalPages
        }
        onClick={() =>
          cargarNotificaciones(
            page + 1,
            vista
          )
        }
      >
        Siguiente ➡
      </button>
    </div>
  </div>
)};