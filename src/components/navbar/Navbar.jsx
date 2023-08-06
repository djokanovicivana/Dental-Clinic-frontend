import React from "react";
import styles from "./Navbar.module.css"
export default function Navbar(props){
    return(
        <div className={styles.navbar}> 
        <p className={styles.logo}>STOMATOLOŠKA ORDINACIJA</p>
        <p className={styles.options}>{props.text1}</p>
        <p className={styles.options}>{props.text2}</p>
        <p className={styles.options}>{props.text3}</p>
        <p className={styles.options}>{props.text4}</p>
        <p className={styles.options}>{props.text5}</p>
        </div>
    )
    
}
