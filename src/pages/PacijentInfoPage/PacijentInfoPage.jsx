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


export default function PacijentInfoPage(){
    const { doktorId, pacijentId } = useParams();
    const [pacijent, setPacijent] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await Services.getPacijentId(pacijentId);
            console.log(response);
            setPacijent(response);
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
                text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
                text3={<Link to="/raspored">Raspored</Link>} 
                text4={<Link to="/profil">Tvoj profil</Link>}
                text5="Odjavi se"
                className={styles.navbar}
            />
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
                                /* Sadržaj za obavljene preglede */
                                <div className={styles.tabContent}>
                                    <p>18.05.2023. 17:45</p>
                                    <p>18.05.2023. 17:45</p>
                                    <p>18.05.2023. 17:45</p>
                                </div>
                            )}
                            {tabValue === 1 && (
                                /* Sadržaj za predstojeće preglede */
                                <div className={styles.tabContent}>
                                    {/* ... */}
                                </div>
                            )}
                        </ThemeProvider>
                    </div>
                </div>
            ))}
        </div>
    );
}
