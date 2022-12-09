import { useState, useEffect } from "react";
import { Divider, Tabs } from "antd";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "../products/productsSlice";
import { brandTabs } from "../../configs/TabsConfig";
import OrderModel from "./OrderModel";

const gridStyle: React.CSSProperties = {
  width: "25%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
};

const OrderProducts = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);
  const [brand, setBrand] = useState(brandTabs[0].key);
  const [pick, setPick] = useState("");

  const onTabChange = (brand: string) => {
    setBrand(brand);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(brand));
    setPick("");
  }, [dispatch, brand]);

  const isHovered = (product: string) => {
    return product === pick
      ? {
          ...gridStyle,
          boxShadow:
            "0 1px 2px -2px rgb(0 0 0 / 22%), 0 3px 6px 0 rgb(0 0 0 / 30%)",
        }
      : { ...gridStyle };
  };

  return (
    <>
      <Divider style={{ fontSize: "20px", textAlign: "center" }}>
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
              children: <OrderModel props={{ isHovered, setPick }} />,
            };
          })}
        />
      )}
    </>
  );
};

export default OrderProducts;
