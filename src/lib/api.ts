import axios from "axios";
import { baseURL } from "../config/env";

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
