import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

export default function PacijentPage(){
    return(
        <>
        <Navbar 
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to="/pacijentProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
        </>
    )
}