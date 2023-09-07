import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow, TableBody, TableHead, TableContainer } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Services } from "../../services/Services";
import { TokenServices } from "../../services/TokenServices";
import Navbar from "../navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import PregledModal from "../PregledModal/PregledModal";
export default function Raspored() {
  const uloga=TokenServices.uzimanjeSesijeUloga();
  const {doktorId}=useParams();
  const [id, setId]=useState(doktorId);
  const [datumi, setDatumi] = useState([]);
  const [sati, setSati] = useState([]);
  const [raspored, setRaspored] = useState([]);
  const [sestraId, setSestraId]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
    if(uloga==='Medicinska Sestra'){
        setSestraId(TokenServices.uzimanjeSesijeId());
    }if(!doktorId && uloga==='MedicinskaSestra'){
      const response=await Services.sestraId(TokenServices.uzimanjeSesijeId);
      setId(response[0].idDoktor);
    }};
    fetchData();
  }, [uloga]);
   
  useEffect(() => {
    const fetchData = async () => {
      const response = await Services.getTerminiZaDoktora(id);
      console.log(response);

      const uniqueDatumi = Array.from(new Set(response.map(item => item.datumTermina))).sort();
      setDatumi(uniqueDatumi);

      const uniqueSati = Array.from(new Set(response.map(item => item.vremeTermina))).sort();
      setSati(uniqueSati);

    const newRaspored = [];
for (const datum of uniqueDatumi) {
  const row = [];
  for (const vreme of uniqueSati) {
    const foundTermin = response.find(item => item.datumTermina === datum && item.vremeTermina === vreme);
    if (foundTermin) { 
      row.push({
        status: foundTermin.zakazan ? "Zakazan" : "Slobodan",
        idTermin: foundTermin.idTermin,
        idPregled:foundTermin.zakazan ? foundTermin.idPregled : null
    });
    } else {
      row.push("");
    }
  }
  newRaspored.push(row);
}
setRaspored(newRaspored);
    };

    fetchData();
  }, [doktorId, uloga]);
const tabelaStil = {
  borderCollapse: "collapse",
  width: "70%",
   
  marginTop:'2vh',
  margin:'auto',
};

  return (
    <>
     {uloga==='Doktor' ?  (<Navbar 
           text1={<Link to={`/doktorPregledi/${doktorId}`}>Pregledi</Link>}
           text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${doktorId}`}>Raspored</Link>} 
           text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>) : (uloga==='Medicinska Sestra' ? (
         <Navbar 
           text2={<Link to={`/doktorPacijenti/${id}`}>Pacijenti</Link>}
           text3={<Link to={`/raspored/${id}`}>Raspored</Link>} 
           text4={<Link to={`/profilSestra/${sestraId}`}>Tvoj profil</Link>}
           text5="Odjavi se"/>
           ):  <Navbar
        text1={<Link to="/sviDoktori">Doktori</Link>}
        text2={<Link to="/sveMedicinskeSestre">Medicinske sestre</Link>}
        text3={<Link to="/sviPacijenti">Pacijenti</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>)}
    <Table style={tabelaStil}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {sati.map((vreme, index) => (
            <TableCell key={index} align="center">
              {format(parseISO(`2000-01-01 ${vreme}`), "HH:mm")}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {datumi.map((datum, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>{format(new Date(datum), "dd.MM.yyyy")}</TableCell>
            {sati.map((vreme, columnIndex) => (
              <TableCell key={columnIndex} align="center"   style={{
    borderBottom: "1px solid white",
    borderRight: columnIndex !== sati.length - 1 ? "1px solid white" : "none",
    backgroundColor: raspored[rowIndex][columnIndex].status ==='Zakazan' ? "#F52D3B" : "#83D17B",
    cursor:'pointer',
    height:'30px',
    fontSize:'15px',
    fontWeight:'bolder',
    color:'white',
    padding:'6px'
  }}>{raspored[rowIndex][columnIndex].status ==='Zakazan' ? (<PregledModal label="..." idTermin={raspored[rowIndex][columnIndex].idTermin} idPregled={raspored[rowIndex][columnIndex].idPregled}  />) : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
