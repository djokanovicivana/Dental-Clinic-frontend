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
            return null;
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
const getPacijentiDoktor=async(idKorisnik)=>{
    try{
    const response=await axios.get(`${url}/pacijenti/${idKorisnik}`);
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
const getTerminiZavrseniPacijent=async(idPacijent)=>{
    try{
        const response=await axios.get(`${url}/terminiZavrseni/${idPacijent}`);
        return response.data;
    }
    catch(error){
         console.log(
            "🚀error",
            error
        );
    }
}
const getTerminiBuduciPacijent=async(idPacijent)=>{
    try{
        const response=await axios.get(`${url}/terminiBuduci/${idPacijent}`);
        return response.data;
    }
    catch(error){
         console.log(
            "🚀error",
            error
        );
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
    getTerminiBuduciPacijent
    
};
