import axios from "axios";
// import z from "zod";


export async function ExportToCSV(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${baseUrl}/links/export`);
  return response.data.reportUrl;
}