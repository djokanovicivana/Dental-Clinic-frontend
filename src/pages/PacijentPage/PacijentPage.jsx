import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { TokenServices } from "../../services/TokenServices";
export default function PacijentPage(){
    const pacijentId=TokenServices.uzimanjeSesijeId();
    return(
        <>
        <Navbar 
           text2={<Link to={`/zakazivanje/${pacijentId}`}>Zakaži termin</Link>}
           text3={<Link to={`/pacijentTermini/${pacijentId}`}>Tvoji termini</Link>} 
           text4={<Link to={`/pacijentProfil/${pacijentId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
        </>
    )
}