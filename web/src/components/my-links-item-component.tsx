import { Copy, Trash } from "phosphor-react";
import { DeleteALink } from "../http/delete-a-link";

interface LinkProps {
  id: string;
  originalLink: string;
  shortLink: string;
  accesses: number;
}


export function MyLinksItemComponent({id, originalLink, shortLink, accesses }: LinkProps) {

  const link = `http://localhost:3333${shortLink}`;

  function handleCopy() {
    navigator.clipboard.writeText(link);
  }

  return (
    <li id={id} className="flex flex-2 justify-between border-t-1 border-gray-200 py-4">
      <div className="flex flex-row w-full">
        <div className="w-[300px] flex flex-col">
          <span className="text-md text-blue-base font-semibold w-[280px]"><a href={link} target="blank">http://localhost:3333{shortLink}</a></span>
          <span className="text-sm text-gray-500 truncate w-[280px]">{originalLink}</span>
        </div>
        <div className="flex-2 flex flex-row justify-end items-center gap-1">
            <span className="text-gray-500">{accesses} acessos</span>
            <button 
              onClick={handleCopy}
              className="bg-gray-200 rounded-sm border border-transparent flex items-center justify-center p-2 cursor-pointer ml-5 hover:border-solid hover:border hover:border-blue-base"
            >
              <Copy size={16} className="text-gray-600" />
            </button>
              <button 
                onClick={() => DeleteALink(id)}
                className="bg-gray-200 rounded-sm border border-transparent flex items-center justify-center p-2 cursor-pointer ml-1 hover:border hover:border-blue-base"
                >
              <Trash size={16} className="text-gray-600" />
            </button>
        </div>
      </div>
    </li>
  )
}