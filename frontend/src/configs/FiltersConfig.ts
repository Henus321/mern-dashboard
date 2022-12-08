import { brands } from "../constants/Brands";
import { capitalizeText } from "../helpers/helpers";

export const brandFilters = [
  ...brands.map((brand) => {
    return { text: capitalizeText(brand), value: capitalizeText(brand) };
  }),
];
