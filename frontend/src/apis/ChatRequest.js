import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/chat" });

export const userChats = (id) => API.get(`/${id}`);

export const getDetails = (id) => API.get(`/detail/${id}`);
