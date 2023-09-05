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
import DoktorPacijentiPage from './pages/DoktorPacijentiPage/DoktorPacijentiPage';
import PacijentInfoPage from './pages/PacijentInfoPage/PacijentInfoPage';
import PregledInfoPage from './pages/PregledInfoPage/PregledInfoPage';
import NoviPregledPage from './pages/NoviPregledPage/NoviPregledPage';
import DoktorProfilPage from './pages/DoktorProfilPage/DoktorProfilPage';
import PacijentProfilPage from './pages/PacijentProfilPage/PacijentProfilPage';
import ZakazivanjePage from './pages/ZakazivanjePage/ZakazivanjePage';
import PacijentTerminiPage from './pages/PacijentTerminiPage/PacijentTerminiPage';
import IzmenaPacijentaPage from './pages/IzmenaPacijentaPage/IzmenaPacijentaPage';
import IzmenaDoktoraPage from './pages/IzmenaDoktoraPage/IzmenaDoktoraPage';
import SviPacijentiPage from './pages/SviPacijentiPage/SviPacijentiPage';
import SviZaposleniPage from './pages/SviZaposleniPage/SviZaposleniPage';
import AdminProfilPage from './pages/AdminProfilPage/AdminProfilPage';
import Raspored from './components/Raspored/Raspored';
import ZakazivanjeRaspored from './pages/ZakazivanjeRaspored/ZakazivanjeRaspored';
import DoktorPreglediPage from './pages/DoktorPreglediPage/DoktorPreglediPage';
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
          <Route path="/admin"  element={<AdminPage/>}/>
          <Route path="/doktor"  element={<DoktorPage/>}/>
           <Route path="/raspored"  element={<Raspored/>}/>
           <Route path="/doktorPregledi"  element={<DoktorPreglediPage/>}/>
          <Route path="/pacijent" element={<PacijentPage/>}/>
          <Route path="/doktorPacijenti" element={<DoktorPacijentiPage/>}/>
          <Route path="/pacijentInfo/:pacijentId" element={<PacijentInfoPage/>}/>
          <Route path="/pregledInfo/:doktorId/:pregledId" element={<PregledInfoPage/>}/>
          <Route path="/noviPregled/:pacijentId" element={<NoviPregledPage />}/>
          <Route path="/doktorProfil" element={<DoktorProfilPage/>}/>
           <Route path="/adminProfil" element={<AdminProfilPage/>}/>
           <Route path="/sviZaposleni" element={<SviZaposleniPage/>}/>
           <Route path="/sviPacijenti" element={<SviPacijentiPage/>}/>
          <Route path="/pacijentProfil" element={<PacijentProfilPage/>}/>
          <Route path="/pacijentTermini" element={<PacijentTerminiPage/>}/>
          <Route path="/zakazivanje" element={<ZakazivanjePage/>}/>
          <Route path="/izmenaPacijenta/:pacijentId" element={<IzmenaPacijentaPage uloga="Pacijent"/>}/>
           <Route path="/izmenaDoktora/:doktorId" element={<IzmenaDoktoraPage uloga="Doktor"/>}/>
           <Route path="/zakazivanjeRaspored/:pocetniDatum/:krajnjiDatum/:pocetnoVreme/:krajnjeVreme/:doktor/:usluga/:index" element={<ZakazivanjeRaspored/>}/>

          </Route>
        </Routes>
   </BrowserRouter>
  );
}

export default App;
