import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [categoria, setCategoria] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // 🔥 URL BASE
        let url = `http://localhost:9095/cursos?pageNumber=${page}&pageSize=6`;

        // 🔥 SOLO enviar filtros si existen
        if (categoria && categoria.trim() !== "") {
          url += `&categoria=${categoria}`;
        }

        if (priceFilter) {
          if (priceFilter === "0-50") {
            url += `&precioMin=0&precioMax=50`;
          } else if (priceFilter === "50-100") {
            url += `&precioMin=50&precioMax=100`;
          } else if (priceFilter === "100+") {
            url += `&precioMin=100`;
          }
        }

        console.log("URL:", url);

        const res = await fetch(url);

        if (!res.ok) {
          console.error("Error backend:", res.status);
          setCourses([]);
          return;
        }

        const data = await res.json();

        setCourses(data.content || []);
        setTotalPages(data.totalPages || 0);

        // 🔥 scroll arriba al cambiar página
        window.scrollTo({ top: 0, behavior: "smooth" });

      } catch (err) {
        console.error("Error fetch:", err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [page, categoria, priceFilter]);

  // 🔥 PAGINACIÓN INTELIGENTE (máx 5 botones)
  const getPages = () => {
    const start = Math.max(0, page - 2);
    const end = Math.min(totalPages, page + 3);
    return [...Array(end - start).keys()].map(i => start + i);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Cursos</h2>

      {/* 🔥 FILTROS */}
      <div style={{ marginBottom: "20px" }}>

        <select
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            setPage(0);
          }}
        >
          <option value="">Todas</option>
          <option value="tecnologia">Tecnología</option>
          <option value="negocios">Negocios</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
            setPage(0);
          }}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Todos</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value="100+">100+</option>
        </select>

        {/* 🔥 BOTÓN LIMPIAR */}
        <button
          onClick={() => {
            setCategoria("");
            setPriceFilter("");
            setPage(0);
          }}
          style={{ marginLeft: "10px" }}
        >
          Mostrar todos
        </button>

      </div>

      {/* 🔥 CONTADOR */}
      <p>
        Mostrando {courses.length} cursos (página {page + 1} de {totalPages})
      </p>

      {/* 🔥 LISTA */}
      <div>
        {courses.length === 0 ? (
          <p>No hay cursos</p>
        ) : (
          courses.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              <h3>{c.titulo}</h3>
              <p><b>Categoría:</b> {c.categoria}</p>
              <p><b>Precio:</b> {c.precio}</p>
            </div>
          ))
        )}
      </div>

      {/* 🔥 PAGINACIÓN */}
      <div style={{ marginTop: "20px" }}>

        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          ⬅ Anterior
        </button>

        {getPages().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              margin: "0 5px",
              fontWeight: page === num ? "bold" : "normal",
              backgroundColor: page === num ? "#ddd" : "#fff"
            }}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Siguiente ➡
        </button>

      </div>

    </div>
  );
}
export default Courses;