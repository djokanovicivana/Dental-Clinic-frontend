import React from "react";
import DropDownGrane from "../../components/DropDownGrane/DropDownGrane";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./Registracija.module.css"
import { useForm } from 'react-hook-form';
import { useState } from "react";
export default function Registracija(){
    const { register, handleSubmit, formState: { errors }} = useForm();

    const [formData, setFormData]=useState({

    })
    const onSubmit=(data)=>{
        console.log(data);
    }
    return (
        <>
            <Navbar
                text1="O nama"
                text2={<DropDownGrane label="Usluge" />}
                text3="Cenovnik"
                text4={<Link to="/prijava">Prijavi se</Link>}
                text5={<Link to="/registracija">Registruj se</Link>} />
            <div>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.row1}>
                        <h1>Registruj se</h1>
                       <div className={styles.item}>
                            <TextField
                                id="outlined-basic"
                                label="Ime"
                                variant="outlined"
                                {...register('ime', {required:true})} />
                                {errors.ime && <p className={styles.error}>Polje je obavezno.</p>}
                        </div>
                        <div className={styles.item}>
                            <TextField
                                id="outlined-basic"
                                label="Prezime"
                                variant="outlined"
                                {...register('prezime',{required:true})} />
                                {errors.prezime && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <div className={styles.item}>
                            <TextField
                                id="outlined-basic"
                                label="Broj telefona"
                                variant="outlined"
                                {...register('telefon',{required:true})} />
                                {errors.telefon && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <div className={styles.item}>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                {...register('email',{required:true})} />
                                {errors.email && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                    </div>
                    <div className={styles.row2}>
                        <div className={styles.item}>
                            <TextField
                                id="outlined-basic"
                                label="Korisničko ime"
                                variant="outlined"
                                {...register('korisnickoIme',{required:true})} />
                                {errors.korisnickoIme && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <div className={styles.item}>
                            <TextField label="Lozinka" 
                             id="outlined-basic"
                            variant="outlined"
                            type="password"
                            {...register('lozinka',{required:true})} />
                            {errors.lozinka && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                         <div className={styles.item}>
                            <TextField label="Potvrdi lozinku" 
                             id="outlined-basic"
                             variant="outlined"
                             type="password"
                             {...register('potvrdaLozinke',{required:true})} />
                            {errors.potvrdaLozinke && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <ContainedButton text="POTVRDI" type="submit"/>
                    </div>
                    </form>     
                </div>
                
            
        </>
    )
}