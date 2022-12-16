import { useState, useEffect } from "react";
import { Divider, notification, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { reset, fetchProducts } from "../../products/productsSlice";
import { brandTabs } from "../../../configs";
import { ERROR_DURATION } from "../../../constants";

import OrderProductItem from "../OrderProductItem";
import Spinner from "../../../components/Spinner";

const CreateProducts = () => {
  const { products, isLoading, isError, message } = useAppSelector(
    (state) => state.products
  );
  const [brand, setBrand] = useState(brandTabs[0].key);

  const dispatch = useAppDispatch();
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
      {!isLoading && products && (
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

export default CreateProducts;
