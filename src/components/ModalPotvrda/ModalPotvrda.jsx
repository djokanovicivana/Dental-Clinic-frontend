import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './ModalPotvrda.module.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';


export default function ModalPotvrda(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm=()=>{
    props.onConfirm();
    handleClose();
  }
  return (
    <div>
      <p className={styles.label} onClick={handleOpen}>{props.label}</p>
      <Modal 
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.box}>
          <CloseIcon onClick={handleClose} className={styles.close} variant="large"/>
            <p className={styles.text}>{props.text}</p>
            <div className={styles.buttons}>
            <button className={styles.buttonDa} onClick={handleConfirm}>Da</button>
            <button className={styles.buttonNe}onClick={handleClose}>Ne</button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
