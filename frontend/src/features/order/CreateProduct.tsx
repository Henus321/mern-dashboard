import { useEffect } from "react";
import { Divider, notification, Tabs, Typography, Grid } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { reset, fetchProducts } from "../products/productsSlice";
import { brandTabs } from "../../configs";
import { ERROR_DURATION, BRANDS } from "../../constants";
import { useSearchParams } from "react-router-dom";

import CreateProductItem from "./CreateProductItem";
import Spinner from "../../components/Spinner";

const { useBreakpoint } = Grid;

const CreateProduct = () => {
  const { products, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.products
  );

  const { lg } = useBreakpoint();
  const tabPosition = !lg ? "top" : "left";

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
    if (!isSuccess) {
      const params = initialProduct ? { brand, ...initialProduct } : { brand };
      setSearchParams(params);

      dispatch(fetchProducts(brand));
    }
    // eslint-disable-next-line
  }, [dispatch, brand, isSuccess]);

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
      {isLoading ? (
        <Spinner />
      ) : (
        <Tabs
          className="tabs-container"
          activeKey={brand}
          tabPosition={tabPosition}
          onChange={(brandTab) => onTabChange(brandTab)}
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
                  <CreateProductItem />
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

export default CreateProduct;
