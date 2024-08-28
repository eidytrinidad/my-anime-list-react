import paginationArrow from "../assets/arrow.svg";

const Pagination = () => {
  return (
    <section className="w-full mb-3 flex justify-center">
      <article className="flex justify-between max-h-24 max-w-xs md:max-w-md md:max-h-32">
        <img src={paginationArrow} alt="arrow" className="w-5 cursor-pointer" />
        <ul className="flex flex-wrap justify-center overflow-auto no-scrollbar gap-y-2">
          <li>
            <span className="mx-1 block text-center pagination-btn-primary">
              1
            </span>
          </li>
        </ul>
        <img
          src={paginationArrow}
          alt="arrow"
          className="w-5 cursor-pointer rotate-180"
        />
      </article>
    </section>
  );
};

export default Pagination;
