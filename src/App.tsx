import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AddAnime, AnimeContainer, ErrorPage, HomeLayout } from "./pages";
import "./index.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Login } from "./pages/auth";
import PublicRoutes from "./components/PublicRoutes";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <AnimeContainer />,
//       },
//       {
//         path: "/agregar",
//         element: (
//           <ProtectedRoutes isAllowed={false}>
//             <AddAnime />
//           </ProtectedRoutes>
//         ),
//       },
//       {
//         path: "/editar/:animeId",
//         lazy: async () => {
//           let { AddAnime } = await import("./pages/animes/add-anime/AddAnime");
//           return { Component: AddAnime };
//         },
//       },
//       {
//         path: "/registrar",
//         lazy: async () => {
//           let { Register } = await import("./pages/auth/Register");
//           return { Component: Register };
//         },
//       },
//       {
//         path: "/iniciar-sesion",
//         lazy: async () => {
//           let { Login } = await import("./pages/auth/Login");
//           return { Component: Login };
//         },
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />} errorElement={<ErrorPage />}>
      <Route index={true} element={<AnimeContainer />} />
      <Route element={<PublicRoutes />}>
        <Route path="/iniciar-sesion" element={<Login />} />
      </Route>
      <Route
        path="/registrar"
        lazy={async () => {
          let { Register } = await import("./pages/auth/Register");
          return { Component: Register };
        }}
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/agregar"
          lazy={async () => {
            let { AddAnime } = await import(
              "./pages/animes/add-anime/AddAnime"
            );
            return { Component: AddAnime };
          }}
        />
        <Route
          path="/editar/:animeId"
          lazy={async () => {
            let { AddAnime } = await import(
              "./pages/animes/add-anime/AddAnime"
            );
            return { Component: AddAnime };
          }}
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
