import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const url = axios.create({ baseURL: `${API}/api` });

export default url;