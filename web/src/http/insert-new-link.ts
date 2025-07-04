import axios from "axios";
// import z from "zod";

export interface LinksParams {
  originalUrl: string;
  shortUrl: string;
}

export async function InsertNewLink({originalUrl, shortUrl}: LinksParams){
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${baseUrl}/new-link`, {
    original_url: originalUrl,
    short_url: shortUrl,
  });
  return response.data;
}