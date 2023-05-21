import axios from "axios";

const host = process.env.NEXT_PUBLIC_HOST ?? 'backend';
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT ? parseInt(process.env.NEXT_PUBLIC_BACKEND_PORT, 10) : 3001;

export const api = axios.create({
  baseURL: `http://${host}:${backendPort}/`,
});
