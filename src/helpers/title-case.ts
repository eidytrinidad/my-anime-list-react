export function titleCase(value: string) {
  const title = value
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
  return title;
}
