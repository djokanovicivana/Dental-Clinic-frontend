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

export const Services={
    getAllGrana,
    getUslugeId,
    getUsluga
    
};
