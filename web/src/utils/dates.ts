export const dateToString = (d: Date) => {
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

export const dateToStringYMD = (d: Date) => {
  console.log(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  return `${d.getFullYear()}-${
    d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
  }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
};
