import axios from "axios";
// import z from "zod";

export interface LinksParams {
  id: string;
  originalLink: string;
  shortLink: string;
  accesses: number;
  createdAt: Date;
}

export async function GetLinks(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(`${baseUrl}/myLinks`);
  
  // console.log(response.data)
  return response.data.links;
}