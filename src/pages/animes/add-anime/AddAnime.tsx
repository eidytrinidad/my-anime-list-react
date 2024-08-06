import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  editAnimesLocalStorage,
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
      response = await editAnimesLocalStorage(formData);
      if (response.success) {
        navigate("/");
      }
      return;
    }
    const formData = { ...data, id: setDynamicId(data.title) };
    response = await postAnimesLocalStorage(formData);
    if (response?.success) {
      navigate("/");
    }
  };

  return (
    <section className="w-full flex items-center justify-center">
      <AnimeForm onSubmit={onSubmit} animeId={animeId} />
    </section>
  );
};
