

export function NotFoundPage() {

  return(
    <div>
      <img src="./assets/images/404.svg" alt="404 Not Found" />
      <span>Link não encontrado</span>
      <span>
        O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em 
        <a href="http://localhost:5173">brev.ly</a>.
      </span>
    </div>
  )
}