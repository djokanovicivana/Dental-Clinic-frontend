import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow, TableBody, TableHead, TableContainer } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Services } from "../../services/Services";
import { TokenServices } from "../../services/TokenServices";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import PregledModal from "../PregledModal/PregledModal";
export default function Raspored() {
  const doktorId = TokenServices.uzimanjeSesijeId();
  const [datumi, setDatumi] = useState([]);
  const [sati, setSati] = useState([]);
  const [raspored, setRaspored] = useState([]);
  const [pregledInfo, setPregledInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Services.getTerminiZaDoktora(doktorId);

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
        idTermin: foundTermin.idTermin
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
  }, [doktorId]);
const tabelaStil = {
  borderCollapse: "collapse",
  width: "70%",
   
  marginTop:'2vh',
  margin:'auto',
};

  return (
    <>
     <Navbar 
           text2={<Link to="/doktorPacijenti">Pacijenti</Link>}
           text3={<Link to="/raspored">Raspored</Link>} 
           text4={<Link to="/doktorProfil">Tvoj profil</Link>}
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
  }}>{raspored[rowIndex][columnIndex].status ==='Zakazan' ? (<PregledModal label="..." idTermin={raspored[rowIndex][columnIndex].idTermin} />) : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
