import { useState, useEffect } from "react";
import { Divider, notification, Tabs, Typography, Grid } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProducts, reset } from "../products/productsSlice";
import { brandTabs } from "../../configs";
import { IOrder } from "../../models";
import { ERROR_DURATION } from "../../constants";

import EditProductItems from "./EditProductItems";
import Spinner from "../../components/Spinner";

const { useBreakpoint } = Grid;

const EditProduct = ({ order }: { order: IOrder }) => {
  const { products, isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.products
  );
  const [brand, setBrand] = useState(order.product.brand);

  const { lg } = useBreakpoint();
  const tabPosition = !lg ? "top" : "left";

  const dispatch = useAppDispatch();

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
    setBrand(brand);
  };

  return (
    <>
      <Divider className="text-center" style={{ fontSize: "20px" }}>
        Pick a Product
      </Divider>
      {isLoading ? (
        <Spinner />
      ) : (
        <Tabs
          className="tabs-container"
          activeKey={brand}
          tabPosition={tabPosition}
          onChange={(brand) => onTabChange(brand)}
          items={brandTabs.map((brandTab) => {
            return {
              label: brandTab.tab,
              key: brandTab.key,
              style: {
                display: "flex",
                flexWrap: "wrap",
                height: "100%",
              },
              children:
                products.length > 0 ? (
                  <EditProductItems />
                ) : (
                  <div className="m-auto">
                    <Typography.Paragraph className="text-center">
                      Woops! No Products Found...
                    </Typography.Paragraph>
                  </div>
                ),
            };
          })}
        />
      )}
    </>
  );
};

export default EditProduct;
