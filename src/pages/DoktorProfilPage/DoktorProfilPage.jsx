import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import { useState } from "react";
import Profil from "../../components/Profil/Profil";
import styles from "./DoktorProfilPage.module.css";
export default function DoktorProfilPage(){
    const {doktorId}=useParams();
    const [doktor,setDoktor]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.getDoktor(doktorId);
            setDoktor(response);
            console.log(response);
        };
        fetchData();
    },[doktorId]);
    console.log(doktorId);
    return(
        <>
         <Navbar 
                text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
                text3={<Link to="/raspored">Raspored</Link>} 
                text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
                text5="Odjavi se"
                />
                {doktor[0]&& <Profil uloga="Doktor" ime={doktor[0].ime} prezime={doktor[0].prezime} slika={doktor[0].slika} nazivGrana={doktor[0].nazivGrana} godiste={doktor[0].godiste} brojTelefona={doktor[0].brojTelefona} korisnickoIme={doktor[0].korisnickoIme} email={doktor[0].email} 
                module={styles}
                link={`/izmenaDoktora/${doktorId}`}/>}
             
             </> 
              
    )
}