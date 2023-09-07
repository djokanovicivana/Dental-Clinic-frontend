import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Profil from "../../components/Profil/Profil";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Services } from "../../services/Services";
import { TokenServices } from "../../services/TokenServices";
import styles from "./AdminProfilPage.module.css";
export default function AdminProfilPage(){
    const [admin, setAdmin]=useState([]);
    const adminId=TokenServices.uzimanjeSesijeId();
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.adminId(adminId);
            setAdmin(response);
        };
        fetchData();
    },[adminId]);
    return(
        <>
        <Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>
         {admin[0] && (
        <Profil
          uloga="Administrator"
          ime={admin[0].ime}
          prezime={admin[0].prezime}
          email={admin[0].email}
          korisnickoIme={admin[0].korisnickoIme}
          godiste={admin[0].godiste}
          brojTelefona={admin[0].brojTelefona}
          module={styles}
          link={`/izmenaKorisnika/${adminId}/Administrator`}
          
        />
      )}
        </>
    )
}