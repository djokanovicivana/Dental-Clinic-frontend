import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { TokenServices } from "../../services/TokenServices";
export default function DoktorPage(){
const doktorId=TokenServices.uzimanjeSesijeId();
    return(
        <>
           <Navbar 
           text1={<Link to={`/doktorPregledi/${doktorId}`}>Pregledi</Link>}
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
        </>
    )
}