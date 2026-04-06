import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // ✅ IMPORT

const Contact = () => {
  const form = useRef();
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // ✅ AQUI


  // 🔢 Generar código de 6 cifras
  const generarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // 🚀 Hacer función async para usar await
 const sendEmail = async (e) => {
  e.preventDefault();

  const codigo = generarCodigo();
  const userEmail = form.current.user_email.value;

  const templateParams = {
    user_email: userEmail,
    passcode: codigo,
    time: "15 minutos",
  };

  try {
    // 1️⃣ Enviar email
    await emailjs.send(
      "service_shppf3p",
      "template_2oqubub",
      templateParams,
      "VN2KbOSrSaGJIdcDh"
    );

    // 2️⃣ Guardar OTP
    await fetch("http://localhost:9095/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, code: codigo }),
    });

    setMensaje("✅ Código enviado al correo");

    form.current.reset();

    // 🔥 3️⃣ REDIRECCIÓN (con email)
    setTimeout(() => {
      navigate("/verify", { state: { email: userEmail } });
    }, 1000);

  } catch (error) {
    console.error(error);
    setMensaje("❌ Error al enviar el código");
  }
};

  return (
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Email</label>
        <input type="email" name="user_email" required />
        <input type="submit" value="Enviar código" />
      </form>

      {mensaje && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}
    </StyledContactForm>
  );
};

export default Contact;

// ------------------ STYLES ------------------

const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input,
    textarea {
      width: 100%;
      padding: 7px;
      margin-top: 5px;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      outline: none;
    }

    input {
      height: 35px;
    }

    textarea {
      min-height: 100px;
      max-height: 100px;
    }

    input:focus,
    textarea:focus {
      border: 2px solid rgba(0, 206, 158, 1);
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;