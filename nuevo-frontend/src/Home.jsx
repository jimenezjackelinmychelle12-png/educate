import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  const nombre = location.state?.nombre || "Invitado";

  return (
    <div>
      <h1>Bienvenido {nombre} 🚀</h1>
    </div>
  );
};

export default Home;

