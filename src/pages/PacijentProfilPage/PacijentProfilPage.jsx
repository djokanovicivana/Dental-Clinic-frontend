import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profil from "../../components/Profil/Profil";
import "@fontsource/nunito";
import { Services } from "../../services/Services";
import styles from "./PacijentProfilPage.module.css";
import { TokenServices } from "../../services/TokenServices";
import ContainedButton from "../../components/ContainedButton/ContainedButton";

export default function PacijentProfilPage() {
  const uloga = TokenServices.uzimanjeSesijeUloga();
  const { pacijentId } = useParams();
  const [id, setId] = useState(pacijentId);
  const [pacijent, setPacijent] = useState([]);

  useEffect(() => {
    if (uloga === "Administrator") {
      setId(pacijentId);
    } else {
      const idPacijent = TokenServices.uzimanjeSesijeId();
      setId(idPacijent);
    }
  }, [pacijentId, uloga]);
  console.log(pacijentId, uloga);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Services.getPacijentId(id);
      setPacijent(response);
    };
    fetchData();
  }, [id]);

  return (
    <>
    {uloga==='Pacijent' ? (
       <Navbar 
           text2={<Link to={`/zakazivanje/${pacijentId}`}>Zakaži termin</Link>}
           text3={<Link to={`/pacijentTermini/${pacijentId}`}>Tvoji termini</Link>} 
           text4={<Link to={`/pacijentProfil/${pacijentId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>) : (<Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>)}
         {uloga==='Administrator' &&
                  <div className={styles.opcije}>
                <Link to={`/pacijentTermini/${pacijentId}`}>
                <ContainedButton module={styles.button1} text="Pregledi"/>
                </Link>
                <Link to={`/zakazivanje/${pacijentId}`}>
                <ContainedButton module={styles.button1} text="Zakazivanje"/>
                </Link>
        </div>}

      {pacijent[0] && (<>
        <Profil
          uloga="Pacijent"
          ime={pacijent[0].ime}
          prezime={pacijent[0].prezime}
          brojKartona={pacijent[0].brojKartona}
          email={pacijent[0].email}
          korisnickoIme={pacijent[0].korisnickoIme}
          godiste={pacijent[0].godiste}
          brojTelefona={pacijent[0].brojTelefona}
          module={styles}
          link={`/izmenaKorisnika/${id}/Pacijent`}
        />
          
        
</>
      )}
    </>
  );
}
