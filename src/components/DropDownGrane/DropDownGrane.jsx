import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./DropDownGrane.module.css";
import {Services} from "../../services/Services.js";
import { Link } from "react-router-dom";

export default function DropDownMenu(props) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Services.getAllGrana();
      
      setItems(data);
    };
    fetchData();
  }, []);
 


  return (
    <div>
      <p
        onMouseOver={handleMenuOpen}
        className={styles.button}
        onBlur={handleMenuClose}
      >
        {props.label}
      </p>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
        className={styles.menu}
      >
        {items.map((item,  index) => (
          <MenuItem component={Link}
            to={`/Usluge/${item.idGrana}/${item.nazivGrana}`} className={styles.menuItem} key={index}>{item.nazivGrana}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
