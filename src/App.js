import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Usluge from './pages/Usluge/Usluge';
import PrikazUsluge from './pages/PrikazUsluge/PrikazUsluge';
import Prijava from "./pages/Prijava/Prijava";
import Registracija from './pages/Registracija/Registracija';
import PrivateRoute from './PrivateRoute';
import { TokenServices } from './services/TokenServices';
import AdminPage from './pages/AdminPage/AdminPage';
import DoktorPage from './pages/DoktorPage/DoktorPage';
import PacijentPage from './pages/PacijentPage/PacijentPage';
import MedSestraPage from './pages/MedSestraPage/MedSestraPage';

function App() {
  return (
    <BrowserRouter>
   <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usluge/:granaId/:nazivGrana" element={<Usluge/>}/>
          <Route path="/usluga/:uslugaId" element={<PrikazUsluge/>}/>
          <Route path="/prijava" element={<Prijava/>}/>
          <Route path="/registracija" element={<Registracija/>}/>
          <Route element={<PrivateRoute/>}>
          <Route path="/admin/:korisnikId"  element={<AdminPage/>}/>
          <Route path="doktor/:korisnikId"  element={<DoktorPage/>}/>
          <Route path="pacijent/:korisnikId" element={<PacijentPage/>}/>
          <Route path="medSestra/:korisnikId" element={<MedSestraPage/>}/>
          </Route>
        </Routes>
   </BrowserRouter>
  );
}

export default App;
