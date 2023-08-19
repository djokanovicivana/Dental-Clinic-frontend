import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./NoviPregledPage.module.css";
import { useForm, Controller } from 'react-hook-form';
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import BasicSelect from "../../components/BasicSelect/BasicSelect";
import { format } from "date-fns";
import { Services } from "../../services/Services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NoviPregledPage() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const { doktorId, pacijentId } = useParams();
  const [pacijent, setPacijent] = useState([]);
  const [vreme, setVreme] = useState([]);
  const [selectedVreme, setSelectedVreme] = useState('');
  const [terminiResponse, setTerminiResponse] = useState([]); 


  useEffect(() => {
    const fetchData = async () => {
      const pacijentResponse = await Services.getPacijentId(pacijentId);
      setPacijent(pacijentResponse[0]);

      const terminiResponse = await Services.getTerminiZakazani(doktorId, pacijentId);
      if (terminiResponse) {
        const vremeOptions = terminiResponse.map(termin => ({
          value: `${termin.datumTermina} ${termin.vremeTermina}`,
          label: format(new Date(`${termin.datumTermina} ${termin.vremeTermina}`), "dd.MM.yyyy HH:mm"),
        }));
        setVreme(vremeOptions);
        setTerminiResponse(terminiResponse);
      }
    };

    fetchData();
  }, [doktorId, pacijentId]);

  const onSubmit = async (data) => {
    const selectedDateTime = format(new Date(data.termin), "dd.MM.yyyy HH:mm");
    
    const selectedTerminId = terminiResponse.reduce((acc, termin) => {
      const terminDateTime = format(new Date(`${termin.datumTermina} ${termin.vremeTermina}`), "dd.MM.yyyy HH:mm");
      if (terminDateTime === selectedDateTime) {
        acc = termin.idTermin;
      }
      return acc;
    }, null);


    if (selectedTerminId) {
      const response = await Services.noviPregled({
        'idKorisnikPacijent': pacijentId,
        'idKorisnikDoktor': doktorId,
        'idTermin': selectedTerminId,
        'anamneza': data.anamneza,
        'dijagnoza': data.dijagnoza,
        'lecenje': data.lecenje,
      });
      console.log(response);
      toast.success("Informacije o pregledu su uspešno sačuvane!");
    }
  }

  const handleVremeChange = (event) => {
    setSelectedVreme(event.target.value);
  };
  
  return (
    <>
      <Navbar
        text2={<Link to={`/doktorPacijenti/${doktorId}`}>Pacijenti</Link>}
        text3={<Link to="/raspored">Raspored</Link>}
        text4={<Link to={`/doktorProfil/${doktorId}`}>Tvoj profil</Link>}
        text5="Odjavi se"
      />
      <ToastContainer />
      <div className={styles.box}>
      <h1 className={styles.heading}>Unesi informacije o pregledu:</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} method="PATCH">
        <div className={styles.row1}>
        {pacijent && <p className={styles.name}>Pacijent: {pacijent.ime} {pacijent.prezime}</p>}
        <div className={styles.item}>
        <Controller
        className={styles.item}
          name="termin"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <BasicSelect
              label="Termin"
              value={selectedVreme}
              data={vreme}
              onChange={handleVremeChange}
              {...field}
            />
          )}
        />
        {errors.termin && <p className={styles.error}>Termin je obavezan.</p>}
        </div>
        <div className={styles.item}>
          <TextField
            id="anamneza"
            name="anamneza"
            label="Anamneza.."
            multiline
            rows={7}
            variant="outlined"
            style={{ width: "100%", maxWidth: "500px" }}
            {...register('anamneza', { required: true })}
          />
          {errors.anamneza && <p className={styles.error}>Anamneza je obavezna.</p>}
        </div>
        </div>
        <div className={styles.row2}>
        <div className={styles.item}>
          <TextField
            id="dijagnoza"
            name="dijagnoza"
            label="Dijagnoza.."
            multiline
            rows={3}
            variant="outlined"
            style={{ width: "100%", maxWidth: "500px" }}
            {...register('dijagnoza', { required: true })}
          />
          {errors.dijagnoza && <p className={styles.error}>Dijagnoza je obavezna.</p>}
        </div>
        <div className={styles.item}>
          <TextField
            id="lecenje"
            name="lecenje"
            label="Preporučeno lečenje.."
            multiline
            rows={5.5}
            variant="outlined"
            style={{ width: "100%", maxWidth: "500px" }}
            {...register('lecenje', { required: true })}
          />
          {errors.lecenje && <p className={styles.error}>Obavezno je preporučiti lečenje</p>}
        </div>
         
        
        <ContainedButton text="POTVRDI" module={styles.button} type="submit" />
        </div>
      </form>
      </div>
    </>
  )
}