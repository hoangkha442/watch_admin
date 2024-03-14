import { https } from "./config";

export const Auth = {
  login: (data) => {
    return https.post("/Auth/login", data);
  }
}