import axios from "axios";
import {API_URL} from "../config/config.ts";

export const apiInstance = axios.create({
    baseURL: API_URL
})