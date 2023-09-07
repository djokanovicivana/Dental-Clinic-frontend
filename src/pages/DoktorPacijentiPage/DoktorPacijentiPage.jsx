import React from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./DoktorPacijentiPage.module.css";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import SearchIcon from '@mui/icons-material/Search';
import { TokenServices } from "../../services/TokenServices";
import { OutlinedInput, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
export default function DoktorPacijentiPage(){
    const navigate=useNavigate();
    const {doktorId}=useParams();
    const uloga=TokenServices.uzimanjeSesijeUloga();
    const [id, setId]=useState(doktorId);
    const [sestraId, setSestraId]=useState(null);
    const {register, handleSubmit}=useForm();
    const [pacijenti,setPacijenti]=useState([]);
    const [originalPacijenti,setOriginalPacijenti]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
        if(uloga==='Doktor'){
            const idDoktor=TokenServices.uzimanjeSesijeId();
            setId(idDoktor);
        }else if(uloga==='Medicinska Sestra'){
            const idSestra=TokenServices.uzimanjeSesijeId();
            setSestraId(idSestra);
            const response=await Services.sestraId(idSestra);
            setId(response[0].idDoktor);
            console.log(response);
        }};
        fetchData();
    },[uloga,doktorId]);
    console.log(id);
    useEffect(()=>{
        const fetchData=async()=>{
           const response=await Services.getPacijentiDoktor({
            'idKorisnik':id,
            'searchTerm':''
        });
        setPacijenti(response);
        setOriginalPacijenti(response);
        };
        fetchData();
    },[id]);
       const onSubmit = async (data) => {
        console.log(data);
        if (!data.pretraga) {
            setPacijenti(originalPacijenti);
        } else {
            const response = await Services.getPacijentiDoktor({
                'idKorisnik': id,
                'searchTerm': data.pretraga
            });
            setPacijenti(response);
            console.log(response);
        }
    }
    return(<>
    {uloga==='Doktor' ?  (<Navbar 
           text1={<Link to={`/doktorPregledi/${doktorId}`}>Pregledi</Link>}
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>) : (uloga==='Medicinska Sestra' ? (
         <Navbar 
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/profilSestra/${sestraId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
           ):  <Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>)}
           <form action="get" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
           <OutlinedInput
           className={styles.searchBar}
           id="pretraga"
           name="pretraga"
           variant="outlined"
           {...register('pretraga')}
           />
           <ContainedButton text={<SearchIcon/>} type="submit" module={styles.search}/>
           </form>
    {pacijenti.map((pacijent,index)=>(
        <div>
        <div key={index} className={styles.item} onClick={()=>{
            navigate(`/pacijentInfo/${pacijent.idKorisnik}/${doktorId}`)
        }}>
            <div className={styles.text}><span>{pacijent.brojKartona} </span> 
                      <span> {pacijent.ime} </span> 
                      <span> {pacijent.prezime} </span> 
                      </div>
                      </div>
                      </div>
        
    ))}
    </>)
}