import React from "react";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./Prijava.module.css"
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import DropDownMenu from "../../components/DropDownGrane/DropDownGrane";
import { useForm } from 'react-hook-form';
import { useState } from "react";
export default function Prijava(){
   const { register, handleSubmit, formState: { errors } } = useForm();
   const [formData, setFormData] = useState({
    korisnickoIme: "",
    lozinka: "",
  });
   const onSubmit=(data)=>{
     setFormData(data);
     console.log(formData);
   }
    return(
        <>
     <Navbar 
    text1="O nama"
    text2={<DropDownMenu label="Usluge"/>}
    text3="Cenovnik" 
    text4={<Link to="/prijava">Prijavi se</Link>}
    text5={<Link to="/registracija">Registruj se</Link>}/>
  <div className={styles.parent}>
        <div className={styles.form}>
            <div className={styles.formItems}>
            <h1 className={styles.heading}>Prijavi se</h1>  
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.item}>
                <TextField
                    id="outlined-basic"
                    label="Korisničko ime"
                    variant="outlined"
                    className={styles.field}
                    {...register('korisnickoIme', { required: true })}/>
                     {errors.korisnickoIme && <p className={styles.error}>Korisničko ime je obavezno.</p>}
            </div>
            <div className={styles.item}>
                <TextField
                id="outlined-basic"
                    label="Lozinka"
                    variant="outlined"
                    className={styles.field}
                    type="password"
                {...register('lozinka',{required:true})} />
                {errors.lozinka && <p className={styles.error}>Lozinka je obavezna!</p>}
                
            </div>
            <ContainedButton text="POTVRDI" className={styles.field} type="submit" />
            </form>
            <div className={styles.link}>
                        <p>Nemaš nalog? <Link style={{ color: '#00b4d8' }} to="/registracija">REGISTRUJ SE!</Link></p>
            </div> 
                </div>


        </div>
            </div>
        </>
    
    )
}