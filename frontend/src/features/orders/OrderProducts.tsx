import { useState, useEffect } from "react";
import { Divider, Tabs } from "antd";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearProduct, fetchProducts } from "../products/productsSlice";
import { brandTabs } from "../../configs/TabsConfig";
import ProductItem from "./OrderProductItem";

const OrderProducts = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);
  const [brand, setBrand] = useState(brandTabs[0].key);

  const onTabChange = (brand: string) => {
    setBrand(brand);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(brand));
    dispatch(clearProduct());
  }, [dispatch, brand]);

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
              children: <ProductItem />,
            };
          })}
        />
      )}
    </>
  );
};

export default OrderProducts;
