import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { TokenServices } from "../../services/TokenServices";
import { Services } from "../../services/Services";
import { useState, useEffect } from "react";
export default function MedicinskaSestraPage(){
    const sestraId=TokenServices.uzimanjeSesijeId();
    const [doktorId, setDoktorId]=useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.sestraId(sestraId);
            setDoktorId(response[0].idDoktor);
        };
        fetchData();
    },[sestraId]);
    return(
        <>
          <Navbar 
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/profilSestra/${sestraId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
        </>
    )
}