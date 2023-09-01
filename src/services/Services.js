import axios from "axios";
const url="http://127.0.0.1:8000";
const getAllGrana=async()=>{
       try {
        const response = await axios.get(`${url}/home`);
        return response.data;
    } catch (error) {
        console.log(
            "🚀error",
            error
        );
    }
}
const getUslugeId=async(idGrana)=>{
    try{
        const response=await axios.get(`${url}/usluge/${idGrana}`);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(
            "🚀error",
            error
        );
    }
}
const getUsluga=async(idUsluga)=>{
    try{
        const response=await axios.get(`${url}/usluga/${idUsluga}`);
        return response.data;
    }
     catch(error){
        console.log(
            "🚀error",
            error
        );
    }
}
const login = async ({ korisnickoIme, password }) => {
    try {
        const response = await axios.post(`${url}/api/login`, { korisnickoIme, password });

        if (response.data.status === true) {
            return response;
        } else {
            console.log("Autentifikacija nije uspela:", response.data.message);
            return response.data.message;
        }
    } catch (error) {
        console.error("Greška pri prijavljivanju:", error);
        return null;
    }
};
const register=async({korisnickoIme, password, password_confirmation,email,ime,prezime,brojTelefona})=>{
    try{
    const response=await axios.post(`${url}/api/registracija`, {korisnickoIme, password, password_confirmation,email,ime,prezime,brojTelefona});
    return response.data;
    } catch(error){
        console.log(
            "🚀error",
            error
        );
    }
}
const getPacijentiDoktor=async({idKorisnik,searchTerm})=>{
    try{
    const response=await axios.get(`${url}/pacijenti/${idKorisnik}?searchTerm=${searchTerm}`);
    return response.data;
}catch(error){
 console.log(
            "🚀error",
            error
        );
}
}
const getPacijentId=async(idPacijent)=>{
    try{
        const response=await axios.get(`${url}/pacijent/${idPacijent}`);
        return response.data;
    }
    catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const getTerminiZavrseniPacijent=async(idPacijent,idDoktor)=>{
    try{
        const response=await axios.get(`${url}/terminiZavrseni/${idPacijent}/${idDoktor}`);
        return response.data;
    }
    catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const getTerminiBuduciPacijent=async(idPacijent,idDoktor)=>{
    try{
        const response=await axios.get(`${url}/terminiBuduci/${idPacijent}/${idDoktor}`);
        return response.data;
    }
    catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const getPregled=async(idPregled)=>{
    try{
        const response=await axios.get(`${url}/pregled/${idPregled}`);
        return response.data;
    }
    catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const getTermin=async(idTermin)=>{
    try{
        const response=await axios.get(`${url}/termin/${idTermin}`);
        return response.data;
    }
     catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const getTerminiZakazani=async(idDoktor,idPacijent)=>{
    try{
        const response=await axios.get(`${url}/terminiZakazani/${idDoktor}/${idPacijent}`);
        return response.data;
    }
     catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const noviPregled=async({idKorisnikPacijent,idKorisnikDoktor,idTermin,idUsluga, anamneza,dijagnoza,lecenje})=>{
    try{
    const response=await axios.patch(`${url}/api/noviPregled/${idKorisnikPacijent}/${idKorisnikDoktor}/${idTermin}`,{idUsluga:idUsluga,
         anamneza: anamneza,
      dijagnoza: dijagnoza,
      lecenje: lecenje});
  if (response.status === 200) {
      console.log('Pregled je uspešno ažuriran');
      return true;
    } else {
      console.log('Došlo je do greške prilikom ažuriranja pregleda');
      return false;
    }
  } catch (error) {
    console.error('Greška prilikom slanja zahteva:', error);
    return false;
  }
};
const getUslugaZaDoktora=async(idDoktor)=>{
    try{
        const response=await axios.get(`${url}/uslugeDoktor/${idDoktor}`);
        return response.data;
    }
     catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const getDoktor=async(idDoktor)=>{
    try{
        const response=await axios.get(`${url}/doktor/${idDoktor}`);
        return response.data;
    }
      catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const izmeniPacijenta=async({ime,prezime,korisnickoIme,email,brojTelefona,godiste,old_password,new_password,new_password_confirmation})=>{
    try{
    const response=await axios.patch(`${url}/api/izmenaPacijenta/${korisnickoIme}`,{
        ime:ime,
        prezime:prezime,
        korisnickoIme:korisnickoIme,
        email:email,
        brojTelefona:brojTelefona,
        godiste:godiste,
        old_password:old_password,
        new_password:new_password,
        new_password_confirmation:new_password_confirmation
    });
    return response.data;
}
catch(error){
    console.log('error:',error);
}}
const izmeniDoktora=async({ime,prezime,korisnickoIme,email,brojTelefona, slika, godiste,old_password,new_password,new_password_confirmation, nazivGrana})=>{
    try{
    const response=await axios.patch(`${url}/api/izmenaDoktora/${korisnickoIme}`,{
        ime:ime,
        prezime:prezime,
        korisnickoIme:korisnickoIme,
        email:email,
        brojTelefona:brojTelefona,
        slika:slika,
        godiste:godiste,
        old_password:old_password,
        new_password:new_password,
        new_password_confirmation:new_password_confirmation,
        nazivGrana:nazivGrana,
        
    });
    return response.data;
}
catch(error){
    console.log('error:',error);
}}
const getUslugaIdTermina=async(idTermina)=>{
    try{
        const response=await axios.get(`${url}/uslugaTermin/${idTermina}`);
        return response.data.nazivUsluga;
    }
    catch(error){
        console.log('error',error);
    }
}
const getTerminiZaDoktora=async(idDoktora)=>{
    try{
        const response=await axios.get(`${url}/terminiDoktor/${idDoktora}`);
        return response.data;
    }catch(error){
        console.log('error:',error);
    }
}
const getPregledTermin=async(idTermin)=>{
    try{
        const response=await axios.get(`${url}/pregledTermin/${idTermin}`);
        return response.data;
    }
    catch(error){
        console.log('error:',error);
        return null;
    }
}
const pretrazivanjeTermina=async({pocetniDatum,krajnjiDatum,pocetnoVreme,krajnjeVreme,doktor,usluga})=>{
    try{
        const response=await axios.get(`${url}/pretrazivanjeTermina?pocetniDatum=${pocetniDatum}&krajnjiDatum=${krajnjiDatum}&pocetnoVreme=${pocetnoVreme}&krajnjeVreme=${krajnjeVreme}&doktor=${doktor}&usluga=${usluga}`);
        return response.data;
    }catch(error){
        console.log('error:',error);
        return null;
    }
}
const sveUsluge=async()=>{
    try{
    const response=await axios.get(`${url}/sveUsluge`);
    return response.data;}
    catch(error){
        console.log('error',error);
    }
}
const zakaziPregled=async({idTermin, idKorisnikPacijent, idKorisnikDoktor, nazivUsluga})=>{
    try{
        const response=await axios.post(`${url}/api/zakaziPregled`,{
            'idTermin':idTermin,
            'idKorisnikPacijent':idKorisnikPacijent,
            'idKorisnikDoktor':idKorisnikDoktor,
            'nazivUsluga':nazivUsluga
        });
        return response.data;
    }catch(error){
        console.log('error:',error);
    }
}





export const Services={
    getAllGrana,
    getUslugeId,
    getUsluga, 
    login, 
    register,
    getPacijentiDoktor,
    getPacijentId,
    getTerminiZavrseniPacijent,
    getTerminiBuduciPacijent,
    getPregled,
    getTermin,
    getTerminiZakazani,
    noviPregled,
    getUslugaZaDoktora,
    getDoktor,
    izmeniPacijenta,
    izmeniDoktora,
    getUslugaIdTermina,
    getTerminiZaDoktora,
    getPregledTermin,
    pretrazivanjeTermina,
    sveUsluge, 
    zakaziPregled
};
