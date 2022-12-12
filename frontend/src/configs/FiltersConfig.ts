import { brands } from "../constants/Options";
import { capitalizeText } from "../helpers/helpers";

export const brandFilters = [
  ...brands.map((brand) => {
    return { text: capitalizeText(brand), value: capitalizeText(brand) };
  }),
];
