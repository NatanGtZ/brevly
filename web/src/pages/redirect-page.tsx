import { useSetPage } from "../stores/page-store";


export const RedirectPage = () => {
  const originalLink = useSetPage((s) => s.originalLink);

  return(
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 w-full max-w-lg text-center">
        <img
          src="./assets/images/Logo_Icon.svg"
          alt="404"
          className="mx-auto mb-3"
        />
        <h1 className="text-2xl font-bold text-gray-800">Redirecionando...</h1>
        <p className="mt-4 text-gray-600 text-sm font-medium">
          O link será aberto automaticamente em alguns instantes.<br/>
          Não foi redirecionado?{' '}
          <a href={originalLink ?? undefined} className="text-blue-600 underline">
            Acesse aqui
          </a>.
        </p>
      </div>
    </div>
  )
}