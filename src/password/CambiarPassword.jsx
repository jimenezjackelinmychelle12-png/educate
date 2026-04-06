import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const CambiarPassword = () => {
  const location = useLocation();
  const correo = location.state?.email || ""; // solo lectura
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChangePassword = async () => {
    if (!nuevaPassword) {
      setMensaje("❌ Ingresa una nueva contraseña");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9095/api/usuarios/cambiar-password",
        {
          correo,
          nuevaPassword,
        }
      );
      setMensaje("✅ " + res.data);
      setNuevaPassword("");
    } catch (err) {
      setMensaje("❌ " + (err.response?.data || "Error"));
    }
  };

  return (
    <FormContainer>
      <h2>Cambiar contraseña</h2>

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        readOnly
      />

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={nuevaPassword}
        onChange={(e) => setNuevaPassword(e.target.value)}
      />

      <button onClick={handleChangePassword}>Cambiar contraseña</button>

      <LoginLink to="/login">Volver a iniciar sesión</LoginLink>

      {mensaje && <Mensaje>{mensaje}</Mensaje>}
    </FormContainer>
  );
};

export default CambiarPassword;

// ------------------ STYLES ------------------

const FormContainer = styled.div`
  width: 400px;
  margin: 50px auto;
  padding: 25px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  background: #fff;
  font-family: Arial, sans-serif;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid rgb(200, 200, 200);
    outline: none;
    font-size: 16px;
  }

  input:focus {
    border: 2px solid rgba(0, 206, 158, 1);
  }

  button {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background-color: rgb(249, 105, 14);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
  }

  button:hover {
    background-color: rgb(230, 90, 0);
  }
`;

const Mensaje = styled.p`
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.children?.startsWith("✅") ? "green" : "red")};
`;

const LoginLink = styled(Link)`
  display: block;
  margin-top: 15px;
  text-align: center;
  color: #f9690e;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;