import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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

      console.log("LOGIN OK:", res.data);
      localStorage.setItem("usuario", JSON.stringify(res.data));
      // 🔥 REDIRECCIÓN POR TIPO
    const tipo = res.data.tipo;

    if (tipo === "admin") {
      navigate("/dashboard");
    } else if (tipo === "estudiante") {
      navigate("/dashboard1");
    } else if (tipo === "docente") {
      navigate("/dashboard2");
    } else {
      navigate("/"); // fallback
    }

    } catch (err) {
      console.error("ERROR:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Correo o contraseña incorrectos");
        } else {
          setError("Error del servidor: " + err.response.status);
        }
      } else {
        setError("No se pudo conectar al servidor");
      }
    }
  }

  return (
    <Container>
      <Card>
        <h2>Login</h2>
        <hr />
        {error && <p className="mensaje" style={{ color: "red" }}>{error}</p>}
        <form onSubmit={login}>
          <label>Correo</label>
          <input
            type="email"
            placeholder="Ingrese correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <p style={{ marginTop: "10px", textAlign: "center" }}>
            <a href="/contact">Cambiar contraseña</a>
          </p>
        </form>
      </Card>
    </Container>
  );
}

export default Login;

// Styled-components para centrar el login y darle estilo
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

  hr {
    margin-bottom: 20px;
    border: none;
    border-top: 1px solid #ddd;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
    font-weight: bold;
  }

  input {
    margin-top: 5px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  input:focus {
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

  a {
    color: #00ce9e;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;