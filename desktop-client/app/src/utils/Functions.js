import { differenceInDays, differenceInMonths } from "date-fns";

//! Get Patient Age
export const getPatientAge = (ag, bd) => {
  if (ag <= 0) {
    let date = new Date(bd);
    const Months = differenceInMonths(new Date(), date);
    const Days = differenceInDays(new Date(), date);
    if (Days > 31) {
      return `${Months} ${Months > 1 ? "Meses" : "Mes"}`;
    } else {
      return `${Days} ${Days > 1 ? "Días" : "Día"}`;
    }
  } else {
    return `${ag} ${ag > 1 ? "años" : "año"}`;
  }
};
