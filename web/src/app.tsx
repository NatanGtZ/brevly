import { MyLinksComponent } from "./components/my-links-component"
import { NewLinkComponent } from "./components/new-link-component"

function App() {

  return (
    <main className="h-dvh flex flex-col items-center flex-grow bg-gray-200">
      <div className="mt-30 flex flex-col">
        <div className="mb-10 flex justify-center md:justify-start">
          <img src="./assets/images/Logo.svg" alt="Logo Brev.ly" />
        </div>
        <div className="flex md:flex-row gap-5 w-full">
          <NewLinkComponent />
          <MyLinksComponent />
        </div>
      </div>
    </main>
  )
}

export default App
