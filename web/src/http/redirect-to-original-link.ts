import axios from "axios";

export interface RedirectResponseProps {
  message: string;
  originalLink?: string;
  statusCode: number;
}


export async function RedirectToOriginalLink(short: string){
  const response = await axios.get<RedirectResponseProps>(`http://localhost:3333${short}`);
  console.log(response);
  return response;
}