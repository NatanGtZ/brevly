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
  const response = await axios.get('http://localhost:3333/myLinks');
  
  // console.log(response.data)
  return response.data.links;
}