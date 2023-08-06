import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './BasicModal.module.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <p className={styles.label} onClick={handleOpen}>{props.label}</p>
      <Modal 
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.box}>
          <CloseIcon onClick={handleClose} className={styles.close} variant="large"/>
          {props.child}
        </Box>
      </Modal>
    </div>
  );
}
