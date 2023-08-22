import React from "react";
import {useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./IzmenaPacijentaPage.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { Services } from "../../services/Services";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
export default function IzmenaPacijentaPage(props){
const {pacijentId}=useParams();
const [pacijent,setPacijent]=useState({});
const { register, handleSubmit,  formState: { errors }, reset } = useForm();
useEffect(()=>{
    const fetchData=async()=>{
        const response=await Services.getPacijentId(pacijentId);
        setPacijent(response[0]);
    };
    fetchData();
},[pacijentId]);
useEffect(() => {
    if (pacijent) {
        reset({
            ime: pacijent.ime,
            prezime: pacijent.prezime,
            brojTelefona:pacijent.brojTelefona,
            email:pacijent.email,
            korisnickoIme:pacijent.korisnickoIme,
            godiste:pacijent.godiste,
        });
    }
}, [pacijent]); 
const onSubmit=async(data)=>{
    const response=await Services.izmeniPacijenta(
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
    console.log(data,pacijentId);
}
console.log(pacijent.ime);
    return(<>
    {props.uloga==='Administrator' ? <Navbar text2="Zaposleni"
    text3="Pacijenti"
text4="Tvoj profil"
text5="Odjavi se"/> : <Navbar 
           text2={<Link to={`/zakazivanje/${pacijentId}`}>Zakaži termin</Link>}
           text3={<Link to={`/pacijentTermini/${pacijentId}`}>Tvoji termini</Link>} 
           text4={<Link to={`/pacijentProfil/${pacijentId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>}
           <div className={styles.box}>
            <h1 className={styles.heading}>Izmeni podatke:</h1>
         {pacijent &&   <form onSubmit={handleSubmit(onSubmit)} method="PATCH" className={styles.form}>
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