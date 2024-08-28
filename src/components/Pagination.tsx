import paginationArrow from "../assets/arrow.svg";
import { IPagination } from "../interfaces";
import { useEffect, useState } from "react";

type PaginationProps = {
  paginacion: IPagination;
  onHandlePageChange: (page: number) => void;
};

const Pagination = ({ paginacion, onHandlePageChange }: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  const pagination = () => {
    let pageList = Array(paginacion.totalPaginas)
      .fill(0)
      .map((_, i) => i + 1);
    setPages(pageList);
  };

  const handlePageChange = (page: number) => {
    onHandlePageChange(page);
  };

  const handleChangePageLeft = () => {
    if (paginacion.numeroPagina >= paginacion.totalPaginas) {
      onHandlePageChange(paginacion.numeroPagina - 1);
    }
  };
  const handleChangePageRight = () => {
    if (paginacion.numeroPagina < paginacion.totalPaginas) {
      onHandlePageChange(paginacion.numeroPagina + 1);
    }
  };

  useEffect(() => {
    pagination();
  }, [paginacion]);

  return (
    <section className="w-full mb-3 flex justify-center">
      <article className="flex justify-between max-h-24 max-w-xs md:max-w-md md:max-h-32">
        <img
          src={paginationArrow}
          alt="arrow"
          className={`w-5 cursor-pointer ${
            paginacion.numeroPagina === 1 ? "opacity-40" : ""
          }`}
          onClick={() => handleChangePageLeft()}
        />
        <ul>
          <li className="flex flex-wrap justify-center overflow-auto no-scrollbar gap-y-2">
            {pages.map((_, i) => (
              <span
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 block text-center ${
                  paginacion.numeroPagina === i + 1
                    ? "pagination-btn-secondary"
                    : "pagination-btn-primary"
                }`}
                key={i}
              >
                {i + 1}
              </span>
            ))}
          </li>
        </ul>
        <img
          onClick={() => handleChangePageRight()}
          src={paginationArrow}
          alt="arrow"
          className={`w-5 cursor-pointer rotate-180 ${
            paginacion.numeroPagina === paginacion.totalPaginas
              ? "opacity-40"
              : ""
          }`}
        />
      </article>
    </section>
  );
};

export default Pagination;
