import axios from "axios";
import { adminLocalStorage } from "./LocalService";
// import { batLoading, tatLoading } from "../redux/spinnerSlice";
// import { storeAdmin,  } from "..";

export const https = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers:{
            Authorization:"Bearer " +  adminLocalStorage.get(), 
        }
    }
)