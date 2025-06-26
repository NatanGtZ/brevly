import axios from "axios";
// import z from "zod";


export async function ExportToCSV(){
  const response = await axios.post('http://localhost:3333/links/export');
  HandleDownload(response.data.reportUrl)
}

function HandleDownload(url: string){
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}