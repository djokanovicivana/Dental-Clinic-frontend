import React from "react";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./Prijava.module.css"
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import DropDownMenu from "../../components/DropDownGrane/DropDownGrane";
import { useForm } from 'react-hook-form';
import { Services } from "../../services/Services";
import { TokenServices } from "../../services/TokenServices";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";

export default function Prijava(){
  const navigate=useNavigate();
   const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
      const response = await Services.login({'korisnickoIme': data.korisnickoIme, 'password': data.password});
      if (response && response.data.status) {
      TokenServices.cuvanjeSesije({'idKorisnika':response.data.korisnikId,
      'uloga':response.data.korisnikUloga});
        const korisnikUloga=response.data.korisnikUloga;
        if(korisnikUloga==='Administrator'){
          navigate("/admin");
        }else if(korisnikUloga==='Doktor'){
          navigate("/doktor");
        }else if(korisnikUloga==='Pacijent'){
          navigate("/pacijent");
      }else if(korisnikUloga==='Medicinska Sestra'){
        navigate("/sestra");
      }
    } else {
        toast.error("Uneti podaci su pogrešni.Pokušajte ponovo!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:1500
        });
      }
  };
    return(
        <>
     <Navbar 
    text1="O nama"
    text2={<DropDownMenu label="Usluge"/>}
    text3="Cenovnik" 
    text4={<Link to="/prijava">Prijavi se</Link>}
    text5={<Link to="/registracija">Registruj se</Link>}/>
    <ToastContainer/>
  <div className={styles.parent}>
        <div className={styles.form}>
            <div className={styles.formItems}>
            <h1 className={styles.heading}>Prijavi se</h1>  
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.item}>
                <TextField
                    id="korisnickoIme"
                    label="Korisničko ime"
                    variant="outlined"
                    name="korisnickoIme"
                    className={styles.field}
                    {...register('korisnickoIme', { required: true })}/>
                     {errors.korisnickoIme && <p className={styles.error}>Korisničko ime je obavezno.</p>}
            </div>
            <div className={styles.item}>
                <TextField
                    id="password"
                    name="password"
                    label="Lozinka"
                    variant="outlined"
                    className={styles.field}
                    type="password"
                {...register('password',{required:true})} />
                {errors.password && <p className={styles.error}>Lozinka je obavezna!</p>}
                
            </div>
            <ContainedButton text="POTVRDI" module={styles.button} type="submit" />
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
