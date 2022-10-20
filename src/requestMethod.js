import axios from "axios";

const BASE_URL = "http://localhost:5000/";


let emailFromStorage = localStorage.getItem('mySecretKey')
if(emailFromStorage){
emailFromStorage = JSON.parse(emailFromStorage)
const TOKEN = emailFromStorage.accessToken
console.log(TOKEN);
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${emailFromStorage.accessToken}` },
});