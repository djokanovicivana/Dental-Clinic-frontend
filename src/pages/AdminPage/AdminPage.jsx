import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function AdminPage(){
    const {adminId}=useParams();
    return(
        <>
        <Navbar text2={<Link to="/sviZaposleni">Zaposleni</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to={`/profilAdmin/${adminId}`}>Tvoj profil</Link>}
        text5="Odjavi se"/>
        </>
    )
}