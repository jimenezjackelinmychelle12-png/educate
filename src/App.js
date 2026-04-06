import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Contact from "./Contact";
import Home from "./Home";
import VerifyOtp from "./password/VerifyOtp";
import CambiarPassword from "./password/CambiarPassword";
import Reportelog from "./Reportelog";
import Dashboardadmin from "./admin/Dashboardadmin";
import Dashboardes from "./admin/Dashboardes";
import Dashboarddoc from "./admin/Dashboarddoc";
import Courses from "./cursos/Courses";
import DemoApp from "./DemoApp";

import Profile from "./Profile";
function App() {
  return (
    <div>

      <BrowserRouter>
            <Routes>
              <Route path="/home" element= { <Home/>} />
              <Route path="/register" element= { <Register/>} />
              <Route path="/cambiar" element= { <CambiarPassword/>} />
               <Route path="/contact" element= { <Contact/>} />
               <Route path="/verify" element= { <VerifyOtp/>} />
                 <Route path="/reporte" element= { <Reportelog/>} />
                 <Route path="/dashboard" element= { <Dashboardadmin/>} />
                <Route path="/dashboard1" element= { <Dashboarddoc/>} />
                <Route path="/dashboard2" element= { <Dashboardes/>} />
              <Route path="/login" element= { <Login/>} />
               <Route path="/" element= { <Courses/>} />
                <Route path="/demo" element= { <DemoApp/>} />
                 <Route path="/profile" element= { <Profile/>} />
            </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;