import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    setError("");

    if (!correo || !password) {
      setError("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:9095/api/usuarios/login", {
        correo,
        password,
      });

      const usuario = res.data;

      // 🔐 guardar sesión real
      localStorage.setItem("user", JSON.stringify(usuario));

      const rol = usuario.rol?.toLowerCase() || usuario.tipo?.toLowerCase();

      // 🚀 redirección por rol
      if (rol === "admin") navigate("/dashboard");
      else if (rol === "estudiante" || rol === "student") navigate("/dashboard2");
      else if (rol === "docente" || rol === "teacher") navigate("/b");
      else navigate("/");
    } catch (err) {
        if (err.response?.status === 401) {
          setError("Correo o contraseña incorrectos");

        } else if (err.response?.status === 404) {
          setError("Usuario no encontrado");

        } else if (err.response?.status === 403) {
          // 🔒 USUARIO BLOQUEADO
          setError("Tu cuenta está bloqueada. Contacta con el administrador");

        } else {
          setError("No se pudo iniciar sesión. Intenta nuevamente.");
        }
      } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Overlay />

      <BackButton onClick={() => navigate("/")}>
        <FaArrowLeft /> Volver
      </BackButton>

      <Wrapper>
        {/* LEFT */}
        <LeftPanel>
          <Brand>
            <FaGraduationCap />
            EduPlatform
          </Brand>

          <HeroTitle>Aprende sin límites 🚀</HeroTitle>
          <HeroText>
            Accede a una experiencia educativa moderna, elegante y diseñada para
            estudiantes y docentes que quieren crecer de verdad.
          </HeroText>

          <FeatureList>
            <li>📚 Cursos premium y actualizados</li>
            <li>🎯 Aprende a tu ritmo</li>
            <li>🏆 Certificados y progreso real</li>
            <li>👨‍🏫 Panel exclusivo para docentes</li>
          </FeatureList>
        </LeftPanel>

        {/* LOGIN CARD */}
        <Card>
          <h2>Bienvenido 👋</h2>
          <p className="subtitle">Inicia sesión en tu cuenta</p>

          {error && <p className="mensaje">{error}</p>}

          <form onSubmit={login}>
            <label>Correo electrónico</label>
            <InputGroup>
              <FaEnvelope />
              <input
                type="email"
                placeholder="correo@email.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </InputGroup>

            <label>Contraseña</label>
            <InputGroup>
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <EyeButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeButton>
            </InputGroup>

            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <FaSpinner className="spin" /> Ingresando...
                </>
              ) : (
                "Entrar"
              )}
            </button>

            <p className="extra">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </p>

            <p className="register">
              ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
            </p>
          </form>
        </Card>
      </Wrapper>
    </Container>
  );
}

export default Login;

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
  background: url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80")
    center/cover no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.94),
    rgba(49, 46, 129, 0.9)
  );
  backdrop-filter: blur(4px);
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 40px;
  padding: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 460px;
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
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const HeroTitle = styled.h1`
  font-size: 54px;
  line-height: 1.05;
  margin-bottom: 18px;
`;

const HeroText = styled.p`
  font-size: 18px;
  color: #cbd5e1;
  max-width: 520px;
  line-height: 1.7;
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
  padding: 38px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.97);
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
    opacity: 0.75;
    cursor: not-allowed;
  }

  .mensaje {
    margin-bottom: 12px;
    text-align: center;
    font-weight: 700;
    color: #ef4444;
    background: #fef2f2;
    padding: 12px;
    border-radius: 12px;
    font-size: 14px;
  }

  .extra,
  .register {
    margin-top: 14px;
    text-align: center;
    font-size: 14px;
  }

  a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 700;
  }

  a:hover {
    text-decoration: underline;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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

const EyeButton = styled.button`
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: none;
  box-shadow: none !important;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    color: #64748b;
    font-size: 16px;
  }

  &:hover svg {
    color: #4f46e5;
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
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateX(-2px);
  }
`;