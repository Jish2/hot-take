export function remove(value, array) {
  return array.filter((item) => {
    return item !== value;
  });
}

export const handleError = (err) => {
  console.error(err);
  return;
};
