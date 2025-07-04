import { Check, CircleNotch, DownloadSimple, Link } from "phosphor-react";
import { MyLinksItemComponent } from "./my-links-item-component";
import { GetLinks, type LinksParams} from "../http/get-links";
import { useEffect, useState } from "react";
import { ExportToCSV } from "../http/export-to-csv";

export function MyLinksComponent() {

  const [links, setLinks] = useState<LinksParams[]>([])
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

   useEffect(() => {
    async function fetchLinks() {
      const data = await GetLinks();
      setLinks(data);
    }

    fetchLinks();
  }, [links]);

  async function HandleDownload(){
    setLoading(true);
    const url = await ExportToCSV();
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
}

  return(
    <div className="w-full md:flex-[2] min-w-0 bg-white shadow rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-600">Meus links</h2>
        <button
          onClick={HandleDownload}
          disabled={loading}
          className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm border border-transparent text-gray-500 bg-gray-200 rounded-sm p-2 cursor-pointer hover:border hover:border-blue-base"
        >
          {loading &&
            <CircleNotch size={16} className="animate-spin text-gray-600" />
          }
          {success && 
            <Check size={16} className="text-gray-600" />
          }
          {!loading && !success && (
            <>
              <DownloadSimple size={16} className="text-gray-600" />
              <span className="text-gray-500">Baixar CSV</span>
            </>
          )}
        </button>
      </div>
      {!links &&
            <div className="flex flex-col items-center justify-center text-center text-sm text-gray-500 h-40">
                <Link size={32} />
                <p className="mt-2 text-xs">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
            </div>
      }
       <ul className="space-y-2 text-sm">
          {
          links.map((link) => (
              <MyLinksItemComponent key={link.id} id={link.id} originalLink={link.originalLink} shortLink={link.shortLink} accesses={link.accesses}/>
            ))
          } 
        </ul>
    </div>
  );
}