import { useState } from "react";
import styled from "styled-components";

export default function CreateCourse({ onCreate }) {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    duration: "",
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!course.title || !course.description) {
      alert("Completa los campos obligatorios");
      return;
    }

    onCreate(course); // 🔥 se lo manda al padre
  };

  return (
    <FormContainer>
      <h2>Crear Curso 🎓</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Título" onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" onChange={handleChange} />

        <input name="price" placeholder="Precio" type="number" onChange={handleChange} />
        <input name="category" placeholder="Categoría" onChange={handleChange} />
        <input name="duration" placeholder="Duración (ej: 10 horas)" onChange={handleChange} />
        <input name="image" placeholder="URL Imagen" onChange={handleChange} />

        <button type="submit">Crear Curso</button>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  margin: 30px auto;

  input, textarea {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 20px;
    width: 100%;
    padding: 12px;
    background: #4f46e5;
    color: #fff;
    border: none;
    border-radius: 8px;
  }
`;




/*{
      id: 3,
      nombre: "Ana Torres",
      email: "admin@edu.com",
      rol: "admin",
      avatar: "https://i.pravatar.cc/150?img=5",
    },*/