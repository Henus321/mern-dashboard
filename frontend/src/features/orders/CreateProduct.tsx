import { useEffect } from "react";
import { Divider, notification, Tabs, Typography, Grid } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { reset, fetchProducts } from "../products/productsSlice";
import { brandTabs } from "../../configs";
import { ERROR_DURATION, BRANDS } from "../../constants";
import { useSearchParams } from "react-router-dom";

import CreateProductItems from "./CreateProductItems";
import Spinner from "../../components/Spinner";

const { useBreakpoint } = Grid;

const CreateProduct = () => {
  const { products, isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.products
  );
  const { lg } = useBreakpoint();
  const tabPosition = !lg ? "top" : "left";

  const [searchParams, setSearchParams] = useSearchParams();
  const brandParams = searchParams.get("brand");
  const brand = brandParams ? brandParams : BRANDS[0];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!brandParams) {
      setSearchParams({ brand });
    }

    dispatch(fetchProducts(brand));
    // eslint-disable-next-line
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

  const onTabChange = (brandTab: string) => {
    const newTabParams = brandTab ? { brand: brandTab } : "";
    setSearchParams(newTabParams);
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
                  <CreateProductItems />
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
