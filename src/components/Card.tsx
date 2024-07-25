type CardProps = {
  children: React.ReactNode;
  update: (id: string) => void;
  delete: (id: string) => void;
  id: string;
};
export const Card = ({ children }: CardProps) => {
  return (
    <article className="w-60 mb-7 card-shadow md:w-52 relative">
      {children}

      <hr />
      <div className="flex justify-between items-center p-3 bg-white">
        <button className="btn-secondary" >Editar</button>
        <button className="btn-red" >Borrar</button>
      </div>
    </article>
  );
};
