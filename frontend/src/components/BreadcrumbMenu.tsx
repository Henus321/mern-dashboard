import { Breadcrumb } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";

const BreadcrumbMenu = () => {
  const location = useLocation();
  const params = useParams();

  const breadcrumbItems: string[] = location.pathname
    .split("/")
    .filter((item) => item !== "" && !Object.values(params).includes(item));

  const formatBreadcrumbTitle = (string: string) =>
    string
      .split("-")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");

  const breadcrumbRouteCreator = (breadcrumbItems: string[], index: number) =>
    `/${breadcrumbItems
      .slice()
      .splice(0, index + 1)
      .join("/")}`;

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={`${item}`}>
          {index > 0 ? (
            <Link to={breadcrumbRouteCreator(breadcrumbItems, index)}>
              {formatBreadcrumbTitle(item)}
            </Link>
          ) : (
            formatBreadcrumbTitle(item)
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbMenu;
