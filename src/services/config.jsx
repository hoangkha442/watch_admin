import axios from "axios";
import { adminLocalStorage } from "./LocalService";
// import { batLoading, tatLoading } from "../redux/spinnerSlice";
// import { storeAdmin,  } from "..";
export const BASE_URL_IMG_PRD = 'http://localhost:8080/public/img/prds/'
export const https = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers:{
            Authorization:"Bearer " +  adminLocalStorage.get(), 
        }
    }
)