import { Breadcrumb } from "antd";
import { useLocation, useParams } from "react-router-dom";

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

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbItems.map((item) => (
        <Breadcrumb.Item key={`${item}`}>
          {formatBreadcrumbTitle(item)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbMenu;
