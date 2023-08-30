const cuvanjeSesije = ({ idKorisnika, uloga }) => {
    const data = {
        idKorisnika: idKorisnika,
        uloga: uloga
    };

    sessionStorage.setItem('userData', JSON.stringify(data));
}
const brisanjeSesije=()=>{
    sessionStorage.clear();
}
const uzimanjeSesijeId = () => {
    const storedData = sessionStorage.getItem('userData');

    if (storedData) {
        const userData = JSON.parse(storedData);
        return userData.idKorisnika;
    }

    return null; 
}
const uzimanjeSesijeUloga = () => {
    const storedData = sessionStorage.getItem('userData');

    if (storedData) {
        const userData = JSON.parse(storedData);
        return userData.uloga;
    }

    return null; 
}
export const TokenServices={
    cuvanjeSesije,
    brisanjeSesije,
    uzimanjeSesijeId,
    uzimanjeSesijeUloga
}
