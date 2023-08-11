import axios from "axios";
const getAllGrana=async()=>{
       try {
        const response = await axios.get("http://127.0.0.1:8000/home");
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
        const response=await axios.get(`http://127.0.0.1:8000/usluge/${idGrana}`);
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
        const response=await axios.get(`http://127.0.0.1:8000/usluga/${idUsluga}`);
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
        const response = await axios.post("http://127.0.0.1:8000/api/login", { korisnickoIme, password });

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
    const response=await axios.post("http://127.0.0.1:8000/api/registracija", {korisnickoIme, password, password_confirmation,email,ime,prezime,brojTelefona});
    return response.data;
    } catch(error){
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
    register
    
};
