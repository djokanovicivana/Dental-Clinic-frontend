import React from "react";
import UslugaThumbnail from "../../components/UslugaThumbnail/UslugaThumbnail";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Services } from "../../services/Services";
import Navbar from "../../components/navbar/Navbar";
import DropDownGrane from "../../components/DropDownGrane/DropDownGrane";
import styles from "./Usluge.module.css"
import { Link } from "react-router-dom";
export default function Usluge(){
    const { granaId, nazivGrana } = useParams();
   const [items, setItems]=useState([]);
    useEffect(() => {
      const fetchData = async () => {
      const data = await Services.getUslugeId(granaId);
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, [granaId]);
  
    return(
<>
    <Navbar 
    text1="O nama"
    text2={<DropDownGrane label="Usluge"/>}
    text3="Cenovnik" 
    text4={<Link to="/prijava">Prijavi se</Link>}
    text5={<Link to="/registracija">Registruj se</Link>}/>
    <h2 className={styles.label}>{nazivGrana}</h2>
    <div className={styles.grid}>
{items.map((item,index)=>(
    <Link to={`/usluga/${item.idUsluga}`} key={index}>
      <UslugaThumbnail label={item.nazivUsluga} image={item.slikaUsluga} />
    </Link>
))}
</div>
</>
    );
};