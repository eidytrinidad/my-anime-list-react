import { Confirm } from "notiflix";

export function showConfirm(
  title: string,
  message = "¿Estás seguro que deseas realizar esta acción?"
) {
  return new Promise<void>((resolve, reject) =>
    Confirm.show(
      title,
      message,
      "Sí",
      "No",
      () => resolve(),
      () => reject()
    )
  );
}
