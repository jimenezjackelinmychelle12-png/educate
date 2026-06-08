import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import {
  FaDownload,
  FaSearch,
  FaHistory,
  FaGlobe,
  FaUserShield,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";

export default function HistorialLoginReport() {
  const [historial, setHistorial] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerHistorial();
  }, []);

  const obtenerHistorial = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:9095/api/historial-login");
      setHistorial(res.data || []);
    } catch (err) {
      console.error("Error al cargar historial:", err);
    } finally {
      setLoading(false);
    }
  };

  const historialFiltrado = useMemo(() => {
    return historial.filter((item) => {
      const texto =
        `${item.idLog} ${item.idUsuario} ${item.correo} ${item.ip}`.toLowerCase();
      return texto.includes(search.toLowerCase());
    });
  }, [historial, search]);

  const stats = useMemo(() => {
    const total = historial.length;
    const usuarios = new Set(historial.map((h) => h.idUsuario)).size;
    const ips = new Set(historial.map((h) => h.ip)).size;

    return { total, usuarios, ips };
  }, [historial]);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("historial-login-rox.pdf");
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <HeaderLeft>
              <BackButton onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Volver
            </BackButton>

            <TitleRow>
              <FaHistory />
              <div>
                <Title>Historial de Login</Title>
                <Subtitle>Registro completo de accesos a la plataforma</Subtitle>
              </div>
            </TitleRow>
          </HeaderLeft>

          <HeaderActions>
            <SearchBox>
              <FaSearch />
              <input
                type="text"
                placeholder="Buscar por correo, IP o usuario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>

            <DownloadButton onClick={handleDownloadPdf}>
              <FaDownload />
              Descargar PDF
            </DownloadButton>
          </HeaderActions>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon blue>
              <FaHistory />
            </StatIcon>
            <div>
              <h4>Total Registros</h4>
              <p>{stats.total}</p>
            </div>
          </StatCard>

          <StatCard>
            <StatIcon green>
              <FaUserShield />
            </StatIcon>
            <div>
              <h4>Usuarios únicos</h4>
              <p>{stats.usuarios}</p>
            </div>
          </StatCard>

          <StatCard>
            <StatIcon orange>
              <FaGlobe />
            </StatIcon>
            <div>
              <h4>IPs registradas</h4>
              <p>{stats.ips}</p>
            </div>
          </StatCard>
        </StatsGrid>

        <TableCard ref={printRef}>
          <TableHeader>
            <h3>Actividad reciente</h3>
            <span>{historialFiltrado.length} resultados</span>
          </TableHeader>

          <TableWrapper>
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="empty">
                      Cargando historial...
                    </td>
                  </tr>
                ) : historialFiltrado.length > 0 ? (
                  historialFiltrado.map((h) => (
                    <tr key={h.idLog}>
                      <td>#{h.idLog}</td>
                      <td>{h.idUsuario}</td>
                      <td>{h.correo}</td>
                      <td>
                        <IpBadge>{h.ip}</IpBadge>
                      </td>
                      <td>
                        <DateCell>
                          <FaClock />
                          {new Date(h.fechaHora).toLocaleString()}
                        </DateCell>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty">
                      No hay registros disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableWrapper>
        </TableCard>
      </Wrapper>
    </Container>
  );
}

/* ================= STYLES ================= */

const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 30px;
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div``;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  svg {
    font-size: 28px;
    color: #2563eb;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  color: #0f172a;
`;

const Subtitle = styled.p`
  color: #64748b;
  margin-top: 4px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 12px 16px;
  border-radius: 14px;
  min-width: 320px;

  svg {
    color: #94a3b8;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    background: transparent;
  }
`;

const DownloadButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(37, 99, 235, 0.25);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 22px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);

  h4 {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 4px;
  }

  p {
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
  }
`;

const StatIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;

  background: ${({ blue, green, orange }) =>
    blue
      ? "linear-gradient(135deg, #2563eb, #3b82f6)"
      : green
      ? "linear-gradient(135deg, #059669, #10b981)"
      : "linear-gradient(135deg, #ea580c, #f97316)"};
`;

const TableCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  h3 {
    font-size: 22px;
    color: #0f172a;
  }

  span {
    background: #eff6ff;
    color: #2563eb;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: #f8fafc;
  }

  th {
    text-align: left;
    padding: 14px;
    font-size: 13px;
    color: #334155;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 14px;
    font-size: 14px;
    color: #475569;
    border-bottom: 1px solid #f1f5f9;
  }

  tr:hover {
    background: #f8fbff;
  }

  .empty {
    text-align: center;
    padding: 30px;
    color: #94a3b8;
  }
`;

const IpBadge = styled.span`
  background: #f1f5f9;
  color: #334155;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

const DateCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #94a3b8;
    font-size: 12px;
  }
`;

const BackButton = styled.button`
  border: none;
  background: white;
  color: #334155;
  padding: 10px 16px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  transition: 0.25s ease;

  svg {
    font-size: 14px;
  }

  &:hover {
    transform: translateY(-2px);
    background: #f8fafc;
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.1);
  }
`;