import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimeContainer, ErrorPage, AddAnime, HomeLayout } from "./pages";
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
        element: <AddAnime />,
      },
      {
        path: "/editar/:animeId",
        element: <AddAnime />,
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
