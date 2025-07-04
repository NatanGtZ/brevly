import { useEffect } from "react";
import { MyLinksComponent } from "./components/my-links-component"
import { NewLinkComponent } from "./components/new-link-component"
import { NotFoundPage } from "./pages/404-page";
import { RedirectPage } from "./pages/redirect-page";
import { useSetPage } from "./stores/page-store";
import { Toaster } from "react-hot-toast";

function App() {
  const usePage = useSetPage((s) => s.page);
  const setPage = useSetPage((s) => s.setPage);

    useEffect(() => {
    const path = window.location.pathname.slice(1);
    console.log(path)
    if (path) {
      setPage("redirecting");
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      console.log(baseUrl + '/' +path)
      fetch(`${baseUrl}/${path}`)
        .then(async (res) => {
          if (!res.ok) throw new Error();
          const data = await res.json();
          window.location.href = data.originalLink;
        })
        .catch(() => {
          setPage("notFound");
        });
    }
  }, []);

  return (
    <main data-page={usePage} className="min-h-dvh flex flex-col data-[page=home]:pt-30 data-[page=notFound]:justify-center data-[page=redirecting]:justify-center items-center bg-gray-200">    
          <Toaster position="bottom-right" />
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
