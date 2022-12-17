import { useState, useEffect } from "react";
import { Divider, notification, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { reset, fetchProducts, setProduct } from "../products/productsSlice";
import { brandTabs } from "../../configs";
import { ERROR_DURATION, BRANDS } from "../../constants";
import { useSearchParams } from "react-router-dom";

import OrderProductItem from "./OrderProductItem";
import Spinner from "../../components/Spinner";

const CreateProducts = () => {
  const { products, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const brandParams = searchParams.get("brand") && searchParams.get("brand");
  const initialBrand = brandParams ? brandParams : BRANDS[0];
  const [brand, setBrand] = useState(initialBrand);

  const initialProduct = searchParams.get("product");

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

    if (initialProduct) {
      dispatch(setProduct(initialProduct));
    }

    dispatch(fetchProducts(brand));
  }, [dispatch, brand, initialProduct, isError, message]);

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
