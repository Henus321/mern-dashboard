import { brands } from "../constants/Brands";
import { capitalizeText } from "../helpers/helpers";

export const brandTabs = [
  {
    key: "",
    tab: "No Filter",
  },
  ...brands.map((brand) => {
    return { key: brand, tab: capitalizeText(brand) };
  }),
];
