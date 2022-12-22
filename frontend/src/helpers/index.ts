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
