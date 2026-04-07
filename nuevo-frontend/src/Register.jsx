// src/Register.jsx
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipo, setTipo] = useState(""); 
  const [mensaje, setMensaje] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();

    // ✅ Validar campos vacíos
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !tipo) {
      setMensaje("❌ Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9095/api/usuarios",
        {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          correo,
          tipo,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMensaje("✅ Usuario registrado correctamente");

      // Limpiar formulario solo si todo salió bien
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCorreo("");
      setTipo("");
    } catch (err) {
      console.error(err); // Para ver el error exacto en consola
      // Mostrar mensaje detallado si existe
      setMensaje("❌ Correo incorrecto: " );
    }
  };

  return (
    <Container>
      <Card>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSave}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingrese nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Apellido Paterno</label>
          <input
            type="text"
            placeholder="Ingrese apellido paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />

          <label>Apellido Materno</label>
          <input
            type="text"
            placeholder="Ingrese apellido materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />

          <label>Correo</label>
          <input
            type="email"
            placeholder="Ingrese correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label>Tipo de Usuario</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">-- Seleccione --</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Profesor">Profesor</option>
          </select>

          <button type="submit">Registrar</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </Card>
    </Container>
  );
}

export default Register;

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
`;

const Card = styled.div`
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
    font-weight: bold;
  }

  input,
  select {
    margin-top: 5px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  input:focus,
  select:focus {
    border: 2px solid #00ce9e;
    outline: none;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    border: none;
    border-radius: 6px;
    background: #f9690e;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #d35400;
  }

  .mensaje {
    margin-top: 15px;
    text-align: center;
    font-weight: bold;
  }
`;