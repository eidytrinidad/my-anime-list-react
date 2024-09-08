import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimeContainer, ErrorPage, HomeLayout } from "./pages";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AnimeContainer />,
      },
      {
        path: "/agregar",
        lazy: async () => {
          let { AddAnime } = await import("./pages/animes/add-anime/AddAnime");
          return { Component: AddAnime };
        },
      },
      {
        path: "/editar/:animeId",
        lazy: async () => {
          let { AddAnime } = await import("./pages/animes/add-anime/AddAnime");
          return { Component: AddAnime };
        },
      },
      {
        path: "/registrar",
        lazy: async () => {
          let { Register } = await import("./pages/auth/Register");
          return { Component: Register };
        },
      },
      {
        path: "/iniciar-sesion",
        lazy: async () => {
          let { Login } = await import("./pages/auth/Login");
          return { Component: Login };
        },
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
