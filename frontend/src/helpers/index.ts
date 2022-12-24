export const beautifyCost = (cost: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return formatter.format(cost);
};

export const capitalizeText = (string: string) => {
  if (string.length <= 3) return string.toUpperCase();

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const gridWidth = (
  xs: boolean | undefined,
  sm: boolean | undefined,
  lg: boolean | undefined
) => {
  if (lg) return "33.33333%";
  if (sm) return "50%";
  if (xs) return "100%";
};
