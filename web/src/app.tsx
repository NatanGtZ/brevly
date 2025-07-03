import { MyLinksComponent } from "./components/my-links-component"
import { NewLinkComponent } from "./components/new-link-component"
import { NotFoundPage } from "./pages/404-page";
import { RedirectPage } from "./pages/redirect-page";
import { useSetPage } from "./stores/page-store";

function App() {
  const usePage = useSetPage((s) => s.page);

  return (
    <main data-page={usePage} className="min-h-dvh flex flex-col data-[page=home]:pt-30 data-[page=notFound]:justify-center data-[page=redirecting]:justify-center items-center bg-gray-200">    
          {usePage === 'home' && 
            <div className="flex flex-col">
              <div className="mb-10 flex justify-center md:justify-start">
                <img src="./assets/images/Logo.svg" alt="Logo Brev.ly" />
              </div>
              <div className="flex md:flex-row flex-col gap-5 w-full justify-center items-start mb-5">
                <NewLinkComponent />
                <MyLinksComponent />
              </div>
            </div>
          }
          {usePage === 'redirecting' && 
            <RedirectPage/>
          }
           {usePage === 'notFound' && 
            <NotFoundPage/>
          }
    </main>
  )
}

export default App
