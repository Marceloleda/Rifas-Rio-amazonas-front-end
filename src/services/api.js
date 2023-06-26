'use client'
import axios from "axios";

//DEV
// const URL = "http://localhost:5000";
let TOKEN;
const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const api = axios.create({ baseURL: URL });

if (typeof window !== 'undefined') {
  TOKEN = localStorage.getItem('token');
}
api.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;

export function signUpSend(body) {
  return api.post("/sign-up", body);
}

export function signIn(body) {
  return api.post("/auth/sign-in", body);
}

export function createPaymentToPlan(typePlan) {
  return api.post(`/plan/${typePlan}`);
}
