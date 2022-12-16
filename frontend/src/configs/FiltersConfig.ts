import { BRANDS } from "../constants";
import { capitalizeText } from "../helpers";

export const brandFilters = [
  ...BRANDS.map((brand) => {
    return { text: capitalizeText(brand), value: capitalizeText(brand) };
  }),
];
