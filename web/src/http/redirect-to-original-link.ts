import axios from "axios";

export interface RedirectResponseProps {
  message: string;
  originalLink?: string;
  statusCode: number;
}


export async function RedirectToOriginalLink(short: string){
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get<RedirectResponseProps>(`${baseUrl}${short}`);
  return response;
}