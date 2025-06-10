import { DownloadSimple, Link } from "phosphor-react";



export function MyLinksComponent() {
  return(
    <div className="bg-white shadow rounded-2xl p-6 flex-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-600">Meus links</h2>
            <button
              className="flex items-center gap-2 text-sm text-gray-500"
            >
              <DownloadSimple size={16} className="text-gray-500" /> Baixar CSV
            </button>
          </div>
          <div className="border-t-1 border-gray-200 rounded-full"></div>
          <div className="flex flex-col items-center justify-center text-center text-sm text-gray-500 h-40">
              <Link size={32} />
              <p className="mt-2 text-xs">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
          </div>
          {/* {links.length === 0 ? (
            
          ) : (
            <ul className="space-y-2 text-sm">
              {links.map((link, idx) => (
                <li key={idx} className="flex justify-between border-b py-2">
                  <span>{link.original}</span>
                  <span className="text-blue-600">{link.short}</span>
                </li>
              ))}
               <li className="flex justify-between border-b py-2">
                  <span>Link Original</span>
                  <span className="text-blue-600">Link Encurtado</span>
                </li>
            </ul>
          )} */}
        </div>
  );
}