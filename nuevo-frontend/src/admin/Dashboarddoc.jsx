import React, { useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Dashboarddoc = () => {

  // 🔥 Cursos simulando BD
  const [courses, setCourses] = useState([
  {
    id: 1,
    nombre: "React Avanzado",
    estado: "Activo",
    progreso: "80%",
    description: "Curso avanzado de React",
    image: "https://source.unsplash.com/400x250/?react",
  },
  {
    id: 2,
    nombre: "JavaScript Pro",
    estado: "Activo",
    progreso: "60%",
    description: "Curso moderno de JS",
    image: "https://source.unsplash.com/400x250/?javascript",
  },
]);

const [editingCourse, setEditingCourse] = useState(null);
  const Dashboarddoc = () => {

  const [courses, setCourses] = useState([]);

    // 🔥 AQUÍ VA
    const [editingCourse, setEditingCourse] = useState(null);

    const handleEdit = (course) => {
      setEditingCourse(course);
    };

    const handleUpdate = () => {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id ? editingCourse : c
        )
      );
      setEditingCourse(null);
    };
    return (
      <>
      <tbody>
  {courses.map((course) => (
    <tr key={course.id}>
      <td>{course.nombre}</td>
      <td>{course.estado}</td>
      <td>{course.progreso}</td>
      <td>
        <button onClick={() => handleEdit(course)}>
          Editar
        </button>
      </td>
    </tr>
  ))}
</tbody>
        {/* FORM EDITAR */}
        {editingCourse && (
          <div className="modalOverlay">
            <div className="modal">
              <h2>Editar Curso</h2>

              <input
                value={editingCourse.nombre}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    nombre: e.target.value,
                  })
                }
              />

              <input
                value={editingCourse.estado}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    estado: e.target.value,
                  })
                }
              />

              <input
                value={editingCourse.progreso}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    progreso: e.target.value,
                  })
                }
              />

              <button onClick={handleUpdate}>Guardar</button>
              <button onClick={() => setEditingCourse(null)}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* TABLA */}
      </>
    );
  };

  return (
    <div className="dashboard">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li className="active">Cursos</li>
          <li>Estudiantes</li>
          <li>Configuración</li>
        </ul>

        <Link to="/login">Profile</Link>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="header">
          <h1>Dashboard Docente 👨‍🏫</h1>

          <div style={{ display: "flex", gap: "10px" }}>
            <input type="text" placeholder="Buscar curso..." />

            {/* 🔥 BOTÓN CREAR */}
            <Link to="/create-course">
              <button className="btn-create">
                + Crear Curso
              </button>
            </Link>
          </div>
        </header>

        {/* 🔥 TARJETAS RESUMEN */}
        <section className="cards">
          <div className="card">
            <h3>Total Cursos</h3>
            <p>{courses.length}</p>
          </div>

          <div className="card">
            <h3>Total Estudiantes</h3>
            <p>
              {courses.reduce((acc, c) => acc + c.students, 0)}
            </p>
          </div>
        </section>

        {/* 🔥 TABLA DE CURSOS */}
        <section className="table-section">
          <h2>Mis Cursos</h2>

          <table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estudiantes</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.category}</td>
                  <td>${course.price}</td>
                  <td>{course.students}</td>

                  <td>
                    <button className="btn-edit">Editar</button>
                    <button className="btn-delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  );
};


export default Dashboarddoc;

/*

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #6990F2;
}

::selection {
  color: #fff;
  background: #6990F2;
}

.wrapper {
  width: 430px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 7px 7px 12px rgba(0,0,0,0.05);
}

.wrapper header {
  color: #6990F2;
  font-size: 27px;
  font-weight: 600;
  text-align: center;
}

// ðŸ”¥ CAMBIO: antes era form, ahora usamos div.form en React 
.wrapper .form {
  height: 167px;
  display: flex;
  cursor: pointer;
  margin: 30px 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #6990F2;
}

.form :where(i, p) {
  color: #6990F2;
}

.form i {
  font-size: 50px;
}

.form p {
  margin-top: 15px;
  font-size: 16px;
}

// LIST ITEMS 
section .row {
  margin-bottom: 10px;
  background: #E9F0FF;
  list-style: none;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

section .row i {
  color: #6990F2;
  font-size: 30px;
}

section .details span {
  font-size: 14px;
}

// PROGRESS AREA 
.progress-area .row .content {
  width: 100%;
  margin-left: 15px;
}

.progress-area .details {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}

.progress-area .content .progress-bar {
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}

.content .progress-bar .progress {
  height: 100%;
  width: 0%;
  background: #6990F2;
  border-radius: inherit;
  transition: width 0.2s ease;
}

// UPLOADED AREA 
.uploaded-area {
  max-height: 232px;
  overflow-y: auto;
}

.uploaded-area::-webkit-scrollbar {
  width: 6px;
}

.uploaded-area::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.uploaded-area .row .content {
  display: flex;
  align-items: center;
}

.uploaded-area .row .details {
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}

.uploaded-area .row .details .size {
  color: #404040;
  font-size: 11px;
}

.uploaded-area i.fa-check {
  font-size: 16px;
  color: green;
}*/