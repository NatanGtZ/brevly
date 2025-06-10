import { MyLinksComponent } from "./components/my-links-component"
import { NewLinkComponent } from "./components/new-link-component"

function App() {

  return (
    <main className="h-dvh flex flex-col items-center bg-gray-200">
      <div className="mt-30 flex flex-col items-center">
        <div className="mb-10">
          <img src="./assets/images/Logo.svg" alt="Logo Brev.ly" />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <NewLinkComponent />
          <MyLinksComponent />
        </div>
      </div>
    </main>
  )
}

export default App
