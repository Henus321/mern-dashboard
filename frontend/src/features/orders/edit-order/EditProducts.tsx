import { useState, useEffect } from "react";
import { Divider, notification, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchProducts, reset } from "../../products/productsSlice";
import { brandTabs } from "../../../configs";
import { IOrderProps } from "../../../models";
import { ERROR_DURATION } from "../../../constants";

import OrderProductItem from "../OrderProductItem";
import Spinner from "../../../components/Spinner";

const EditProducts: React.FC<IOrderProps> = ({ order }) => {
  const { products, isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.products
  );
  const [brand, setBrand] = useState(order.product.brand);

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }

    dispatch(fetchProducts(brand));
  }, [dispatch, brand, isError, message]);

  const onTabChange = (brand: string) => {
    dispatch(reset());
    setBrand(brand);
  };

  return (
    <>
      <Divider className="text-center" style={{ fontSize: "20px" }}>
        Pick a Product
      </Divider>
      {isLoading && <Spinner />}
      {products.length > 0 && (
        <Tabs
          activeKey={brand}
          tabPosition={"left"}
          onChange={(brand) => onTabChange(brand)}
          items={brandTabs.map((brandTab) => {
            return {
              label: brandTab.tab,
              key: brandTab.key,
              style: { display: "flex", flexWrap: "wrap" },
              children: <OrderProductItem />,
            };
          })}
        />
      )}
    </>
  );
};

export default EditProducts;
