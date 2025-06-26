import axios from "axios";
// import z from "zod";


export async function DeleteALink(linkId: string){
  const response = await axios.delete(`http://localhost:3333/delete-link/${linkId}`);
  console.log(response.data)
  return response.data;
}