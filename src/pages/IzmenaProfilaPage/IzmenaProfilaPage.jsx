import React from "react";
import {useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./IzmenaProfilaPage.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { Services } from "../../services/Services";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { TokenServices } from "../../services/TokenServices";
export default function IzmenaProfilaPage(props){
const rola=TokenServices.uzimanjeSesijeUloga();
const {korisnikId, uloga}=useParams();
const [korisnik,setKorisnik]=useState({});
const [doktorId, setDoktorId]=useState(null);
const { register, handleSubmit,  formState: { errors }, reset } = useForm();
useEffect(()=>{
    const fetchData=async()=>{
        if(uloga==='Pacijent'){
        const response=await Services.getPacijentId(korisnikId);
        setKorisnik(response[0]);}
        else if(uloga==='Administrator'){
        const response=await Services.adminId(korisnikId);
        setKorisnik(response[0]);}
        else if(uloga==='Medicinska sestra'){
        const response=await Services.sestraId(korisnikId);
        setKorisnik(response[0]);
        setDoktorId(response[0].idDoktor);
    }}
fetchData();
},[korisnikId]);

useEffect(() => {
    if (korisnik) {
        reset({
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            brojTelefona:korisnik.brojTelefona,
            email:korisnik.email,
            korisnickoIme:korisnik.korisnickoIme,
            godiste:korisnik.godiste,
        });
    }
}, [korisnik]); 
const onSubmit=async(data)=>{
    const response=await Services.izmeniKorisnika(
        {     'ime':data.ime,
         'prezime':data.prezime,
         'korisnickoIme':data.korisnickoIme,
        'email':data.email,
    'brojTelefona':data.brojTelefona,
'godiste':data.godiste,
'old_password':data.old_password,
'new_password':data.new_password,
'new_password_confirmation':data.new_password_confirmation
}
    );
    console.log(response);   
}
    return(<>
    {rola==='Administrator' ?  (<Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>): (rola==='Pacijent' ? ( <Navbar 
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to={`/pacijentProfil/${korisnikId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>):   <Navbar 
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/profilSestra/${korisnikId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>) }
           <div className={styles.box}>
            <h1 className={styles.heading}>Izmeni podatke:</h1>
         {korisnik &&   <form onSubmit={handleSubmit(onSubmit)} method="PATCH" className={styles.form}>
                <div className={styles.row1}>
                    <div className={styles.item}>
                        <p className={styles.label}>Ime: </p>
                            <TextField
                                id="ime"
                                name="ime"
                                label=""
                                variant="outlined"
                                className={styles.field}
                                {...register('ime')} />
                        </div>
                        <div className={styles.item}>
                            <p className={styles.label}>Prezime: </p>
                            <TextField
                                id="prezime"
                                name="prezime"
                                label=""
                                variant="outlined"
                                className={styles.field}
                                {...register('prezime')} />
                        </div>
                        <div className={styles.item}>
                            <p className={styles.label}>Broj telefona: </p>
                            <TextField
                                id="brojTelefona"
                                name="brojTelefona"
                                label=""
                                variant="outlined"
                                className={styles.field}
                                {...register('brojTelefona')} />
                        </div>
                        <div className={styles.item}>
                            <p className={styles.label}>E-mail:</p>
                            <TextField
                                id="email"
                                label=""
                                name="email"
                                variant="outlined"
                                className={styles.field}
                                {...register('email')} />
                        </div>
                        <div className={styles.item}>
                            <p className={styles.label}>Korisničko ime: </p>
                            <TextField
                                id="korisnickoIme"
                                name="korisnickoIme"
                                label=""
                                variant="outlined"
                                className={styles.field}
                                {...register('korisnickoIme')} />
                        </div>
                        </div>
                        <div className={styles.row2}>
                <div className={styles.item}>
                    <p className={styles.label}>Godište: </p>
                  <TextField
                    id="godiste"
                    name="godiste"
                    label=""
                    variant="outlined"
                    type="number"
                    className={styles.field}
                    {...register('godiste', { 
                        min: {
                            value: 1900,
                            message: "Unesite validno godište"
                        },
                        max: {
                            value: new Date().getFullYear(),
                            message: "Unesite validno godište"
                        }
                    })}
                />
                {errors.godiste && <p className={props.module.error}>{errors.godiste.message}</p>}
                </div>
          <div className={styles.item}>
                            <TextField label="Unesi staru lozinku" 
                             id="old_password"
                             name="old_password"
                            variant="outlined"
                            type="password"
                            className={styles.field}
                            {...register('old_password')} />
                        </div>
                        <div className={styles.item}>
                            <TextField label="Unesi novu lozinku" 
                             id="new_password"
                             name="new_password"
                            variant="outlined"
                            type="password"
                            className={styles.field}
                            {...register('new_password')} />
                        </div>
                         <div className={styles.item}>
                            <TextField label="Potvrdi lozinku" 
                             id="new_password_confirmation"
                             name="new_password_confirmation"
                             variant="outlined"
                             type="password"
                             className={styles.field}
                             {...register('password_confirmation')} />
                        </div>
                        <ContainedButton text="POTVRDI" type="submit" module={styles.button}/>
                        </div>
                        </form>}
                        </div>
    </>)
}