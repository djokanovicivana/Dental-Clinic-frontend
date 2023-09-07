import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import styles from "./PacijentInfoPage.module.css";
import { Services } from "../../services/Services";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/nunito"; 
import { format } from "date-fns";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import AddIcon from '@mui/icons-material/Add';
import { TokenServices } from "../../services/TokenServices";
export default function PacijentInfoPage(){
    const { pacijentId, doktorId } = useParams();
    const [id, setId]=useState(doktorId);
    const [sestraId, setSestraId]=useState(null);
    const [pacijent, setPacijent] = useState([]);
    const [obavljeniPregledi, setObavljeniPregledi]=useState([]);
    const [predstojeciPregledi, setPredstojeciPregledi]=useState([]);
    const [tabValue, setTabValue] = useState(0);
    const uloga=TokenServices.uzimanjeSesijeUloga();
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    useEffect(()=>{if(uloga==='Medicinska Sestra'){
        setSestraId(TokenServices.uzimanjeSesijeId());
    }},[uloga]);
    

    useEffect(() => {
        const fetchData = async () => {
            
            const response = await Services.getPacijentId(pacijentId,id);
            console.log(response);
            setPacijent(response);
        };
        fetchData();
    }, [pacijentId]);
    useEffect(() => {
        const fetchData = async () => {
            if(id){
            const response = await Services.getTerminiBuduciPacijent(pacijentId,id);
            setPredstojeciPregledi(response);}
            
        };
        fetchData();
    }, [pacijentId]);
        useEffect(() => {
        const fetchData = async () => {
            if(id){
            const response = await Services.getTerminiZavrseniPacijent(pacijentId,id);
            setObavljeniPregledi(response);
            console.log(response);}
            
        };
        fetchData();
    }, [pacijentId]);

    const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff', 
        },
    },
    typography: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 20, 
        tab: {
            color: '#ffffff', 
        },
    },
});

    return (
        <div>
       {uloga==='Doktor' ?  (<Navbar 
           text1={<Link to={`/doktorPregledi/${doktorId}`}>Pregledi</Link>}
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>) : (uloga==='Medicinska Sestra' ? (
         <Navbar 
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/profilSestra/${sestraId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
           ):  <Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>)}
            {pacijent.map((item, index) => (
                <div className={styles.page} key={index}>
                    <div className={styles.info}>
                        <h1 className={styles.infoHeading}>{item.ime} {item.prezime}</h1>
                        <p>Broj kartona: {item.brojKartona}</p>
                        <p>Email: {item.email}</p>
                        <p>Broj telefona: {item.brojTelefona}</p>
                        <p>Godište: {item.godiste}.</p>
                    </div>
                    <div className={styles.appointments}>
                        <ThemeProvider theme={theme}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                                <Tab label="Obavljeni pregledi" />
                                <Tab label="Predstojeći pregledi" />
                            </Tabs>
                            {tabValue === 0 && (   
                                <div className={styles.tabContent}>
                                    {obavljeniPregledi.map((item, index) => (
    <p key={index}>
        {format(new Date(item.datumTermina + ' ' + item.vremeTermina), 'dd.MM.yyyy HH:mm')}
        <span><Link to={`/pregledInfo/${doktorId}/${item.idPregled}`}><MoreHorizIcon/></Link></span>
    </p>
))}                                
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div className={styles.tabContent}>
                                    {predstojeciPregledi.map((item, index) => (
                                        <div>
    <p key={index}>
        {format(new Date(item.datumTermina + ' ' + item.vremeTermina), 'dd.MM.yyyy HH:mm')}
    </p>
    </div>
   
))}
                                </div>
                            )}
                            
                        </ThemeProvider>
                        {(uloga==='Administrator' || uloga==='Doktor') &&
                        <Link to={`/noviPregled/${pacijentId}`}>
                         <ContainedButton text={<AddIcon/>} module={styles.add}/>
                         </Link>}
                    </div>
                    </div>
                    
            ))}
        </div>
    );
}
