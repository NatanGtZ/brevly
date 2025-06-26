import { Warning } from "phosphor-react";
import { InsertNewLink } from "../http/insert-new-link";
import { useState } from "react";


export function NewLinkComponent() {

  const originalLink = "";
  const shortLink = "";

  const handleInsertNewLink = (originalLink : string, shortLink: string) => {
    InsertNewLink({ originalLink: originalLink, shortLink: shortLink})
  }

  const prefix = 'localhost:3333/';
  const [value, setValue] = useState(prefix);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Garante que o prefixo nunca seja apagado
    if (!inputValue.startsWith(prefix)) return;

    setValue(inputValue);
  };

  const handleCursor = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const input = e.currentTarget;
    // Impede o cursor de ir antes do prefixo
    if (input.selectionStart! < prefix.length) {
      input.setSelectionRange(prefix.length, prefix.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    // Impede deletar o prefixo com Backspace
    if (
      input.selectionStart === prefix.length &&
      input.selectionEnd === prefix.length &&
      e.key === 'Backspace'
    ) {
      e.preventDefault();
    }

    // Impede mover o cursor para antes do prefixo
    if (
      ['ArrowLeft', 'Home'].includes(e.key) &&
      input.selectionStart === prefix.length
    ) {
      e.preventDefault();
    }
  };

  return(
    <form>
      <div className="flex-1 bg-white shadow rounded-2xl p-8 max-w-[380px] h-[340px]">
            <h2 className="text-lg font-semibold mb-4">Novo link</h2>
            <label className="text-xs mb-2 text-gray-500">LINK ORIGINAL</label>
            <input
              id="originalLink"
              className="w-full h-[48px] border rounded-lg px-4 py-2 mb-4 border-gray-300 focus:outline-blue-base text-md"
              placeholder="www.exemplo.com.br"
              value={originalLink}
            />
            <label className="text-xs text-gray-500">LINK ENCURTADO</label>
            <input
              className="w-full h-[48px] border rounded-lg px-4 py-2 mb-5 border-gray-300 focus:outline-blue-base text-md"
              placeholder="brev.ly/"
              value={value}
              onChange={handleChange}
              onClick={handleCursor}
              onKeyDown={handleKeyDown}
            />
            <span className="flex flex-row">
              <Warning size={8}/>
              <span className=""></span>
            </span>
            <button 
              onSubmit={() => handleInsertNewLink(originalLink, shortLink)}
              className="h-[48px] w-full bg-blue-base disabled:opacity-50 text-white py-2 rounded-lg hover:bg-blue-dark transition cursor-pointer">
              Salvar link
            </button>
      </div>
    </form>
  );
}