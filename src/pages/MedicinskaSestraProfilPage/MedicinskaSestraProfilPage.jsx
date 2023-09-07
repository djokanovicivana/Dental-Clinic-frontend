import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profil from "../../components/Profil/Profil";
import "@fontsource/nunito";
import { Services } from "../../services/Services";
import styles from "./MedicinskaSestraProfilPage.module.css";
import { TokenServices } from "../../services/TokenServices";

export default function MedicinskaSestrProfilPage() {
  const uloga = TokenServices.uzimanjeSesijeUloga();
  const { sestraId } = useParams();
  const [id, setId] = useState(sestraId);
  const [sestra, setSestra] = useState([]);
  const [doktorId, setDoktorId]=useState(null);
  useEffect(()=>{
    const fetchData=async()=>{
        const response=await Services.sestraId(sestraId);
        setDoktorId(response[0].idDoktor);
    };
    fetchData();
  },[sestraId]);

  useEffect(() => {
    if (uloga === "Administrator") {
      setId(sestraId);
    } else {
      const idSestra = TokenServices.uzimanjeSesijeId();
      setId(idSestra);
    }
  }, [sestraId, uloga]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Services.sestraId(id);
      setSestra(response);
    };
    fetchData();
  }, [id]);

  return (
    <>
    {uloga==='Medicinska Sestra' ? (
         <Navbar 
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/profilSestra/${sestraId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>) : (<Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>)}

      {sestra[0] && (
        <Profil
          uloga="Medicinska sestra"
          ime={sestra[0].ime}
          prezime={sestra[0].prezime}
          email={sestra[0].email}
          korisnickoIme={sestra[0].korisnickoIme}
          godiste={sestra[0].godiste}
          brojTelefona={sestra[0].brojTelefona}
          module={styles}
          link={`/izmenaKorisnika/${id}/Medicinska sestra`}
        />
      )}
    </>
  );
}
