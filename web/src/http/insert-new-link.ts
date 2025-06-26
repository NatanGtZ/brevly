import axios from "axios";
// import z from "zod";

export interface LinksParams {
  originalUrl: string;
  shortUrl: string;
}

export async function InsertNewLink({originalUrl, shortUrl}: LinksParams){
  console.log(originalUrl, shortUrl);
  const response = await axios.post('http://localhost:3333/new-link', {
    original_url: originalUrl,
    short_url: shortUrl,
  });
  
  return response.data;
}