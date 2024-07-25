import { Header } from "../components";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-2">
        <Outlet />
      </main>
    </>
  );
};
