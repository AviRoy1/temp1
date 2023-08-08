import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/message" });

export const getMessages = (id) => API.get(`/${id}`);
export const addMessage = (data) => API.post("/", data);
export const getLatestMessage = (id) => API.get(`/newMessage/${id}`);
