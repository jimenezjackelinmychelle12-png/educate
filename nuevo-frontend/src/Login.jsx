import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
//import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:9095/api/usuarios/login",
        { correo, password }
      );

      localStorage.setItem("usuario", JSON.stringify(res.data));

      const tipo = res.data.tipo;

      if (tipo === "admin") navigate("/dashboard");
      else if (tipo === "estudiante") navigate("/dashboard1");
      else if (tipo === "docente") navigate("/dashboard2");
      else navigate("/");

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Correo o contraseña incorrectos");
      } else {
        setError("Error de conexión con el servidor");
      }
    }
  }

  return (
    <Container>
      <Overlay />
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Volver
      </BackButton>
      <DemoButton onClick={() => navigate("/demo")}>
        🚀 Demo
      </DemoButton>

      <Card>
        <Title>Bienvenido 👋</Title>
        <Subtitle>Inicia sesión para continuar</Subtitle>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <form onSubmit={login}>
        <Field> 
          <Label>Correo</Label>
          <Input
            type="email"
            placeholder="ejemplo@email.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </Field>
        <Field> 
          <Label>Contraseña</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
          <Button type="submit">Ingresar</Button>
          
          <LinkText href="/contact">
            ¿Olvidaste tu contraseña?
          </LinkText>
        </form>
      </Card>
    </Container>
  );
}

export default Login;

//////////////////////////////////////
// 🎨 ESTILOS MODERNOS
//////////////////////////////////////

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("https://images.unsplash.com/photo-1523240795612-9a054b0db644");
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
`;

const Card = styled.div`
  position: relative;
  width: 400px;
  padding: 35px;
  border-radius: 16px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  z-index: 2;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 5px;
  color: #1e293b;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 20px;
  color: #64748b;
`;

const ErrorMsg = styled.p`
  color: #ef4444;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Label = styled.label`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #334155;
  font-size: 20px; /* 👈 MÁS GRANDE */
`;

const Input = styled.input`
  margin-bottom: 10px;  /* 👈 ESTE ES CLAVE */
  padding: 14px;
  border-radius: 15px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: 0.3s;

  &:focus {
    border: 2px solid #4f46e5;
    outline: none;
    box-shadow: 0 0 5px rgba(79,70,229,0.4);
  }
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Button = styled.button`
  margin: 25px auto 0 auto; /* 👈 centra horizontalmente */
  display: block;           /* 👈 necesario para que funcione el auto */
  
  width: 70%;               /* 👈 tamaño bonito */
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

const LinkText = styled.a`
  display: block;
  margin-top: 15px;
  text-align: center;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;
  border-radius: 8px;
  border: none;

  background: rgba(255,255,255,0.2);
  color: white;
  font-weight: bold;
  cursor: pointer;
  backdrop-filter: blur(5px);

  transition: 0.3s;

  &:hover {
    background: rgba(255,255,255,0.4);
    transform: translateX(-3px);
  }
`;
const DemoButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;
  border-radius: 8px;
  border: none;

  background: linear-gradient(135deg, #4f46e5, #22c55e);
  color: white;
  font-weight: bold;

  cursor: pointer;
  backdrop-filter: blur(5px);

  transition: 0.3s;
  z-index: 2;

  &:hover {
    background: rgba(255,255,255,0.4);
    transform: translateX(3px);
  }
`;