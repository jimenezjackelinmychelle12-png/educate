import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBookOpen,
  FaUserTie,
  FaClock,
  FaImage,
  FaMoneyBillWave,
} from "react-icons/fa";

const API_URL = "http://localhost:9095/cursos";

const CreateCourse = () => {

  //////////////////////////////////////////////////
  // NAVIGATE
  //////////////////////////////////////////////////

  const navigate = useNavigate();

  //////////////////////////////////////////////////
  // DOCENTE
  //////////////////////////////////////////////////

  const docenteId =
    localStorage.getItem("userId");

  const docenteNombre =
    localStorage.getItem("nombre") || "";

  const docenteApellido =
    localStorage.getItem("apellido") || "";

  const docenteCompleto =
    `${docenteNombre} ${docenteApellido}`.trim();

  //////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    category: "negocios",
    image: "",
    duration: "",
  });

  const [loading, setLoading] =
    useState(false);

  //////////////////////////////////////////////////
  // HANDLE CHANGE
  //////////////////////////////////////////////////

  const handleChange = (e) => {

    setCourse({
      ...course,
      [e.target.name]:
        e.target.value,
    });
  };

  //////////////////////////////////////////////////
  // HANDLE SUBMIT
  //////////////////////////////////////////////////

  const handleSubmit = async (e) => {

    e.preventDefault();

    //////////////////////////////////////////////////
    // VALIDACIÓN
    //////////////////////////////////////////////////

    if (
      !course.title ||
      !course.description
    ) {

      alert(
        "Completa los campos obligatorios"
      );

      return;
    }

    //////////////////////////////////////////////////
    // VALIDAR DOCENTE
    //////////////////////////////////////////////////

    if (!docenteId) {

      alert(
        "No se encontró el docente logueado"
      );

      return;
    }

    //////////////////////////////////////////////////
    // DTO
    //////////////////////////////////////////////////

    const cursoDTO = {

      titulo: course.title,

      descripcion:
        course.description,

      precio: course.price
        ? Number(course.price)
        : 0,

      categoria: course.category,

      etiqueta: course.category,

      imagenUrl: course.image,

      duracionLeccion:
        course.duration,

      activo: true,

      docenteId:
        Number(docenteId),
    };

    console.log(
      "ENVIANDO CURSO:",
      cursoDTO
    );

    try {

      setLoading(true);

      //////////////////////////////////////////////////
      // POST
      //////////////////////////////////////////////////

      const response =
        await axios.post(
          API_URL,
          cursoDTO,
          {
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

      console.log(
        "CURSO CREADO:",
        response.data
      );

      //////////////////////////////////////////////////
      // ALERT
      //////////////////////////////////////////////////

      alert(
        "Curso creado correctamente ✅"
      );

      //////////////////////////////////////////////////
      // LIMPIAR FORM
      //////////////////////////////////////////////////

      setCourse({
        title: "",
        description: "",
        price: "",
        category: "negocios",
        image: "",
        duration: "",
      });

      //////////////////////////////////////////////////
      // REDIRECT
      //////////////////////////////////////////////////

      navigate("/b");

    } catch (error) {

      console.error(
        "ERROR COMPLETO:",
        error
      );

      console.error(
        "ERROR RESPONSE:",
        error.response?.data
      );

      alert(
        "Error al crear curso ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <Container>

      {/* TOP BAR */}
      <div className="topbar">

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Volver
        </button>

      </div>

      {/* CARD */}
      <div className="card">

        {/* HEADER */}
        <div className="header">

          <div className="icon-box">
            <FaBookOpen />
          </div>

          <div>

            <h2>
              Crear Curso
            </h2>

            <p>
              Publica un nuevo curso
              educativo para tus
              estudiantes
            </p>

          </div>

        </div>

        {/* DOCENTE INFO */}
        <div className="teacher-box">

          <div className="teacher-avatar">
            {docenteCompleto
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>

            <span>
              Curso creado por
            </span>

            <h4>
              <FaUserTie />
              {docenteCompleto || "Docente"}
            </h4>

          </div>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* TITULO */}
          <div className="input-group">

            <label>
              Título del curso
            </label>

            <input
              type="text"
              name="title"
              placeholder="Ej: Curso de React"
              value={course.title}
              onChange={handleChange}
            />

          </div>

          {/* DESCRIPCION */}
          <div className="input-group">

            <label>
              Descripción
            </label>

            <textarea
              name="description"
              placeholder="Describe el contenido del curso..."
              value={course.description}
              onChange={handleChange}
            />

          </div>

          {/* GRID */}
          <div className="grid-2">

            {/* PRECIO */}
            <div className="input-group">

              <label>
                Precio
              </label>

              <div className="icon-input">

                <FaMoneyBillWave />

                <input
                  type="number"
                  name="price"
                  placeholder="0"
                  value={course.price}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* DURACION */}
            <div className="input-group">

              <label>
                Duración
              </label>

              <div className="icon-input">

                <FaClock />

                <input
                  type="text"
                  name="duration"
                  placeholder="10 horas"
                  value={course.duration}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* CATEGORIA */}
          <div className="input-group">

            <label>
              Categoría
            </label>

            <select
              name="category"
              value={course.category}
              onChange={handleChange}
            >

              <option value="negocios">
                Negocios
              </option>

              <option value="tecnologia">
                Tecnología
              </option>

              <option value="desarrollo">
                Desarrollo
              </option>

              <option value="marketing">
                Marketing
              </option>

            </select>

          </div>

          {/* IMAGEN */}
          <div className="input-group">

            <label>
              URL Imagen
            </label>

            <div className="icon-input">

              <FaImage />

              <input
                type="text"
                name="image"
                placeholder="https://..."
                value={course.image}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* PREVIEW */}
          {course.image && (

            <div className="preview">

              <img
                src={course.image}
                alt="preview"
              />

            </div>

          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creando curso..."
              : "Crear Curso"}

          </button>

        </form>

      </div>

    </Container>
  );
};

export default CreateCourse;

//////////////////////////////////////////////////
// STYLES
//////////////////////////////////////////////////

const Container = styled.div`

  min-height: 100vh;

  background:
    linear-gradient(
      135deg,
      #eff6ff,
      #dbeafe
    );

  padding: 40px;

  .topbar {

    max-width: 900px;

    margin: auto;

    margin-bottom: 20px;
  }

  .back-btn {

    display: inline-flex;

    align-items: center;

    gap: 10px;

    color: #2563eb;

    font-weight: 700;

    background: white;

    padding: 12px 18px;

    border-radius: 14px;

    border: none;

    cursor: pointer;

    box-shadow:
      0 5px 15px rgba(0,0,0,0.06);

    transition: 0.2s;

    font-size: 15px;
  }

  .back-btn:hover {

    transform: translateY(-2px);
  }

  .card {

    width: 100%;

    max-width: 900px;

    margin: auto;

    background: white;

    padding: 40px;

    border-radius: 30px;

    box-shadow:
      0 15px 40px rgba(0,0,0,0.08);
  }

  .header {

    display: flex;

    align-items: center;

    gap: 20px;

    margin-bottom: 30px;
  }

  .icon-box {

    width: 75px;

    height: 75px;

    border-radius: 22px;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
      linear-gradient(
        135deg,
        #2563eb,
        #3b82f6
      );

    color: white;

    font-size: 30px;
  }

  h2 {

    font-size: 34px;

    color: #0f172a;

    margin-bottom: 8px;

    font-weight: 800;
  }

  .header p {

    color: #64748b;

    font-size: 15px;
  }

  .teacher-box {

    display: flex;

    align-items: center;

    gap: 16px;

    background:
      linear-gradient(
        135deg,
        #eff6ff,
        #dbeafe
      );

    padding: 18px;

    border-radius: 20px;

    margin-bottom: 30px;
  }

  .teacher-avatar {

    width: 60px;

    height: 60px;

    border-radius: 50%;

    background:
      linear-gradient(
        135deg,
        #2563eb,
        #3b82f6
      );

    display: flex;

    align-items: center;

    justify-content: center;

    color: white;

    font-size: 24px;

    font-weight: 800;
  }

  .teacher-box span {

    color: #64748b;

    font-size: 14px;
  }

  .teacher-box h4 {

    display: flex;

    align-items: center;

    gap: 8px;

    margin-top: 5px;

    color: #0f172a;

    font-size: 20px;
  }

  form {

    display: flex;

    flex-direction: column;

    gap: 22px;
  }

  .grid-2 {

    display: grid;

    grid-template-columns:
      repeat(auto-fit,minmax(240px,1fr));

    gap: 20px;
  }

  .input-group {

    display: flex;

    flex-direction: column;

    gap: 10px;
  }

  label {

    color: #0f172a;

    font-weight: 700;

    font-size: 14px;
  }

  input,
  textarea,
  select {

    width: 100%;

    padding: 15px;

    border-radius: 16px;

    border: 1px solid #cbd5e1;

    outline: none;

    font-size: 15px;

    transition: 0.2s;

    background: #fff;
  }

  input:focus,
  textarea:focus,
  select:focus {

    border-color: #2563eb;

    box-shadow:
      0 0 0 4px rgba(37,99,235,0.15);
  }

  textarea {

    min-height: 140px;

    resize: vertical;
  }

  .icon-input {

    position: relative;
  }

  .icon-input svg {

    position: absolute;

    top: 50%;

    left: 15px;

    transform: translateY(-50%);

    color: #64748b;
  }

  .icon-input input {

    padding-left: 45px;
  }

  .preview {

    width: 100%;

    overflow: hidden;

    border-radius: 22px;

    border: 2px dashed #cbd5e1;
  }

  .preview img {

    width: 100%;

    height: 300px;

    object-fit: cover;
  }

  button {

    margin-top: 10px;

    padding: 18px;

    border: none;

    border-radius: 18px;

    background:
      linear-gradient(
        135deg,
        #2563eb,
        #3b82f6
      );

    color: white;

    font-size: 16px;

    font-weight: 700;

    cursor: pointer;

    transition: 0.3s;

    box-shadow:
      0 10px 25px rgba(37,99,235,0.25);
  }

  button:hover {

    transform: translateY(-2px);
  }

  button:disabled {

    opacity: 0.7;

    cursor: not-allowed;
  }

  @media (max-width: 768px) {

    padding: 20px;

    .card {

      padding: 25px;
    }

    .header {

      flex-direction: column;

      text-align: center;
    }

    h2 {

      font-size: 28px;
    }
  }
`;