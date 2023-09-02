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
    const {register, handleSubmit, control}=useForm();
    const [usluge, setUsluge]=useState([]);
    const [doktori, setDoktori]=useState([]);
    const [sviDoktori, setSviDoktori]=useState([]);
    const [formattedPocetniDatum, setFormattedPocetniDatum]=useState(null);
    const [formattedKrajnjiDatum, setFormattedKrajnjiDatum]=useState(null);
    const [formattedPocetnoVreme, setFormattedPocetnoVreme]=useState(null);
    const [formattedKrajnjeVreme, setFormattedKrajnjeVreme]=useState(null);
    const [formattedData, setFormattedData]=useState(null);
    useEffect(()=>{
      const fetchData=async()=>{
        const response=await Services.sveUsluge();
        setUsluge(response);
        console.log(response);
        if(response){
          const sviDoktoriResponse=await Services.pretrazivanjeTermina({'pocetniDatum':'',
    'krajnjiDatum': '',
    'pocetnoVreme': '',
    'krajnjeVreme': '',
    'doktor':'',
    'usluga':''
  });
  setSviDoktori(sviDoktoriResponse);
        }
      };
      fetchData();
    },[]);
const onSubmit = async (data) => {
  const formattedPocetniDatum = data.pocetniDatum ? format(data.pocetniDatum.$d, "yyyy-MM-dd") : '';
  setFormattedPocetniDatum(formattedPocetniDatum);
  const formattedPocetnoVreme = data.pocetnoVreme ? format(data.pocetnoVreme.$d, "HH:mm:ss") : '';
  setFormattedPocetnoVreme(formattedPocetnoVreme);
  const formattedKrajnjeVreme = data.krajnjeVreme ? format(data.krajnjeVreme.$d, "HH:mm:ss") : '';
  setFormattedKrajnjeVreme(formattedKrajnjeVreme);
  const formattedKrajnjiDatum = data.krajnjiDatum ? format(data.krajnjiDatum.$d, "yyyy-MM-dd") : '';
  setFormattedKrajnjiDatum(formattedKrajnjiDatum);
  const formattedData = {
    'pocetniDatum': formattedPocetniDatum,
    'krajnjiDatum': formattedKrajnjiDatum,
    'pocetnoVreme': formattedPocetnoVreme,
    'krajnjeVreme': formattedKrajnjeVreme,
    'doktor': data.doktor ? data.doktor : '',
    'usluga':data.usluga ? data.usluga :'',
  };
   setFormattedData(formattedData);
   console.log(formattedData);
   const response=await Services.pretrazivanjeTermina(formattedData);
   setDoktori(response);
   setSviDoktori([]);
}
console.log(sviDoktori);
console.log(doktori);
    return(
        <>
         <Navbar 
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to="pacijentProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
    <form method="get" onSubmit={handleSubmit(onSubmit)} className={styles.searchBar}>
             <Controller
        name="pocetniDatum"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div className={styles.item}>
            <p className={styles.label}>Izaberi početni datum:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              sx={{width:180, maxHeight:20}}
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
              sx={{width:180}}
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
              sx={{width:180}}
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
              sx={{width:180}}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                  disabledHours={(hour) => hour > 16 || hour < 9}
  disabledMinutes={(minute, hour) => (hour === 16 && minute > 30) || (hour === 9 && minute < 0)}/>
            </LocalizationProvider>
          </div>
        )}

      />
      <div className={styles.item}>
      <p className={styles.label}>Izaberi doktora:</p>
      <TextField
            id="doktor"
            sx={{width:180}}
            label=""
            variant="outlined"
            name="doktor"
            {...register('doktor')}/>
</div>
            <Controller
              name="usluga"
              control={control}
              defaultValue={''}
              render={({ field }) => (
               <div className={styles.item}>
                <p className={styles.label}>Izaberi uslugu:</p>
                <Select
                sx={{width:180}}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {usluge && usluge.map((usluga, index) => (
                    <MenuItem key={index} value={usluga.nazivUsluga}>
                      {usluga.nazivUsluga}
                    </MenuItem>
                  ))}
                </Select>
                </div>  
            
              )}/>
              <ContainedButton text={<SearchIcon/>} type="submit" module={styles.button}/>
      </form>
      <div className={styles.container}>
      {doktori.length>0 ? (
         doktori.map((doktor, index)=>(
           <Link to={`/zakazivanjeRaspored/${formattedPocetniDatum || null}/${formattedKrajnjiDatum || null}/${formattedPocetnoVreme || null}/${formattedKrajnjeVreme || null}/${formattedData && formattedData.doktor || null}/${formattedData && formattedData.usluga || null}/${index}`}>

                  <div key={index} className={styles.doktor}>
                   <div className={styles.imageDiv}>
                     <img className={styles.image} src={require(`../../images/${[doktor.slika]}`)}/>
                     </div>
                    <p>{doktor.ime} {doktor.prezime}</p>
                    
                  </div>
                  </Link>
         ))
      ): sviDoktori.length > 0 ?  (
       
         sviDoktori.map((doktor, index)=>(
          <Link to={`/zakazivanjeRaspored/${formattedPocetniDatum || null}/${formattedKrajnjiDatum || null}/${formattedPocetnoVreme || null}/${formattedKrajnjeVreme || null}/${formattedData && formattedData.doktor || null}/${formattedData && formattedData.usluga || null}/${index}`}>


                  <div key={index} className={styles.doktor}>
                    <div className={styles.imageDiv}>
                     <img className={styles.image} src={require(`../../images/${[doktor.slika]}`)}/>
                     </div>
                    <p>{doktor.ime} {doktor.prezime}</p>
                  </div>
                  </Link>
         ))
      ): <h2 className={styles.error}>Nema termina koji zadovoljavaju tvoje kriterijume.</h2>
      }
      </div>

        </>
    )
}