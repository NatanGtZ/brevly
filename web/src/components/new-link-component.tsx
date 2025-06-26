import { Warning } from "phosphor-react";
import { InsertNewLink } from "../http/insert-new-link";
import { useState } from "react";
import { NewLinkInput } from "./new-link-input";


export function NewLinkComponent() {
  const prefix = 'localhost:3333/';
  const [shortLink, setShortLink] = useState(prefix);
  const [originalLink, setOriginalLink] = useState("");
  const [errors, setErrors] = useState("");

  const handleInsertNewLink = async (originalLink : string, shortLink: string) => {
    const sanitizedShortLink = shortLink.slice(prefix.length -1);

    if (!isValidUrl(originalLink)) {
      setErrors('Url inválida');
      return;
    }

    const response = await InsertNewLink({ originalUrl: originalLink.toString(), shortUrl: sanitizedShortLink.toString()});
    console.log(response);
    if(response.message === 'Link created successfully') {
      setShortLink(prefix);
      setOriginalLink("");
    }
  }

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith(prefix)) return;
  
    setShortLink(inputValue);
  };

  const handleCursor = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const input = e.currentTarget;

    if (input.selectionStart! < prefix.length) {
      input.setSelectionRange(prefix.length, prefix.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    if (
      input.selectionStart === prefix.length &&
      input.selectionEnd === prefix.length &&
      e.key === 'Backspace'
    ) {
      e.preventDefault();
    }

    if (
      ['ArrowLeft', 'Home'].includes(e.key) &&
      input.selectionStart === prefix.length
    ) {
      e.preventDefault();
    }
  };

  return(
      <div className="flex-1 bg-white shadow rounded-2xl p-8 max-w-[380px] h-[340px]">
            <h2 className="text-lg font-semibold mb-4">Novo link</h2>
            <NewLinkInput
              label="LINK ORIGINAL"
              name="originalLink"
              value={originalLink}
              placeholder="www.exemplo.com.br"
              onChange={(e) => setOriginalLink(e.target.value)}
              type="text"
              errorMessage={errors}
            />
            <NewLinkInput
              label="LINK ENCURTADO"
              name="shortLink"
              value={shortLink}
              onChange={handleChange}
              onClick={handleCursor}
              onKeyDown={handleKeyDown}
              type="text"
            />
            { shortLink.length == 0 &&
              <span className="flex flex-row">
                <Warning size={8}/>
                <span className=""></span>
              </span>
            }
            <button 
              disabled={shortLink.slice(prefix.length).length == 0 || originalLink.length == 0}
              onClick={() => handleInsertNewLink(originalLink, shortLink)}
              className="h-[48px] w-full bg-blue-base disabled:opacity-50 text-white py-2 rounded-lg hover:bg-blue-dark transition disabled:cursor-not-allowed cursor-pointer">
              Salvar link
            </button>
      </div>
  );
}