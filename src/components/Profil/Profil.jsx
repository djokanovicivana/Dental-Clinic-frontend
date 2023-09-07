import React from "react"  
import { Link } from "react-router-dom";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import EditIcon from '@mui/icons-material/Edit';
export default function Profil(props){
return(<>
             
         <div className={props.module.box}>
                <h1>{props.ime} {props.prezime}</h1>
                <div className={props.module.info}>
                {props.uloga==='Doktor' ? 
                <div className={props.module.imageDiv}>
                <img className={props.module.image} src={`../../images/${[props.slika]}`}/>
                </div> : null}
                <div className={props.module.text}>
                {props.uloga==='Doktor'? <p><span className={props.module.label}>Specijalnost:</span> {props.module.nazivGrana}</p> : (props.uloga==='Pacijent' ? (<p><span className={props.module.label}>Broj kartona:</span> {props.brojKartona}</p>) : null)}
                <p><span className={props.module.label}>Godište: </span>{props.godiste}.</p>
                <p><span className={props.module.label}>Broj telefona: </span>{props.brojTelefona}</p>
                <p><span className={props.module.label}>E-mail: </span>{props.email}</p>
                <p><span className={props.module.label}>Korisničko ime: </span> {props.korisnickoIme}</p>
                <Link to={props.link}><ContainedButton text={<EditIcon/>} module={props.module.button}/></Link> 
             
                </div>
                </div>
                </div>
</>)
             }