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
import FileUploader1 from "./FileUploader1";
import Courses from "./cursos/Courses";
import DemoApp from "./DemoApp";
import Principal from "./Principal";
import Profile from "./Profile";
import Dashboardad2 from "./admin/Dashboard2";
import InfCur from "./cursos/InfCur";
import CreateCourse from "./CreateCourse";


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
                <Route path="/b" element= { <Dashboardad2/>} />
                <Route path="/dashboard2" element= { <Dashboardes/>} />
              <Route path="/login" element= { <Login/>} />
               <Route path="/" element= { <Courses/>} />
                <Route path="/demo" element= { <DemoApp/>} />
                 <Route path="/profile" element= { <Profile/>} />
                  <Route path="/demo" element= { <DemoApp/>} />
                 <Route path="/file" element= { <FileUploader1/>} />
                   <Route path="/curso" element= { <CreateCourse/>} />
                   <Route path="/a" element={<Principal/>}/>
                   <Route path="/curso/:id" element={<InfCur />} />
                   <Route path="/CreateCourse" element={<CreateCourse />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;