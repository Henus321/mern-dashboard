import { BRANDS } from "@/constants";
import { capitalizeText } from "@/utils";

export const brandTabs = [
  ...BRANDS.map((brand) => {
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
