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
      response = await editAnimesLocalStorage(data);
      if (response.success) {
        navigate("/");
      }
      return;
    }
    console.log(data);

    // data.id = setDynamicId(data.title);
    // response = await postAnimesLocalStorage(data);
  };

  return (
    <section className="w-full flex items-center justify-center">
      <AnimeForm onSubmit={onSubmit} animeId={animeId} />
    </section>
  );
};
