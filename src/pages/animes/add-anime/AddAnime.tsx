import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  editAnimesDB,
  editAnimesLocalStorage,
  postAnimesDB,
  postAnimesLocalStorage,
} from "../../../services";

import { setDynamicId } from "../../../helpers";
import AnimeForm from "../../../components/AnimeForm";
import { IAnime } from "../../../interfaces";

export const AddAnime = () => {
  let { animeId } = useParams();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IAnime> = async (data) => {
    let response;

    if (animeId) {
      const formData = { ...data, id: animeId };
      response = await editAnimesDB(formData);

      if (response?.status === 200) {
        navigate("/");
      }

      return;
    }
    const formData = { ...data, id: setDynamicId(data.title) };
    response = await postAnimesDB(formData);
    console.log(response);

    if (response?.ok) {
      navigate("/");
    }
  };

  return (
    <section className="w-full flex items-center justify-center">
      <AnimeForm onSubmit={onSubmit} animeId={animeId} />
    </section>
  );
};
