

export function NewLinkComponent() {
  return(
    <div className="flex-1 bg-white shadow rounded-2xl p-6 w-max-[380px]">
          <h2 className="text-lg font-semibold mb-4">Novo link</h2>
          <label className="text-xs mb-1 text-gray-500">LINK ORIGINAL</label>
          <input
            className="w-full border rounded-lg px-4 py-2 mb-4 border-gray-300"
            placeholder="www.exemplo.com.br"
          />

          <label className="text-xs mb-1 text-gray-500">LINK ENCURTADO</label>
          <input
            className="w-full border rounded-lg px-4 py-2 mb-4 border-gray-300"
            placeholder="brev.ly/"
          />

          <button className="w-full bg-blue-base opacity-50 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
            Salvar link
          </button>
        </div>
  );
}