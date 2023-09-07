import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/nunito"; 
import { useState } from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import styles from './SveMedicinskeSestrePage.module.css';
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
export default function SveMedicinskeSestrePage(){
    const navigate=useNavigate();
    const {register, handleSubmit}=useForm();
    const [tabValue, setTabValue] = useState(0);
    const [sestre, setSestre]=useState([]);
    const [originalSestre, setOriginalSestre]=useState([]);
    const [grane, setGrane]=useState([]);
   useEffect(() => {
    const fetchData = async () => {
        const response = await Services.getAllGrana();
        setGrane(response);
    };
    fetchData();
}, []);

useEffect(() => {
    const fetchData=async()=>{
    if (grane.length > 0) {
        const nazivGrane = grane[tabValue].nazivGrana;
        const response1 = await Services.sveSestre({'searchTerm': '', 'nazivGrana': nazivGrane});
        setSestre(response1);
        setOriginalSestre(response1);
    }};
    fetchData();
}, [tabValue, grane]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
        const onSubmit = async (data) => {
    console.log(data);
    if (!data.pretraga) {
        setSestre(originalSestre);
    } else {
        if (tabValue >= 0 && grane[tabValue] && grane[tabValue].nazivGrana) {
            console.log(grane[tabValue].nazivGrana);
            const response = await Services.sveSestre({
                'searchTerm': data.pretraga,
                'nazivGrana': grane[tabValue].nazivGrana,
                
                
            });
            setSestre(response);
        } else {
          
        }
    }
}

            const theme = createTheme({
    palette: {
        primary: {
            main: '#0077b6', 
        },
    },
    typography: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 15, 
        tab: {
            color: '#0077b62', 
        },
    },
});
    return(
        <><Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>
        <ThemeProvider theme={theme}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                            {grane && grane.map((grana, index)=>(
                                <Tab label={grana.nazivGrana} key={index}/>
                            ))}
                            </Tabs>
                     {tabValue >= 0 && (
                        <>
  <form action="get" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <OutlinedInput
      className={styles.searchBar}
      id="pretraga"
      name="pretraga"
      variant="outlined"
      {...register('pretraga')}
    />
    <ContainedButton text={<SearchIcon />} type="submit" module={styles.search} />
  </form>
 { sestre.length>0 ? sestre.map((sestra, index)=> (
  <div key={index} className={styles.item}>
    <div className={styles.text} onClick={()=>{
        navigate(`/profilSestra/${sestra.idKorisnik}`);
    }}>
      <span> {sestra.ime} </span>
      <span> {sestra.prezime} </span>
    </div>
  </div>
)) : <h3 className={styles.error}>Nema dostupnih medicinskih sestara.</h3>};
</>)
}

                            
                            </ThemeProvider>
        </>
    )
}