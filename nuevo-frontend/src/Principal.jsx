
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// 🔥 URL BACKEND
const API_URL = "http://localhost:9095/cursos";

function Principal() {
  const [cursos, setCursos] = useState([]);

  // ==============================
  // 🔥 CARGAR CURSOS
  // ==============================
  useEffect(() => {
    obtenerCursos();
  }, []);

  const obtenerCursos = async () => {
    try {
      const res = await axios.get(API_URL);
      setCursos(res.data.content); // ⚠️ viene en content
    } catch (error) {
      console.error("Error al obtener cursos", error);
    }
  };

  // ==============================
  // 🔥 CREAR CURSO
  // ==============================
  const crearCurso = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Crear Curso 🎓",
      html: `
        <input id="titulo" class="swal2-input" placeholder="Título">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
        <input id="precio" type="number" class="swal2-input" placeholder="Precio">
          <select id="categoria" class="swal2-input">
    <option value="">Selecciona categoría</option>
    <option value="tecnologia">Tecnologia</option>
    <option value="negocios">Negocios</option>
   
  </select>
        <input id="duracion" class="swal2-input" placeholder="Duración">
        <input id="imagen" class="swal2-input" placeholder="URL Imagen">
      `,
      showCancelButton: true,
      confirmButtonText: "Crear",
      preConfirm: () => ({
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        precio: Number(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        duracionLeccion: document.getElementById("duracion").value,
        imagenUrl: document.getElementById("imagen").value,
      }),
    });

    if (formValues) {
      try {
        await axios.post(API_URL, formValues);

        Swal.fire("Creado ✅", "Curso registrado correctamente", "success");

        obtenerCursos(); // 🔥 refrescar lista
      } catch (error) {
        console.error(error);
        Swal.fire("Error ❌", "No se pudo crear", "error");
      }
    }
  };

  // ==============================
  // 🔥 MODIFICAR CURSO
  // ==============================
  const modificarCurso = async (curso) => {
    const { value: formValues } = await Swal.fire({
      title: "Modificar Curso ✏️",
      html: `
        <input id="titulo" class="swal2-input" value="${curso.titulo}">
        <textarea id="descripcion" class="swal2-textarea">${curso.descripcion}</textarea>
        <input id="precio" type="number" class="swal2-input" value="${curso.precio}">
        <input id="categoria" class="swal2-input" value="${curso.categoria}">
          <select id="categoria" class="swal2-input">
    <option value="Programación" ${curso.categoria === "tecnologia" ? "selected" : ""}>Tecnologia</option>
    <option value="Negocios" ${curso.categoria === "negocios" ? "selected" : ""}>Negocios</option>
    
  </select>


        <input id="duracion" class="swal2-input" value="${curso.duracionLeccion}">
        <input id="imagen" class="swal2-input" value="${curso.imagenUrl}">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      preConfirm: () => ({
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        precio: Number(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        duracionLeccion: document.getElementById("duracion").value,
        imagenUrl: document.getElementById("imagen").value,
      }),
    });

    if (formValues) {
      try {
        await axios.put(`${API_URL}/${curso.id}`, formValues);

        Swal.fire("Actualizado ✅", "Curso modificado", "success");

        obtenerCursos(); // 🔥 refrescar lista
      } catch (error) {
        console.error(error);
        Swal.fire("Error ❌", "No se pudo actualizar", "error");
      }
    }
  };

  // ==============================
  // 🎨 UI
  // ==============================
  return (
    <div style={{ padding: "30px" }}>
      <h1>📚 Página Principal - Cursos</h1>

      {/* BOTÓN CREAR */}
      <button
        onClick={crearCurso}
        style={{
          padding: "10px 20px",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ➕ Crear Curso
      </button>

      {/* LISTA */}
      {cursos.length === 0 ? (
        <p>No hay cursos disponibles</p>
      ) : (
        cursos.map((curso) => (
          <div
            key={curso.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>{curso.titulo}</h3>
            <p>{curso.descripcion}</p>
            <p><b>Precio:</b> {curso.precio}</p>
            <p><b>Categoría:</b> {curso.categoria}</p>

            {/* BOTÓN MODIFICAR */}
            <button
              onClick={() => modificarCurso(curso)}
              style={{
                padding: "8px 15px",
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✏️ Modificar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Principal;