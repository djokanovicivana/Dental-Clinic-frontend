import React from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./SviPacijentiPage.module.css";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
export default function SviPacijentiPage(){
    const navigate=useNavigate();
    const {register, handleSubmit}=useForm();
    const [pacijenti,setPacijenti]=useState([]);
    const [originalPacijenti,setOriginalPacijenti]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
           const response=await Services.sviPacijenti({'searchTerm':''});
        setPacijenti(response);
        setOriginalPacijenti(response);
        };
        fetchData();
    },[]);
       const onSubmit = async (data) => {
        console.log(data);
        if (!data.pretraga) {
            setPacijenti(originalPacijenti);
        } else {
            const response = await Services.sviPacijenti({
                'searchTerm': data.pretraga
            });
            setPacijenti(response);
            console.log(response);
        }
    }
    return(
        <>
        <Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>
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
  { pacijenti.length>0 ? pacijenti.map((pacijent, index)=> (
  <div key={index} className={styles.item}>
    <div className={styles.text} onClick={()=>{
        navigate(`/pacijentProfil/${pacijent.idKorisnik}`);
    }}>
      <span> {pacijent.ime} </span>
      <span> {pacijent.prezime} </span>
    </div>
  </div>
)) : <h3 className={styles.error}>Nema dostupnih pacijenata.</h3>};
        </>
    )
}