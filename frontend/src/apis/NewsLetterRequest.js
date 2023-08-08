import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api/newsletter/" });

export const newsLetterSignUp = (email) => API.post("/", email);
