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
import IzmenaProfilaPage from './pages/IzmenaProfilaPage/IzmenaProfilaPage';
import IzmenaDoktoraPage from './pages/IzmenaDoktoraPage/IzmenaDoktoraPage';
import SviPacijentiPage from './pages/SviPacijentiPage/SviPacijentiPage';
import SviDoktoriPage from './pages/SviDoktoriPage/SviDoktoriPage';
import AdminProfilPage from './pages/AdminProfilPage/AdminProfilPage';
import Raspored from './components/Raspored/Raspored';
import ZakazivanjeRaspored from './pages/ZakazivanjeRaspored/ZakazivanjeRaspored';
import DoktorPreglediPage from './pages/DoktorPreglediPage/DoktorPreglediPage';
import SveMedicinskeSestrePage from './pages/SveMedicinskeSestrePage/SveMedicinskeSestrePage';
import MedicinskaSestrProfilPage from './pages/MedicinskaSestraProfilPage/MedicinskaSestraProfilPage';
import MedicinskaSestraPage from './pages/MedicinskaSestraPage/MedicinskaSestraPage';
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
           <Route path="/raspored/:doktorId"  element={<Raspored/>}/>
           <Route path="/doktorPregledi/:doktorId"  element={<DoktorPreglediPage/>}/>
          <Route path="/pacijent" element={<PacijentPage/>}/>
          <Route path="/sestra" element={<MedicinskaSestraPage/>}/>
          <Route path="/doktorPacijenti/:doktorId" element={<DoktorPacijentiPage/>}/>
          <Route path="/pacijentInfo/:pacijentId/:doktorId" element={<PacijentInfoPage/>}/>
          <Route path="/pregledInfo/:doktorId/:pregledId" element={<PregledInfoPage/>}/>
          <Route path="/noviPregled/:pacijentId" element={<NoviPregledPage />}/>
          <Route path="/doktorProfil/:doktorId" element={<DoktorProfilPage/>}/>
           <Route path="/profilAdmin" element={<AdminProfilPage/>}/>
           <Route path="/profilSestra/:sestraId" element={<MedicinskaSestrProfilPage/>}/>
           <Route path="/sviDoktori" element={<SviDoktoriPage/>}/>
           <Route path="/sviPacijenti" element={<SviPacijentiPage/>}/>
           <Route path="/sveMedicinskeSestre" element={<SveMedicinskeSestrePage/>}/>
          <Route path="/pacijentProfil/:pacijentId" element={<PacijentProfilPage/>}/>
          <Route path="/pacijentTermini/:pacijentId" element={<PacijentTerminiPage/>}/>
          <Route path="/zakazivanje/:pacijentId" element={<ZakazivanjePage/>}/>
          <Route path="/izmenaKorisnika/:korisnikId/:uloga" element={<IzmenaProfilaPage/>}/>
           <Route path="/izmenaDoktora/:doktorId" element={<IzmenaDoktoraPage uloga="Doktor"/>}/>
           <Route path="/zakazivanjeRaspored/:pocetniDatum/:krajnjiDatum/:pocetnoVreme/:krajnjeVreme/:doktor/:usluga/:index" element={<ZakazivanjeRaspored/>}/>

          </Route>
        </Routes>
   </BrowserRouter>
  );
}

export default App;
