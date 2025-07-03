import axios from "axios";
// import z from "zod";


export async function DeleteALink(linkId: string){
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.delete(`${baseUrl}/delete-link/${linkId}`);
  console.log(response.data)
  return response.data;
}