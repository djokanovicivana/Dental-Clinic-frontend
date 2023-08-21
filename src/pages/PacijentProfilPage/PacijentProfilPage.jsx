import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profil from "../../components/Profil/Profil";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/nunito"; 
import { useState } from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import styles from './PacijentProfilPage.module.css';
export default function PacijentProfilPage(){
    const {pacijentId}=useParams();
    const [tabValue, setTabValue] = useState(0);
    const [pacijent, setPacijent]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.getPacijentId(pacijentId);
            setPacijent(response);
        };
        fetchData();
    },[pacijentId]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
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
           text3={<Link to={`/zakazivanje/${pacijentId}`}>Zakaži termin</Link>} 
           text4={<Link to={`/pacijentProfil/${pacijentId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
       
            <ThemeProvider theme={theme}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                                <Tab label="Tvoje informacije"/>
                                <Tab label="Tvoji pregledi"/>
                            </Tabs>
                            {tabValue === 0 && (   
                                <div> 
                                    {pacijent[0] &&
                                    <Profil uloga="Pacijent" ime={pacijent[0].ime} prezime={pacijent[0].prezime} brojKartona={pacijent[0].brojKartona} email={pacijent[0].email} korisnickoIme={pacijent[0].korisnickoIme} godiste={pacijent[0].godiste} brojTelefona={pacijent[0].brojTelefona} module={styles} link={`/izmenaPacijenta/${pacijentId}`}/>  }                    
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                </div>)}
                        </ThemeProvider>

 </>
    )}