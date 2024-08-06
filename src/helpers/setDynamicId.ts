export function setDynamicId(title: string) {
  const id =
    title.toString().toLowerCase().replaceAll(" ", "") +
    Math.floor(Math.random() * 10000);
  return id;
}
