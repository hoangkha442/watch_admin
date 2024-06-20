import axios from "axios";
// import { useHistory } from 'react-router-dom';
import { adminLocalStorage } from "./LocalService";
export const BASE_URL_IMG_PRD = 'http://localhost:8080/public/img/prds/'
export const BASE_URL_IMG_USER = 'http://localhost:8080/public/img/avatar/'
export const https = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers:{
            Authorization:"Bearer " +  adminLocalStorage.get(), 
        }
    }
)

               