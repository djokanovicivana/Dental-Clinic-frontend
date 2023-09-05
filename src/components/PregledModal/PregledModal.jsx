import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './PregledModal.module.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Services } from '../../services/Services';
import { useEffect } from 'react';
import { useState } from 'react';
import ContainedButton from '../ContainedButton/ContainedButton';
export default function PregledModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [info,setInfo]=useState(null);
  useEffect(()=>{
      const fetchData=async()=>{
      const response=await Services.getPregledTermin(props.idTermin);
      console.log(response);
      setInfo(response[0]);
    };
    fetchData();
  },[props.idTermin]);
  const handleButtonClick=async()=>{
    console.log("KLIKNUTO")
    const response=await Services.otkaziPregled(props.idPregled);
    console.log(response);
  }

  return (
    <div>
      <p className={styles.label} onClick={handleOpen}>{props.label}</p>
      <Modal 
        open={open}
        onClose={handleClose}
        className={styles.modal}
      >
        <Box className={styles.box}>
          <CloseIcon onClick={handleClose} className={styles.close} variant="large"/>
          {info && <div className={styles.info}><p>Pacijent: {info.ime} {info.prezime}</p>
          <p>Usluga: {info.nazivUsluga}</p> </div> }
          <ContainedButton text="Otkaži" module={styles.button} handleClick={handleButtonClick}/>
        </Box>
      </Modal>
    </div>
  );
}
