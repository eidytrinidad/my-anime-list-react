import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="text-primary font-bold text-4xl">Oops!</h1>
      <p className="font-semibold my-4 text-lg">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
