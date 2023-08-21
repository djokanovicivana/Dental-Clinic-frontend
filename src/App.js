import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Usluge from './pages/Usluge/Usluge';
import PrikazUsluge from './pages/PrikazUsluge/PrikazUsluge';
import Prijava from "./pages/Prijava/Prijava";
import Registracija from './pages/Registracija/Registracija';
import PrivateRoute from './PrivateRoute';
import AdminPage from './pages/AdminPage/AdminPage';
import DoktorPage from './pages/DoktorPage/DoktorPage';
import PacijentPage from './pages/PacijentPage/PacijentPage';
import MedSestraPage from './pages/MedSestraPage/MedSestraPage';
import DoktorPacijentiPage from './pages/DoktorPacijentiPage/DoktorPacijentiPage';
import PacijentInfoPage from './pages/PacijentInfoPage/PacijentInfoPage';
import PregledInfoPage from './pages/PregledInfoPage/PregledInfoPage';
import NoviPregledPage from './pages/NoviPregledPage/NoviPregledPage';
import DoktorProfilPage from './pages/DoktorProfilPage/DoktorProfilPage';
import PacijentProfilPage from './pages/PacijentProfilPage/PacijentProfilPage';
import ZakazivanjePage from './pages/ZakazivanjePage/ZakazivanjePage';
import PacijentTerminiPage from './pages/PacijentTerminiPage/PacijentTerminiPage';
import IzmenaPacijentaPage from './pages/IzmenaPacijentaPage/IzmenaPacijentaPage';

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
          <Route path="/doktor/:doktorId"  element={<DoktorPage/>}/>
          <Route path="/pacijent/:pacijentId" element={<PacijentPage/>}/>
          <Route path="/medSestra/:korisnikId" element={<MedSestraPage/>}/>
          <Route path="/medSestra/:korisnikId" element={<MedSestraPage/>}/>
          <Route path="/doktorPacijenti/:doktorId" element={<DoktorPacijentiPage/>}/>
          <Route path="/pacijentInfo/:doktorId/:pacijentId" element={<PacijentInfoPage/>}/>
          <Route path="/pregledInfo/:doktorId/:pregledId" element={<PregledInfoPage/>}/>
          <Route path="/noviPregled/:doktorId/:pacijentId" element={<NoviPregledPage/>}/>
          <Route path="/doktorProfil/:doktorId" element={<DoktorProfilPage/>}/>
          <Route path="/pacijentProfil/:pacijentId" element={<PacijentProfilPage/>}/>
          <Route path="/pacijentTermini/:pacijentId" element={<PacijentTerminiPage/>}/>
          <Route path="/zakazivanje/:pacijentId" element={<ZakazivanjePage/>}/>
          <Route path="/izmenaPacijenta/:pacijentId" element={<IzmenaPacijentaPage uloga="Pacijent"/>}/>
          </Route>
        </Routes>
   </BrowserRouter>
  );
}

export default App;
