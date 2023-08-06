import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx"
import DropDownGrane from "../../components/DropDownGrane/DropDownGrane.jsx";
import { Link } from "react-router-dom";
export default function Home(){
    return (
    <>
    <Navbar 
    text1="O nama"
    text2={<DropDownGrane label="Usluge"/>}
    text3="Cenovnik" 
    text4={<Link to="/prijava">Prijavi se</Link>}
    text5={<Link to="/registracija">Registruj se</Link>}/>
    
    </>
    )
}