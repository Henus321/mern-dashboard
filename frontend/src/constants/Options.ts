export const BRANDS = ["ferrari", "ford", "lamborghini", "porsche", "bmw"];

export const ASSEMBLY_OPTIONS = [
  {
    value: "sport",
    label: " Sport ",
  },
  {
    value: "luxury",
    label: " Luxury ",
  },
  {
    value: "comfort",
    label: " Comfort ",
  },
];

export const PAYMENT_OPTIONS = [
  {
    value: "immediate",
    label: "Immediate",
    children: [
      {
        value: "cash",
        label: "Cash",
      },
      {
        value: "banking",
        label: "Banking",
      },
    ],
  },
  {
    value: "leasing",
    label: "Leasing",
    children: [
      {
        value: "long",
        label: "Long",
      },
      {
        value: "medium",
        label: "Medium",
      },
      {
        value: "short",
        label: "Short",
      },
    ],
  },
  {
    value: "mortgage",
    label: "Mortgage",
    children: [
      {
        value: "constant",
        label: "Constant",
      },
      {
        value: "variable",
        label: "Variable",
      },
    ],
  },
];
