import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Services } from "../../services/Services";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./DoktorPacijentiPage.module.css";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function DoktorPacijentiPage(){
    const {doktorId}=useParams();
    console.log(doktorId);
    const [pacijenti,setPacijenti]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.getPacijentiDoktor(doktorId);
            console.log(response);
            setPacijenti(response);
            console.log(pacijenti);
        };
        fetchData();
    },[doktorId]);
    return(<>
    <Navbar 
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to="/raspored">Raspored</Link>} 
           text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
           <h1>Svi pacijenti</h1>
    {pacijenti.map((pacijent,index)=>(
        <div>
        <div key={index} className={styles.item}>
            <div className={styles.text}><span>{pacijent.brojKartona} </span> 
                      <span> {pacijent.ime} </span> 
                      <span> {pacijent.prezime} </span> 
                      </div>
                      <span className={styles.buttonSpan}><Link to={`/pacijentInfo/${doktorId}/${pacijent.idKorisnik}`}><ContainedButton text={<MoreHorizIcon/>} module={styles.button}/></Link></span>
                      </div>
                      </div>
        
    ))}
    </>)
}