import React from "react";
import styles from "./Navbar.module.css"
import { Services } from "../../services/Services";
import { useNavigate } from "react-router-dom";
import { TokenServices } from "../../services/TokenServices";
export default function Navbar(props){
    const navigate=useNavigate();
    const handleOdjava=()=>{
       TokenServices.brisanjeSesije();
       navigate("/prijava");
    }
    return(
        <div className={styles.navbar}> 
        <p className={styles.logo}>STOMATOLOŠKA ORDINACIJA</p>
        <p className={styles.options}>{props.text1}</p>
        <p className={styles.options}>{props.text2}</p>
        <p className={styles.options}>{props.text3}</p>
        <p className={styles.options}>{props.text4}</p>
        <p className={styles.options} onClick={handleOdjava}>{props.text5}</p>
        </div>
    )
    
}
