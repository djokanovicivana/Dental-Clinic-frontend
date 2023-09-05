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
import { Select, MenuItem } from "@mui/material";
import styles from "./PacijentTerminiPage.module.css";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import ModalPotvrda from "../../components/ModalPotvrda/ModalPotvrda";
export default function PacijentTerminiPage(){
    const pacijentId=TokenServices.uzimanjeSesijeId();
      const [tabValue, setTabValue] = useState(0);
      const [usluge, setUsluge]=useState([]);
      const [obavljeniPregledi, setObavljeniPregledi]=useState([]);
      const [predstojeciPregledi, setPredstojeciPregledi]=useState([]);
      const [brojObavljenih, setBrojObavljenih]=useState(null);
      const [selectedUsluga, setSelectedUsluga]=useState(null);
      const [selectedUsluga2, setSelectedUsluga2]=useState(null);
        const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.sveUsluge();
            setUsluge(response);
        };
        fetchData();
    },[pacijentId]);
    const handleUslugaChange1=async(usluga)=>{
      const response=await Services.obavljeniPreglediPacijent({'idPacijent':pacijentId,
    'nazivUsluga':usluga});
    setObavljeniPregledi(response.pregledi);
    setBrojObavljenih(response.brojPregleda);
    }
    const handleUslugaChange2=async(usluga)=>{
     const response=await Services.predstojeciPreglediPacijent({'idPacijent':pacijentId,
    'nazivUsluga':usluga});
    setPredstojeciPregledi(response.pregledi);
    
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
console.log(selectedUsluga);
    return(
        <>
        <Navbar 
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to="/pacijentProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
            <ThemeProvider theme={theme}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                                <Tab label="Obavljeni pregledi"/>
                                <Tab label="Predstojeći pregledi"/>
                            </Tabs>
            {tabValue===0  && <>
            <div className={styles.select}>
              <p className={styles.label}>Izaberi uslugu:</p>
                <Select
                name="usluga"
                sx={{width:250}}
                  value={selectedUsluga}
                 onChange={(e) => {
              setSelectedUsluga(e.target.value);
              handleUslugaChange1(e.target.value);
            }}
                >
                  {usluge && usluge.map((usluga, index) => (
                    <MenuItem key={index} value={usluga.nazivUsluga}>
                      {usluga.nazivUsluga}
                    </MenuItem>
                  ))}
                </Select>
                </div>
                 {selectedUsluga && obavljeniPregledi && obavljeniPregledi.map((pregled, index)=>(
                    <div key={index} className={styles.pregled}>
                    <p>{pregled.ime} {pregled.prezime}</p>    
                    <p>{format(new Date(pregled.datumTermina), 'dd.MM.yyyy.')}{' '}
                                   {format(new Date(`2000-01-01T${pregled.vremeTermina}`),'HH:mm')}</p>
                                   <Link to={`/pregledInfo/${pregled.idKorisnik}/${pregled.idPregled}`}>
                                    <div className={styles.detaljiContainer}>
                                    <ContainedButton module={styles.detalji} text="Detaljnije.."/>
                                    </div>
                                    </Link>
                    </div>
                ))}
                </>}
                {tabValue===1 && <> <div className={styles.select}>
                  <p className={styles.label}>Izaberi uslugu:</p>
                  <Select
                name="usluga"
                sx={{width:250}}
                  value={selectedUsluga2}
                 onChange={(e) => {
              setSelectedUsluga2(e.target.value);
              handleUslugaChange2(e.target.value);
            }}
                >
                  {usluge && usluge.map((usluga, index) => (
                    <MenuItem key={index} value={usluga.nazivUsluga}>
                      {usluga.nazivUsluga}
                    </MenuItem>
                  ))}
                  </Select>
                  </div>
                   {selectedUsluga2 && predstojeciPregledi && predstojeciPregledi.map((pregled, index)=>(
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
                
               
                </>
                }
                            
                            
                        </ThemeProvider>
        </>
    )
}