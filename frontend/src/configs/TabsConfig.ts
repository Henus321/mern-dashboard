import { brands } from "../constants/Brands";
import { capitalizeText } from "../helpers/helpers";

export const brandTabs = [
  ...brands.map((brand) => {
    return { key: brand, tab: capitalizeText(brand) };
  }),
];

export const brandTabsWithNoFilter = [
  {
    key: "",
    tab: "No Filter",
  },
  ...brandTabs,
];
