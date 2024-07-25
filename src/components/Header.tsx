import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <header className="bg-primary py-2">
      <article className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="cursor-pointer">
          <h1 className="text-bold text-white p-2 rounded-lg cursor-pointer text-base md:text-2xl">
            My Anime List
          </h1>
        </Link>
        <Navbar />
      </article>
    </header>
  );
};
