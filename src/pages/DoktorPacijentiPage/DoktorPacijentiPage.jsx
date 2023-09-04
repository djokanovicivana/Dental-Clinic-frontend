import React from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./DoktorPacijentiPage.module.css";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import { TokenServices } from "../../services/TokenServices";
import { OutlinedInput, TextField } from "@mui/material";

import { useForm } from 'react-hook-form';
export default function DoktorPacijentiPage(){
    const doktorId=TokenServices.uzimanjeSesijeId();
    const {register, handleSubmit}=useForm();
    const [pacijenti,setPacijenti]=useState([]);
    const [originalPacijenti,setOriginalPacijenti]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
           const response=await Services.getPacijentiDoktor({
            'idKorisnik':doktorId,
            'searchTerm':''
        });
        setPacijenti(response);
        setOriginalPacijenti(response);
        };
        fetchData();
    },[doktorId]);
       const onSubmit = async (data) => {
        console.log(data);
        if (!data.pretraga) {
            setPacijenti(originalPacijenti);
        } else {
            const response = await Services.getPacijentiDoktor({
                'idKorisnik': doktorId,
                'searchTerm': data.pretraga
            });
            setPacijenti(response);
            console.log(response);
        }
    }
    return(<>
      <Navbar 
           text2={<Link to="/doktorPacijenti">Pacijenti</Link>}
           text3={<Link to="/raspored">Raspored</Link>} 
           text4={<Link to="/doktorProfil">Tvoj profil</Link>}
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
    {pacijenti.map((pacijent,index)=>(
        <div>
        <div key={index} className={styles.item}>
            <div className={styles.text}><span>{pacijent.brojKartona} </span> 
                      <span> {pacijent.ime} </span> 
                      <span> {pacijent.prezime} </span> 
                      </div>
                      </div>
                      </div>
        
    ))}
    </>)
}