import { Check, Copy, Trash } from "phosphor-react";
import { DeleteALink } from "../http/delete-a-link";
import { RedirectToOriginalLink } from "../http/redirect-to-original-link";
import { useSetPage } from "../stores/page-store";
import { useState } from "react";

interface LinkProps {
  id: string;
  originalLink: string;
  shortLink: string;
  accesses: number;
}

export function MyLinksItemComponent({id, originalLink, shortLink, accesses }: LinkProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = import.meta.env.VITE_FRONTEND_URL;
  const linktoCopy = baseUrl + shortLink;
  const setPage = useSetPage((s) => s.setPage);
  const originalLinkView = originalLink.slice(0, 30) + "..." ;
  
  const handleRedirect = async () => {
    try{
      const response = await RedirectToOriginalLink(shortLink);
      if(response.status == 200) {
        window.open(baseUrl + shortLink, '_blank');
      }
      if(response.data.statusCode == 404) {
        setPage('notFound')
      }
    } catch {
      setPage('notFound')
    }
  }


  function handleCopy() {
    navigator.clipboard.writeText(linktoCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <li id={id} className="flex justify-evenly border-t-1 border-gray-200 py-4 px-4 box-border">
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col w-full max-w-[105px] md:max-w-full">
        <span className="text-md text-blue-base font-semibold truncate ">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleRedirect();
            }}
            target="_blank"
          >
            {baseUrl}{shortLink}
          </a>
        </span>
        <p className="text-sm text-gray-500 truncate w-full max-w-[105px] md:max-w-full">
          {originalLinkView}
        </p>
      </div>
      <div className="relative flex flex-row justify-end items-center gap-1">
          {copied && 
            <div className="absolute -top-8 left-3/5 -translate-x-1/2 bg-white text-gray-500 text-xs px-2 py-1 rounded-md shadow-md transition-opacity duration-300">
              Copiado!
            </div>
          }
        <span className="text-gray-500">{accesses} acessos</span>
        <button
          onClick={handleCopy}
          className="bg-gray-200 rounded-sm border border-transparent flex items-center justify-center p-2 cursor-pointer ml-5 hover:border-solid hover:border hover:border-blue-base"
        >
          {copied && 
            <Check size={16} className="text-gray-600" />
          }
          {!copied && 
            <Copy size={16} className="text-gray-600" />
          }          
        </button>
        <button
          onClick={() => DeleteALink(id)}
          className="bg-gray-200 rounded-sm border border-transparent flex items-center justify-center p-2 cursor-pointer ml-1 hover:border hover:border-blue-base"
        >
          <Trash size={16} className="text-gray-600" />
        </button>
      </div>
    </li>
  )
}