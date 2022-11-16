export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const breadcrumbRouteCreator = (
  breadcrumbItems: string[],
  index: number
) =>
  `/${breadcrumbItems
    .slice()
    .splice(0, index + 1)
    .join("/")}`;
