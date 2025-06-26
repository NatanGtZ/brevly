import axios from "axios";
// import z from "zod";

export interface LinksParams {

  originalLink: string;
  shortLink: string;
}

export async function InsertNewLink({originalLink, shortLink}: LinksParams){
  const response = await axios.post('http://localhost:3333/new-link',{
    originalLink: originalLink,
    shortLink: shortLink,
    accesses: 0,
  });
  
  // console.log(response.data)
  return response.data.links;
}