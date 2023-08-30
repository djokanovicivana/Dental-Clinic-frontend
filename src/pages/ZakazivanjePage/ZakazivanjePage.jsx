import React from "react";
import { Link } from "react-router-dom";
import { TokenServices } from "../../services/TokenServices";
import Navbar from "../../components/navbar/Navbar";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm, Controller } from 'react-hook-form';
import styles from './ZakazivanjePage.module.css';
import { TimePicker } from "@mui/x-date-pickers";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import { TextField } from "@mui/material";
import {Select, MenuItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {format} from 'date-fns'
import { Services } from "../../services/Services";
import { useState } from "react";
import { useEffect } from "react";
export default function ZakazivanjePage(){
    const pacijentId=TokenServices.uzimanjeSesijeId();
    const {handleSubmit, control}=useForm();
    const [usluge, setUsluge]=useState([]);
 
   const onSubmit = (data) => {
   const formattedPocetniDatum=format(data.pocetniDatum.$d,"yyyy-MM-dd");
   console.log(formattedPocetniDatum);
   
   const formattedPocetnoVreme=format(data.pocetnoVreme.$d,"HH:mm:ss");
   console.log(formattedPocetnoVreme);
   const formattedKrajnjeVreme=format(data.krajnjeVreme.$d,"HH:mm:ss");
   console.log(formattedKrajnjeVreme);
   console.log(data.krajnjiDatum);
   const formattedKrajnjiDatum=format(data.krajnjiDatum.$d,"yyyy-MM-dd");
   console.log(formattedKrajnjiDatum);
   const formattedData={
    'pocetniDatum':formattedPocetniDatum,
    'krajnjiDatum':formattedKrajnjiDatum,
    'pocetnoVreme':formattedPocetnoVreme,
    'krajnjeVreme':formattedKrajnjeVreme,
    'doktor':data.doktor,
   }
   console.log(formattedData);
}
    return(
        <>
         <Navbar 
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to="pacijentProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
    <form method="get" onSubmit={handleSubmit(onSubmit)}>
             <Controller
        name="pocetniDatum"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div className={styles.item}>
            <p className={styles.label}>Izaberi početni datum:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              sx={{width:220}}
              disablePast  
              className={styles.picker}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            </LocalizationProvider>
          </div>
        )}

      />
           <Controller
        name="krajnjiDatum"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div className={styles.item}>
            <p className={styles.label}>Izaberi krajnji datum:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              sx={{width:220}}
              disablePast  
              className={styles.picker}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            </LocalizationProvider>
          </div>
        )}

      />
             <Controller
        name="pocetnoVreme"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div className={styles.item}>
            <p className={styles.label}>Izaberi početno vreme:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
              className={styles.picker}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            </LocalizationProvider>
          </div>
        )}

      />
             <Controller
        name="krajnjeVreme"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div className={styles.item}>
            <p className={styles.label}>Izaberi krajnje vreme:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker  
              className={styles.picker}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                  disabledHours={(hour) => hour > 16 || hour < 9}
  disabledMinutes={(minute, hour) => (hour === 16 && minute > 30) || (hour === 9 && minute < 0)}/>
            </LocalizationProvider>
          </div>
        )}

      />
      <TextField
            id="doktor"
            label="Doktor"
            variant="outlined"
            name="doktor"/>
            <Controller
              name="usluga"
              control={control}
              defaultValue={''}
              render={({ field }) => (
               <div className={styles.item}>
                <p className={styles.label}>Izaberi uslugu:</p>
                <Select
                  sx={{width:226}}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {usluge && usluge.map((usluga, index) => (
                    <MenuItem key={index} value={usluga.ServiceName}>
                      {usluga.ServiceName}
                    </MenuItem>
                  ))}
                </Select>
                </div>  
            
              )}/>
              <ContainedButton text={<SearchIcon/>} type="submit"/>
      </form>

        </>
    )
}