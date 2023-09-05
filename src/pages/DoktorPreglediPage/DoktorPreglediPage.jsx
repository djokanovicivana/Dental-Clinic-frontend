import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/nunito"; 
import { Services } from "../../services/Services";
import { TokenServices } from "../../services/TokenServices";
import {format} from 'date-fns';
import styles from "./DoktorPreglediPage.module.css";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import ModalPotvrda from "../../components/ModalPotvrda/ModalPotvrda";
export default function DoktorPreglediPage(){
      const doktorId=TokenServices.uzimanjeSesijeId();
      const [tabValue, setTabValue] = useState(0);
      const [tabValue1, setTabValue1] = useState(0);
      const [usluge, setUsluge]=useState([]);
      const [obavljeniPregledi, setObavljeniPregledi]=useState([]);
      const [predstojeciPregledi, setPredstojeciPregledi]=useState([]);
      const [brojObavljenih, setBrojObavljenih]=useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.getUslugaZaDoktora(doktorId);
            setUsluge(response);
             if (response.length > 0) {
        // Ako postoje usluge, postavi prvu uslugu kao aktivnu
        handleUslugaChange(response[0].nazivUsluga);
      }
        };
        fetchData();
    },[doktorId]);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handleTabChange1 = (event, newValue) => {
        setTabValue1(newValue);
    };
    const handleUslugaChange=async(nazivUsluga)=>{
          const response=await Services.obavljeniPreglediDoktor({'idDoktor':doktorId, 'nazivUsluga':nazivUsluga});
          setObavljeniPregledi(response.pregledi);
          setBrojObavljenih(response.brojPregleda);
          const response1= await Services.predstojeciPreglediDoktor({'idDoktor':doktorId,
        'nazivUsluga':nazivUsluga});
        setPredstojeciPregledi(response1.pregledi);

    }
        const theme = createTheme({
    palette: {
        primary: {
            main: '#0077b6', 
        },
    },
    typography: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 20, 
        tab: {
            color: '#0077b62', 
        },
    },
});
    return(
        <>
          <Navbar 
           text1={<Link to="/doktorPregledi">Pregledi</Link>}
           text2={<Link to="/doktorPacijenti">Pacijenti</Link>}
           text3={<Link to="/raspored">Raspored</Link>} 
           text4={<Link to="/doktorProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
           <ThemeProvider theme={theme}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                                <Tab label="Obavljeni pregledi"/>
                                <Tab label="Predstojeći pregledi"/>
                            </Tabs>
                                   {tabValue>=0 && (   
                                <div> 
                                    <Tabs value={tabValue1} onChange={handleTabChange1} variant="fullWidth" indicatorColor="primary" textColor="primary">
                                {usluge && usluge.map((usluga,index)=>(
                                <Tab key={index} label={usluga.nazivUsluga} onClick={() => handleUslugaChange(usluga.nazivUsluga)}/>
                                ))}
                            </Tabs>
                                   </div>
                            )}
                        {tabValue===0 && obavljeniPregledi && brojObavljenih &&
                        <div>
                            <p>{brojObavljenih}</p>
                            {obavljeniPregledi.map((pregled, index)=>(
                                <div key={index} className={styles.pregled}>
                                   <p>{pregled.ime} {pregled.prezime}</p>
                                   <p>{format(new Date(pregled.datumTermina), 'dd.MM.yyyy.')}{' '}
                                   {format(new Date(`2000-01-01T${pregled.vremeTermina}`),'HH:mm')}</p>
                                   <Link to={`/pregledInfo/${doktorId}/${pregled.idPregled}`}>
                                    <div className={styles.detaljiContainer}>
                                    <ContainedButton module={styles.detalji} text="Detaljnije.."/>
                                    </div>
                                    </Link>
                                   
                                </div>
                            ))}
                        </div>}
                        {tabValue===1 && predstojeciPregledi &&
                        <div>
                            {predstojeciPregledi.map((pregled, index)=>(
                                <div key={index} className={styles.pregled}>
                                   <p>{pregled.ime} {pregled.prezime}</p>
                                   <p>{format(new Date(pregled.datumTermina), 'dd.MM.yyyy.')}{' '}
                                   {format(new Date(`2000-01-01T${pregled.vremeTermina}`),'HH:mm')}</p>
                                     <ModalPotvrda label={
                                    <div className={styles.otkaziContainer}>
                                    <ContainedButton module={styles.otkazi} text="Otkaži"/>
                                    </div>}
                                    text={<p>Da li si siguran da želiš da otkažeš termin?</p>}
                                    onConfirm={async()=>{
                                      const response=await Services.otkaziPregled(pregled.idPregled);
                                      console.log(response);
                                    }}/>
                                   
                                   
                                </div>
                            ))}
                            </div>}
                        
                            
                        </ThemeProvider>
        </>
    )
}