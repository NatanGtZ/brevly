

export function NotFoundPage() {

  return(
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 w-full max-w-lg h-[329px] text-center">
        <img
          src="./assets/images/404.svg"
          alt="404"
          className="mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-800">Link não encontrado</h1>
        <p className="mt-4 text-gray-600 text-sm font-medium">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          Saiba mais em{' '}
          <a href="http://localhost:5173" className="text-blue-600 underline">
            brev.ly
          </a>.
        </p>
      </div>
    </div>
  )
}