import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './ModalZakazivanje.module.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, Select } from '@mui/material';
import ContainedButton from '../ContainedButton/ContainedButton';
import { format } from 'date-fns'; 
import { Services } from '../../services/Services';
import { Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import { useState } from 'react';
import { useEffect } from 'react';
import { TokenServices } from '../../services/TokenServices';
export default function ModalZakazivanje(props){
const [open, setOpen] = useState(false);
const pacijentId=TokenServices.uzimanjeSesijeId();
const [usluge, setUsluge]=useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {handleSubmit, control}=useForm();
  useEffect(()=>{
    const fetchData=async()=>{
        const response=await Services.getUslugaZaDoktora(props.doktorId);
        setUsluge(response);
    };
    fetchData();
  },[props.doktorId]);
  const onSubmit=async(data)=>{
    console.log(data);
    const response=await Services.zakaziPregled({'idTermin':props.idTermin,
    'idKorisnikPacijent':pacijentId,
    'idKorisnikDoktor':props.doktorId,
    'nazivUsluga':data.usluga
  });
  console.log(response);
  }
  return(
    <>
    <ToastContainer/>
      <p onClick={handleOpen}>{props.label}</p>
      <Modal 
        open={open}
        onClose={handleClose}
      >
    <Box className={styles.box}>
          <CloseIcon onClick={handleClose} className={styles.close} variant="large"/>
          <h1 className={styles.heading}>Detalji pregleda:</h1>
          <p><span className={styles.label}>Doktor: </span> {props.doktorIme} {props.doktorPrezime}</p>
          <p><span className={styles.label}>Termin: </span> {props.datum} {props.vreme}</p>
          <p><span className={styles.label}>Usluga: </span></p>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
           <Controller
              name="usluga"
              control={control}
              defaultValue={''}
              render={({ field }) => (
               <div className={styles.item}>
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
                </div>  
            
              )}/>
              <ContainedButton text="ZAKAŽI" type="submit" module={styles.button}/>
              </form>
          
          </Box></Modal></>
  )
}