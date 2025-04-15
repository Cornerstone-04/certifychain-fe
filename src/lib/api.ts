import axios from "axios";
import { baseURL } from "./constants";

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
