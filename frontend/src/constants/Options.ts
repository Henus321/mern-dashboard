export const BRANDS = ["ferrari", "ford", "lamborghini", "porsche", "bmw"];

export const BUILD_OPTIONS = [
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
    value: "instant",
    label: "Instant",
    children: [
      {
        value: "cash",
        label: "Cash",
      },
      {
        value: "bank",
        label: "Bank",
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
        value: "fixed",
        label: "Fixed",
      },
      {
        value: "extend",
        label: "Extend",
      },
    ],
  },
];
