import React from "react";
import DropDownGrane from "../../components/DropDownGrane/DropDownGrane";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./Registracija.module.css"
import { useForm } from 'react-hook-form';
import { Services } from "../../services/Services";
export default function Registracija(){
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit=async(data)=>{
        console.log(data);
        const response=await Services.register({'korisnickoIme':data.korisnickoIme,'password':data.password, 'password_confirmation':data.password_confirmation, 'email':data.email, 'ime':data.ime, 'prezime':data.prezime, 'brojTelefona':data.brojTelefona});
        console.log(response);
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
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}method="post">
                    <div className={styles.row1}>
                        <h1>Registruj se</h1>
                       <div className={styles.item}>
                            <TextField
                                id="ime"
                                name="ime"
                                label="Ime"
                                variant="outlined"
                                {...register('ime', {required:true})} />
                                {errors.ime && <p className={styles.error}>Polje je obavezno.</p>}
                        </div>
                        <div className={styles.item}>
                            <TextField
                                id="prezime"
                                name="prezime"
                                label="Prezime"
                                variant="outlined"
                                {...register('prezime',{required:true})} />
                                {errors.prezime && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <div className={styles.item}>
                            <TextField
                                id="brojTelefona"
                                name="brojTelefona"
                                label="Broj telefona"
                                variant="outlined"
                                {...register('brojTelefona',{required:true})} />
                                {errors.brojTelefona && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <div className={styles.item}>
                            <TextField
                                id="email"
                                label="Email"
                                name="email"
                                variant="outlined"
                                {...register('email',{required:true})} />
                                {errors.email && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                    </div>
                    <div className={styles.row2}>
                        <div className={styles.item}>
                            <TextField
                                id="korisnickoIme"
                                name="korisnickoIme"
                                label="Korisničko ime"
                                variant="outlined"
                                {...register('korisnickoIme',{required:true})} />
                                {errors.korisnickoIme && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <div className={styles.item}>
                            <TextField label="Lozinka" 
                             id="password"
                             name="password"
                            variant="outlined"
                            type="password"
                            {...register('password',{required:true})} />
                            {errors.password && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                         <div className={styles.item}>
                            <TextField label="Potvrdi lozinku" 
                             id="password_confirmation"
                             name="password_confirmation"
                             variant="outlined"
                             type="password"
                             {...register('password_confirmation',{required:true})} />
                            {errors.password_confirmation && <p className={styles.error}>Polje je obavezno.</p>} 
                        </div>
                        <ContainedButton text="POTVRDI" type="submit"/>
                    </div>
                    </form>     
                </div>
                
            
        </>
    )
}