import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { Services } from "../../services/Services";
import Profil from "../../components/Profil/Profil";
import styles from "./DoktorProfilPage.module.css";
import { TokenServices } from "../../services/TokenServices";
import ContainedButton from "../../components/ContainedButton/ContainedButton";

export default function DoktorProfilPage() {
  const { doktorId } = useParams();
  const uloga = TokenServices.uzimanjeSesijeUloga();
  const [id, setId] = useState(doktorId);
  const [doktor, setDoktor] = useState([]);

  useEffect(() => {
    if (uloga === 'Administrator') {
      setId(doktorId);
    } else {
      const idDoktor = TokenServices.uzimanjeSesijeId();
      setId(idDoktor);
    }
  }, [doktorId, uloga]);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== null) {
        const response = await Services.getDoktor(id);
        setDoktor(response);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
        {uloga==='Doktor' ?  (<Navbar 
           text1={<Link to={`/doktorPregledi/${doktorId}`}>Pregledi</Link>}
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>) 
           : ( <Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>)}
    {uloga==='Administrator' &&
                  <div className={styles.opcije}>
                <Link to={`/doktorPacijenti/${doktorId}`}>
                <ContainedButton module={styles.button1} text="Pacijenti"/>
                </Link>
                <Link to={`/raspored/${doktorId}`}>
                <ContainedButton module={styles.button1} text="Raspored"/>
                </Link>
                <Link to={`/doktorPregledi/${doktorId}`}>
                <ContainedButton module={styles.button1} text="Pregledi"/>
                </Link>
                </div>}
      {doktor[0] && (
        <Profil
          uloga="Doktor"
          ime={doktor[0].ime}
          prezime={doktor[0].prezime}
          slika={doktor[0].slika}
          nazivGrana={doktor[0].nazivGrana}
          godiste={doktor[0].godiste}
          brojTelefona={doktor[0].brojTelefona}
          korisnickoIme={doktor[0].korisnickoIme}
          email={doktor[0].email}
          module={styles}
          link={`/izmenaDoktora/${id}`}
        />
      )}
    </>
  );
}
