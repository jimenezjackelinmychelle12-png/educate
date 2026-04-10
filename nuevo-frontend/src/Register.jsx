// src/Register.jsx
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !tipo) {
      setMensaje("❌ Todos los campos son obligatorios");
      return;
    }

    try {
      await axios.post("http://localhost:9095/api/usuarios", {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        tipo,
      });

      setMensaje("✅ Usuario registrado correctamente");

      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCorreo("");
      setTipo("");
    } catch (err) {
      setMensaje("❌ Error al registrar usuario");
    }
  };

  return (
    <Container>

      {/* 🔙 BOTÓN VOLVER */}
      <BackButton onClick={() => navigate(-1)}>
        ← Volver
      </BackButton>

      <Card>
        <h2>Crear Cuenta</h2>

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

          <button type="submit">Registrarse</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </Card>
    </Container>
  );
}

export default Register;

/////////////////////////////////////////////////////
// 🎨 ESTILOS (MISMA LÍNEA QUE LOGIN)
/////////////////////////////////////////////////////

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: 
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url("https://images.unsplash.com/photo-1523240795612-9a054b0db644");

  background-size: cover;
  background-position: center;
`;

const Card = styled.div`
  width: 420px;
  padding: 35px;
  border-radius: 15px;

  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);

  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);

  h2 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 28px;
    color: #1e293b;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 12px;
    font-weight: bold;
    font-size: 16px;
    color: #334155;
  }

  input,
  select {
    margin-top: 6px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 15px;
    transition: 0.3s;
  }

  input:focus,
  select:focus {
    border: 2px solid #4f46e5;
    outline: none;
    box-shadow: 0 0 8px rgba(79, 70, 229, 0.4);
  }

  button {
    margin-top: 25px;
    padding: 12px;
    width: 70%;
    align-self: center;

    border: none;
    border-radius: 8px;

    background: linear-gradient(135deg, #4f46e5, #6366f1);
    color: white;
    font-size: 16px;
    font-weight: bold;

    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #4338ca, #4f46e5);
  }

  .mensaje {
    margin-top: 15px;
    text-align: center;
    font-weight: bold;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;

  padding: 10px 15px;
  border-radius: 8px;
  border: none;

  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #4f46e5;
    color: white;
  }
`;