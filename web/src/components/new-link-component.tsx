import { InsertNewLink } from "../http/insert-new-link";
import { useState } from "react";
import { NewLinkInput } from "./new-link-input";
import toast from "react-hot-toast";


export function NewLinkComponent() {
  const [shortLink, setShortLink] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [errors, setErrors] = useState({
    original: "",
    short: "",
  });
  const [saving, setSaving] = useState(false);

  const handleInsertNewLink = async (originalLink: string, shortLink: string) => {
    const error = {original: "", short: ""};
    const regex = /^[a-zA-Z0-9_-]+$/;
    const isValid = regex.test(shortLink); 

    if (!isValidUrl(originalLink)) {
      error.original = 'Url inválida';
    }
    if(!isValid) {
      error.short ='Informe uma url minúscula e sem espaços/caractere especial';
    }

    if(error.original || error.short) {
      setErrors(error);
      return;
    }

    setSaving(true) 
    const response = await InsertNewLink({
      originalUrl: originalLink.toString(),
      shortUrl: '/' + shortLink.toString()
    });

    if (response.message === 'Link created successfully') {
      setShortLink("");
      setOriginalLink("");
      setSaving(false) 
      setErrors({original: "", short: ""});
    }

    if (response.message === 'Link already exists') {
      toast.error('URL encurtada já existe');
      setSaving(false) 
    }
  };

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortLink(e.target.value);
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
              errorMessage={errors.original}
            />
            <NewLinkInput
              label="LINK ENCURTADO"
              name="shortLink"
              value={shortLink}
              showPrefix={true}
              onChange={handleChange}
              type="text"
              errorMessage={errors.short}
            />
            <button 
              disabled={saving}
              onClick={() => handleInsertNewLink(originalLink, shortLink)}
              className="h-[48px] w-full bg-blue-base disabled:opacity-50 text-white py-2 rounded-lg hover:bg-blue-dark transition disabled:cursor-not-allowed cursor-pointer">
              {saving && 'Salvando...'}
              {!saving && 'Salvar link'}
            </button>
      </div>
  );
}