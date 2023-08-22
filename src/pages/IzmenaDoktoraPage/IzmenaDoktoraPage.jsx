import React from "react";
import {useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./IzmenaDoktoraPage.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { Services } from "../../services/Services";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import BasicSelect from "../../components/BasicSelect/BasicSelect";
export default function IzmenaDoktoraPage(props){
const navigate=useNavigate();
const {doktorId}=useParams();
const [doktor,setDoktor]=useState({});
const[selectedGrana, setSelectedGrana]=useState({});
const [grane,setGrane]=useState([]);
const [slika, setSlika]=useState('');
const { register, control, handleSubmit,  formState: { errors }, reset } = useForm();
useEffect(()=>{
    const fetchData=async()=>{
        const response=await Services.getDoktor(doktorId);
        setDoktor(response[0]);
        console.log(response[0]);
        console.log(response[0].nazivGrana);
        if(response[0]){
            const granaResponse=await Services.getAllGrana();
            if(granaResponse){
                 const graneOptions = granaResponse.map(grana => ({
          value: `${grana.nazivGrana}`,
          label: `${grana.nazivGrana}`,
        }));
        setGrane(graneOptions);
        setSelectedGrana({value:`${response[0].nazivGrana}`, label: `${response[0].nazivGrana}`});
            }

            }
    };
    fetchData();
},[doktorId]);
console.log(selectedGrana);
useEffect(() => {
    if (doktor) {
        reset({
            ime: doktor.ime,
            prezime: doktor.prezime,
            brojTelefona:doktor.brojTelefona,
            email:doktor.email,
            korisnickoIme:doktor.korisnickoIme,
            godiste:doktor.godiste,
        });
    }
}, [doktor]); 
const onSubmit=async(data)=>{
console.log(data.slika);
console.log(doktor.slika);
{data.slika.length>0 ? setSlika(data.slika[0].name) : setSlika(doktor.slika)}
const response=await Services.izmeniDoktora({
    'ime':data.ime,
    'prezime':data.prezime,
    'korisnickoIme':data.korisnickoIme,
    'email':data.email,
    'brojTelefona':data.brojTelefona,
    'slika':slika,
    'godiste':data.godiste,
    'old_password':data.old_password,
    'new_password':data.new_password,
    'new_password_confirmation':data.new_password_confirmation,
    'nazivGrana':data.nazivGrana,
    
});
console.log(response);
console.log(response.success);
if(response.success===true){
    if(props.uloga==='Doktor')
    navigate(`/doktorProfil/${doktorId}`);
}

}
const handleGranaChange=(event)=>{
    setSelectedGrana(event.target.value);
}
    return(<>
    {props.uloga==='Administrator' ? <Navbar text2="Zaposleni"
    text3="Pacijenti"
text4="Tvoj profil"
text5="Odjavi se"/> : <Navbar 
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to="/raspored">Raspored</Link>} 
           text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>}
           <div className={styles.box}>
            <h1 className={styles.heading}>Izmeni podatke:</h1>
         {doktor &&   <form onSubmit={handleSubmit(onSubmit)} method="PATCH" className={styles.form}>
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
                        <div className={styles.item}>
                            <p className={styles.label}>Profilna slika</p>
               <TextField
               sx={{maxWidth:223}}
  label=""
  accept="image/*"
  type="file"
  control={control}
  name="slika"
  {...register('slika')}
/>

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
                <Controller
          name="grana"
          control={control}
          render={({ field }) => (
            <BasicSelect
              label=""
              value={selectedGrana}
              data={grane}
              onChange={handleGranaChange}
              sx={{'width':300}}
              {...field}
            />
          )}
        />
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