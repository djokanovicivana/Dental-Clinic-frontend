import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
export default function DoktorPage(){
    return(
        <>
           <Navbar 
           text2={<Link to="/doktorPacijenti">Pacijenti</Link>}
           text3={<Link to="/raspored">Raspored</Link>} 
           text4={<Link to="/doktorProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
        </>
    )
}