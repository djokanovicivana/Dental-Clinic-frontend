import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import { useState } from "react";
import styles from './DoktorProfilPage.module.css';
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import EditIcon from '@mui/icons-material/Edit';
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
                {doktor[0]&& <div className={styles.box}>
                <h1>{doktor[0].ime} {doktor[0].prezime}</h1>
                <div className={styles.info}>
                <div className={styles.imageDiv}>
                <img className={styles.image} src={require(`../../images/${[doktor[0].slika]}`)}/>
                </div>
                <div className={styles.text}>
                <p><span className={styles.label}>Specijalnost:</span> {doktor[0].nazivGrana}</p>
                <p><span className={styles.label}>Godište: </span>{doktor[0].godiste}</p>
                <p><span className={styles.label}>Broj telefona: </span>{doktor[0].brojTelefona}</p>
                <p><span className={styles.label}>E-mail: </span>{doktor[0].email}</p>
                <p><span className={styles.label}>Korisničko ime: </span> {doktor[0].korisnickoIme}</p>
                <ContainedButton text={<EditIcon/>} module={styles.button}/>
                </div>
                </div>
                </div>
}

             
             </> 
              
    )
}