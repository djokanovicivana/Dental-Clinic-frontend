import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Services } from "../../services/Services";
import Navbar from "../../components/navbar/Navbar";
import DropDownGrane from "../../components/DropDownGrane/DropDownGrane";
import { Link } from "react-router-dom";
import styles from "./PrikazUsluge.module.css"

export default function PrikazUsluge() {
    const { uslugaId } = useParams();
    const [usluga, setUsluga] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Services.getUsluga(uslugaId);
                setUsluga(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [uslugaId]);

    if (loading) {
        return <p>Učitavanje...</p>; // Prikaz loading indikatora dok se podaci učitavaju
    }
    console.log(usluga);

    return (
  <>
            <Navbar
                text1="O nama"
                text2={<DropDownGrane label="Usluge" />}
                text3="Cenovnik"
                text4={<Link to="/prijava">Prijavi se</Link>}
                text5={<Link to="/registracija">Registruj se</Link>} />

    {usluga.map((item) => (
    <div key={item.idUsluga} >
      <h1 >{item.nazivUsluga}</h1>
      <div className={styles.usluga}>
        <div className={styles.image}>
       <img src={require(`../../images/${item.slikaUsluga}`)} alt="usluga" />
                </div>
      <p>{item.opisUsluga}</p>
      </div>
        </div>
      
    ))}
  </>
);

}
