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