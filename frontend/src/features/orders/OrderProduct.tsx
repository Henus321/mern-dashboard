import { useState, useEffect } from "react";
import { Divider, notification, Typography, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, reset } from "../products/productsSlice";
import { brandTabs } from "../../configs";
import { ERROR_DURATION } from "../../constants";
import { getOrderProductBrand } from "../../utils";
import { IOrder } from "../../models";

import OrderProductItem from "./OrderProductItem";
import Spinner from "../../components/Spinner";

interface Props {
  order?: IOrder;
}

const OrderProduct: React.FC<Props> = ({ order }) => {
  const { product, products, isSuccess, isLoading, isError, message } =
    useAppSelector((state) => state.products);
  const [prefilledBrand, setPrefilledBrand] = useState(order?.product.brand);
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParams = searchParams.get("brand");

  const dispatch = useAppDispatch();

  const brand = getOrderProductBrand(brandParams, prefilledBrand);

  useEffect(() => {
    dispatch(fetchProducts(brand));
  }, [dispatch, brand]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      dispatch(reset());
    }
  }, [dispatch, isError, message]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  const onTabChange = (brand: string) => {
    // create-order case
    if (brandParams) setSearchParams({ brand });
    // edit-order case
    if (!brandParams) setPrefilledBrand(brand);
  };

  return (
    <>
      <Divider className="text-center" style={{ fontSize: "20px" }}>
        Pick a Product
      </Divider>
      <Card
        bordered={false}
        bodyStyle={{
          padding: "0",
          display: "flex",
          flexWrap: "wrap",
          minHeight: "250px",
        }}
        activeTabKey={brand}
        tabList={brandTabs}
        onTabChange={(brand) => onTabChange(brand)}
      >
        {isLoading && <Spinner />}
        {!isLoading &&
          products.length > 0 &&
          products.map((currentProduct) => (
            <OrderProductItem
              key={currentProduct.name}
              currentProduct={currentProduct}
              prefilledActiveProductId={product}
            />
          ))}
        {!isLoading && products.length === 0 && (
          <div className="flex flex-column w-full h-full m-auto">
            <Typography.Title level={2} className="text-center">
              No Products Found
            </Typography.Title>
            <Typography.Paragraph className="text-center">
              Something went wrong...
            </Typography.Paragraph>
          </div>
        )}
      </Card>
    </>
  );
};

export default OrderProduct;
