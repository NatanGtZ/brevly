import { DownloadSimple, Link } from "phosphor-react";
import { MyLinksItemComponent } from "./my-links-item-component";
import { GetLinks, type LinksParams} from "../http/get-links";
import { useEffect, useState } from "react";
import { ExportToCSV } from "../http/export-to-csv";

export function MyLinksComponent() {

  const [links, setLinks] = useState<LinksParams[]>([])

   useEffect(() => {
    async function fetchLinks() {
      const data = await GetLinks();
      setLinks(data);
    }

    fetchLinks();
  }, []);

  return(
    <div className="flex-2 bg-white shadow rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-600">Meus links</h2>
            <button
              onClick={ExportToCSV}
              className="flex items-center gap-2 text-sm border border-transparent text-gray-500 bg-gray-200 rounded-sm p-2 cursor-pointer hover:border hover:border-blue-base"
            >
              <DownloadSimple size={16} className="text-gray-600" /> 
              <span className="text-gray-500">Baixar CSV</span>
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