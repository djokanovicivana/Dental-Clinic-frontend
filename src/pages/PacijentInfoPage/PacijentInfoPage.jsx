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
    const doktorId=TokenServices.uzimanjeSesijeId();
    const { pacijentId } = useParams();
    const [pacijent, setPacijent] = useState([]);
    const [obavljeniPregledi, setObavljeniPregledi]=useState([]);
    const [predstojeciPregledi, setPredstojeciPregledi]=useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await Services.getPacijentId(pacijentId,doktorId);
            console.log(response);
            setPacijent(response);
        };
        fetchData();
    }, [pacijentId]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await Services.getTerminiBuduciPacijent(pacijentId,doktorId);
            setPredstojeciPregledi(response);
            
        };
        fetchData();
    }, [pacijentId]);
        useEffect(() => {
        const fetchData = async () => {
            const response = await Services.getTerminiZavrseniPacijent(pacijentId,doktorId);
            setObavljeniPregledi(response);
            console.log(response);
            
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
            <Navbar 
           text2={<Link to="/doktorPacijenti">Pacijenti</Link>}
           text3={<Link to="/raspored">Raspored</Link>} 
           text4={<Link to="/doktorProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
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
                        <Link to={`/noviPregled/${pacijentId}`}>
                         <ContainedButton text={<AddIcon/>} module={styles.add}/>
                         </Link>
                    </div>
                    </div>
                    
            ))}
        </div>
    );
}
