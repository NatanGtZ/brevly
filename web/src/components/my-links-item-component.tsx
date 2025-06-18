import { Copy, Trash } from "phosphor-react";


export function MyLinksItemComponent() {
  return (
    <li className="flex justify-between border-t-1 border-gray-200 py-4">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex-2 flex flex-col">
          <span className="text-md text-blue-base font-semibold">brev.ly/Portfolio-Dev</span>
          <span className="text-sm text-gray-500">devsite.portfolio.com.br/devname-123456</span>
        </div>
        <div className="flex-1 flex flex-row justify-end items-center gap-1">
            <span className="text-gray-500">30 acessos</span>
            <button className="bg-gray-200 rounded-sm border border-transparent flex items-center justify-center p-2 cursor-pointer ml-5 hover:border-solid hover:border hover:border-blue-base">
              <Copy size={16} className="text-gray-600" />
            </button>
              <button className="bg-gray-200 rounded-sm border border-transparent flex items-center justify-center p-2 cursor-pointer ml-1 hover:border hover:border-blue-base">
              <Trash size={16} className="text-gray-600" />
            </button>
        </div>
      </div>
    </li>
  )
}