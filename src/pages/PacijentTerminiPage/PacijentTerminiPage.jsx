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
export default function PacijentTerminiPage(){
    const pacijentId=TokenServices.uzimanjeSesijeId();
      const [tabValue, setTabValue] = useState(0);
      const [usluge, setUsluge]=useState([]);
      const [obavljeniPregledi, setObavljeniPregledi]=useState([]);
      const [predstojeciPregledi, setPredstojeciPregledi]=useState([]);
      const [brojObavljenih, setBrojObavljenih]=useState(null);
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
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to="/pacijentProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
            <ThemeProvider theme={theme}>
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                                <Tab label="Obavljeni pregledi"/>
                                <Tab label="Predstojeći pregledi"/>
                            </Tabs>
                            {tabValue===0 && tabValue===1 &&
            <Controller
              name="usluga"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <Select
                sx={{width:250}}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {usluge && usluge.map((usluga, index) => (
                    <MenuItem key={index} value={usluga.nazivUsluga}>
                      {usluga.nazivUsluga}
                    </MenuItem>
                  ))}
                </Select>
              )}/>}
                            
                            
                        </ThemeProvider>
        </>
    )
}