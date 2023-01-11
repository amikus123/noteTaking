import dayjs from "dayjs";
export const textToDate = (str: string): Date | undefined => {
  if (str === "") return undefined;
  return dayjs(str, "DD/MM/YYYY").toDate();
};
