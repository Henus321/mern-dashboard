export const brands = ["ferrari", "ford", "lamborghini", "porsche", "bmw"];

export const assemblyOptions = [
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

export const paymentOptions = [
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
