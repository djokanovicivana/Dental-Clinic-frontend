import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow, TableBody, TableHead, TableContainer } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Services } from "../../services/Services";
import { TokenServices } from "../../services/TokenServices";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ModalZakazivanje from "../../components/ModalZakazivanje/ModalZakazivanje";
export default function ZakazivanjeRaspored(props) {
  const pacijentId=TokenServices.uzimanjeSesijeId();
  const { data,ime,prezime,idKorisnik,slika } = useParams();
  const [datumi, setDatumi] = useState([]);
  const [sati, setSati] = useState([]);
const [raspored, setRaspored] = useState([]);
console.log(data);
useEffect(()=>{
const terminiData = JSON.parse(data);
const termini = terminiData.split(',');

// Niz ID-ova
const idNiz = termini.map(termin => termin.split(' ')[0]);

// Niz datuma
const datumNiz = termini.map(termin => termin.split(' ')[1]);

// Niz vremena
const vremeNiz = termini.map(termin => termin.split(' ')[2]);

const zakazaniNiz = termini.map(termin => termin.split(' ')[3]);

console.log('ID niz:', idNiz);
console.log('Datum niz:', datumNiz);
console.log('Vreme niz:', vremeNiz);
console.log('Zakazani niz:',zakazaniNiz);


const uniqueDatumi = [...new Set(datumNiz)].sort(); // Koristimo Set za jedinstvene datume
setDatumi(uniqueDatumi);

const uniqueSati = [...new Set(vremeNiz)].sort(); // Koristimo Set za jedinstvene sate
setSati(uniqueSati);

const newRaspored = [];
for (const datum of uniqueDatumi) {
  const row = [];
  for (const vreme of uniqueSati) {
    const foundIndex = datumNiz.findIndex((datumTermina, index) => datumTermina === datum && vremeNiz[index] === vreme);

    if (foundIndex !== -1) {
      row.push({
        status: zakazaniNiz[foundIndex]==='1' ? "Zakazan" : "Slobodan",
        idTermin: idNiz[foundIndex]
      });
    } else {
      row.push("");
    }
  }
  newRaspored.push(row)
  setRaspored(newRaspored);
}},[data]);
console.log(raspored);


const tabelaStil = {
  borderCollapse: "collapse",
  width: "70%",
   
  marginTop:'2vh',
  margin:'auto',
};

  return (
    <>
     <Navbar 
           text2={<Link to="/zakazivanje">Zakaži termin</Link>}
           text3={<Link to="/pacijentTermini">Tvoji termini</Link>} 
           text4={<Link to="/pacijentProfil">Tvoj profil</Link>}
           text5="Odjavi se"/>
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
  }}>{raspored[rowIndex][columnIndex].status ==='Slobodan' ? <ModalZakazivanje label={<AddIcon/>} doktorIme={ime} doktorPrezime={prezime} doktorId={idKorisnik} idTermin={raspored[rowIndex][columnIndex].idTermin} datum={datum} vreme={vreme}/> : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
