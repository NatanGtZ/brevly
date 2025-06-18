import { Warning } from "phosphor-react";


export function NewLinkComponent() {
  return(
    <div className="flex-1 bg-white shadow rounded-2xl p-8 w-max-[380px] h-[340px]">
          <h2 className="text-lg font-semibold mb-4">Novo link</h2>
          <label className="text-xs mb-2 text-gray-500">LINK ORIGINAL</label>
          <input
            id="originalLink"
            className="w-full h-[48px] border rounded-lg px-4 py-2 mb-4 border-gray-300 focus:outline-blue-base text-md"
            placeholder="www.exemplo.com.br"
          />
          <label className="text-xs text-gray-500">LINK ENCURTADO</label>
          <input
            className="w-full h-[48px] border rounded-lg px-4 py-2 mb-5 border-gray-300 focus:outline-blue-base text-md"
            placeholder="brev.ly/"
          />
          <span className="flex flex-row">
            <Warning size={8}/>
            <span className=""></span>
          </span>
          <button className="h-[48px] w-full bg-blue-base disabled:opacity-50 text-white py-2 rounded-lg hover:bg-blue-dark transition cursor-pointer">
            Salvar link
          </button>
    </div>
  );
}