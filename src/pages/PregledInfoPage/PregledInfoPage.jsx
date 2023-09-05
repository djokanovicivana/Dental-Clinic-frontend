import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./PregledInfoPage.module.css";
import { Services } from "../../services/Services";
import format from "date-fns/format";
import { TokenServices } from "../../services/TokenServices";
export default function PregledInfoPage() {
    const { doktorId, pregledId } = useParams();
    const uloga=TokenServices.uzimanjeSesijeUloga();
    const [pregled, setPregled] = useState([]);
    const [pacijent, setPacijent] = useState([]);
    const [termin, setTermin]=useState([]);
    const [usluga, setUsluga]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const pregledResponse = await Services.getPregled(pregledId);
            setPregled(pregledResponse);
            console.log(pregledResponse);

            if (pregledResponse[0].idKorisnikPacijent) {
                const pacijentResponse = await Services.getPacijentId(pregledResponse[0].idKorisnikPacijent);
                setPacijent(pacijentResponse);
            }
            if(pregledResponse[0].idTermin){
                const terminResponse=await Services.getTermin(pregledResponse[0].idTermin);
                setTermin(terminResponse);
               console.log(pregledResponse[0].idTermin)
            }
            if(pregledResponse[0].idUsluga){
                const uslugaResponse=await Services.getUsluga(pregledResponse[0].idUsluga);
                setUsluga(uslugaResponse);
            }
        };
        fetchData();
    }, [pregledId, doktorId]);

    return (
        <>
           {uloga==='Doktor' ? (<Navbar 
                text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
                text3={<Link to="/raspored">Raspored</Link>} 
                text4={<Link to="/profil">Tvoj profil</Link>}
                text5="Odjavi se"
            />) : (uloga==='Pacijent' ? <Navbar 
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to="/pacijentProfil">Tvoj profil</Link>}
           text5="Odjavi se"/> :  <Navbar text2={<Link to="/sviZaposleni">Zaposleni</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>)}
            <div className={styles.box}>
                <h1 className={styles.heading}>Detalji pregleda</h1>
                <div className={styles.info}>
                {pacijent[0] && termin[0] && usluga[0] && pregled[0] && <>
                    <p><span className={styles.label}>Pacijent: </span><span>{pacijent[0].ime} {pacijent[0].prezime}</span></p>
                    <p><span className={styles.label}>Vreme pregleda: </span><span>{format(new Date(termin[0].datumTermina + ' ' + termin[0].vremeTermina), "dd.MM.yyyy HH:mm")}</span></p>
            
                        <p><span className={styles.label}>Usluga: </span><span>{usluga[0].nazivUsluga}</span></p>
                        <p><span className={styles.label}>Anamneza: </span><span>{pregled[0].anamneza}</span></p>
                        <p><span className={styles.label}>Dijagnoza: </span><span>{pregled[0].dijagnoza}</span></p>
                        <p><span className={styles.label}>Preporučeno lečenje: </span><span>{pregled[0].lecenje}</span></p>
                    </>
                }
            </div>
            </div>
        </>
    );
}
