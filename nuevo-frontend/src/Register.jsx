import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  FaUser,
  FaEnvelope,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaArrowLeft,
  FaGraduationCap,
} from "react-icons/fa";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !tipo) {
      setMensaje("❌ Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
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

      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCorreo("");
      setTipo("");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error(err);
      setMensaje("❌ No se pudo registrar. Verifica el correo o intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Overlay />

      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Volver
      </BackButton>

      <Wrapper>
        <LeftPanel>
          <Brand>
            <FaGraduationCap />
            EduPlatform
          </Brand>

          <HeroTitle>Crea tu cuenta y comienza hoy ✨</HeroTitle>
          <HeroText>
            Únete a una experiencia educativa moderna, elegante y diseñada para
            aprender, enseñar y crecer profesionalmente.
          </HeroText>

          <FeatureList>
            <li>📚 Acceso a cursos exclusivos</li>
            <li>🎯 Aprende o enseña con libertad</li>
            <li>🏆 Crece con certificaciones reales</li>
          </FeatureList>
        </LeftPanel>

        <Card>
          <h2>Crear Cuenta 🚀</h2>
          <p className="subtitle">Regístrate en EduPlatform</p>

          <form onSubmit={handleSave}>
            <label>Nombre</label>
            <InputGroup>
              <FaUser />
              <input
                type="text"
                placeholder="Ingrese nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </InputGroup>

            <label>Apellido Paterno</label>
            <InputGroup>
              <FaUser />
              <input
                type="text"
                placeholder="Ingrese apellido paterno"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
              />
            </InputGroup>

            <label>Apellido Materno</label>
            <InputGroup>
              <FaUser />
              <input
                type="text"
                placeholder="Ingrese apellido materno"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
              />
            </InputGroup>

            <label>Correo electrónico</label>
            <InputGroup>
              <FaEnvelope />
              <input
                type="email"
                placeholder="Ingrese correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </InputGroup>

            <label>Tipo de Usuario</label>
            <SelectGroup>
              {tipo === "Estudiante" ? <FaUserGraduate /> : <FaChalkboardTeacher />}
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">-- Seleccione --</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Profesor">Profesor</option>
              </select>
            </SelectGroup>

            <button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Crear Cuenta"}
            </button>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <p className="extra">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </Card>
      </Wrapper>
    </Container>
  );
}

export default Register;

//////////////////////////////////////////////////
// 🎨 ESTILOS PREMIUM
//////////////////////////////////////////////////

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  background: url("https://images.unsplash.com/photo-1523240795612-9a054b0db644")
    center/cover no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.9),
    rgba(49, 46, 129, 0.85)
  );
  backdrop-filter: blur(4px);
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 40px;
  padding: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
`;

const LeftPanel = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const HeroTitle = styled.h1`
  font-size: 50px;
  line-height: 1.1;
  margin-bottom: 18px;
`;

const HeroText = styled.p`
  font-size: 18px;
  color: #cbd5e1;
  max-width: 520px;
  line-height: 1.6;
  margin-bottom: 28px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 16px;
  color: #e2e8f0;
`;

const Card = styled.div`
  width: 100%;
  padding: 34px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);

  h2 {
    text-align: center;
    margin-bottom: 6px;
    color: #0f172a;
    font-size: 30px;
  }

  .subtitle {
    text-align: center;
    font-size: 15px;
    color: #64748b;
    margin-bottom: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
    margin-bottom: 8px;
    font-weight: 700;
    color: #334155;
    font-size: 14px;
  }

  button {
    margin-top: 22px;
    padding: 14px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(79, 70, 229, 0.35);
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .mensaje {
    margin-top: 14px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    color: #ef4444;
    background: #fef2f2;
    padding: 12px;
    border-radius: 12px;
  }

  .extra {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
  }

  a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #dbeafe;
  border-radius: 14px;
  padding: 0 14px;
  transition: 0.25s;

  svg {
    color: #64748b;
    font-size: 14px;
  }

  &:focus-within {
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
    background: white;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 14px 0;
    font-size: 14px;
    outline: none;
  }
`;

const SelectGroup = styled(InputGroup)`
  select {
    flex: 1;
    border: none;
    background: transparent;
    padding: 14px 0;
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 16px;
  border-radius: 12px;
  border: none;

  background: rgba(255, 255, 255, 0.14);
  color: white;
  font-weight: bold;
  cursor: pointer;
  backdrop-filter: blur(10px);

  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateX(-2px);
  }
`;