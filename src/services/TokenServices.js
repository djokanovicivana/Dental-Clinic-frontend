const saveToken=(token)=>{
    localStorage.setItem('token', token);
}
const getToken=()=>{
    localStorage.getItem('token');
}
export const TokenServices={
    saveToken,
    getToken,
}