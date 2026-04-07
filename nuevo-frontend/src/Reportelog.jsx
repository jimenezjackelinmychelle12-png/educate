import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

export default function HistorialLoginReport() {
  const [historial, setHistorial] = useState([]);
  const printRef = useRef(null);

  useEffect(() => {
    // Obtener todos los registros desde el backend
    axios.get("http://localhost:9095/api/historial-login")
      .then((res) => setHistorial(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("historial-login.pdf");
  };

  return (
    <Container>
      <Card>
        <Title>Historial de Login</Title>

        <TableContainer ref={printRef}>
          <table>
            <thead>
              <tr>
                <th>ID Log</th>
                <th>ID Usuario</th>
                <th>Correo</th>
                <th>IP</th>
                <th>Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              {historial && historial.length > 0 ? (
                historial.map((h) => (
                  <tr key={h.idLog}>
                    <td>{h.idLog}</td>
                    <td>{h.idUsuario}</td>
                    <td>{h.correo}</td>
                    <td>{h.ip}</td>
                    <td>{new Date(h.fechaHora).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No hay registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableContainer>

        <Button onClick={handleDownloadPdf}>Descargar PDF</Button>
      </Card>
    </Container>
  );
}

// ------------------ Styled Components ------------------
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f0f2f5;
  padding: 40px 0;
`;

const Card = styled.div`
  width: 90%;
  max-width: 1000px;
  padding: 30px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: bold;
`;

const TableContainer = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background: #f5f5f5;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  background: #f9690e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #d35400;
  }
`;