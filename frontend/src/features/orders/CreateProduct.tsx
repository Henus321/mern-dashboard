import { useEffect } from "react";
import { Divider, notification, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { reset, fetchProducts } from "../products/productsSlice";
import { brandTabs } from "../../configs";
import { ERROR_DURATION, BRANDS } from "../../constants";
import { useSearchParams } from "react-router-dom";

import CreateProductItem from "./CreateProductItem";
import Spinner from "../../components/Spinner";

const CreateProduct = () => {
  const { products, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const brandParams = searchParams.get("brand") && searchParams.get("brand");
  const brand = brandParams ? brandParams : BRANDS[0];

  const productParams = searchParams.get("product");
  const initialProduct = productParams && { product: productParams };

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

    const params = initialProduct ? { brand, ...initialProduct } : { brand };
    setSearchParams(params);

    dispatch(fetchProducts(brand));
    // eslint-disable-next-line
  }, [dispatch, brand, isError, message]);

  const onTabChange = (brandTab: string) => {
    dispatch(reset());

    const params = brandTab ? { brand: brandTab } : "";
    setSearchParams(params);
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
          onChange={(brandTab) => onTabChange(brandTab)}
          items={brandTabs.map((brandTab) => {
            return {
              label: brandTab.tab,
              key: brandTab.key,
              style: { display: "flex", flexWrap: "wrap" },
              children: <CreateProductItem />,
            };
          })}
        />
      )}
    </>
  );
};

export default CreateProduct;
