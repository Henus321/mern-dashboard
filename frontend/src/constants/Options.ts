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
    value: "leasing",
    label: "Leasing",
    children: [
      {
        value: "banking",
        label: "Banking",
      },
      {
        value: "cash",
        label: "Cash",
      },
    ],
  },
  {
    value: "immediate",
    label: "Immediate",
    children: [
      {
        value: "banking",
        label: "Banking",
      },
      {
        value: "cash",
        label: "Cash",
      },
    ],
  },
];
