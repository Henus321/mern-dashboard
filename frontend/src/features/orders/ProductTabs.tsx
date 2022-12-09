import { useState, useEffect } from "react";
import { Card, Typography, Image, Divider, Tabs } from "antd";
import Spinner from "../../components/Spinner";
import { beautifyCost } from "../../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "../products/productsSlice";
import { brandTabs } from "../../configs/TabsConfig";

const { TabPane } = Tabs;

const gridStyle: React.CSSProperties = {
  width: "25%",
  display: "flex",
  flexDirection: "column",
};

const ProductTabs = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);
  const [brand, setBrand] = useState("");

  const onTabChange = (brand: string) => {
    setBrand(brand);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(brand));
  }, [dispatch, brand]);

  // const [pick, setPick] = useState("");

  // const isHovered = (product: string) => {
  //   return product === pick
  //     ? { boxShadow: "3px 3px 3px 0 rgba(0,0,0,0.5)" }
  //     : {};
  // };
  // console.log(pick);
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
        >
          {brandTabs.map((brandTab) => (
            <TabPane
              style={{ display: "flex", flexWrap: "wrap" }}
              tab={brandTab.tab}
              key={brandTab.key}
            >
              {products.map((product) => (
                <Card.Grid hoverable key={product.name} style={gridStyle}>
                  <Typography.Title
                    level={5}
                    className="text-center"
                    style={{ marginBottom: 0 }}
                  >
                    {product.name}
                  </Typography.Title>
                  <Typography.Paragraph
                    className="text-center"
                    style={{ marginBottom: "5px" }}
                  >
                    {product.type}
                  </Typography.Paragraph>
                  <Image
                    preview={false}
                    key={product.photoUrl[0]}
                    width="100%"
                    style={{ objectFit: "cover" }}
                    src={product.photoUrl[0]}
                  />
                  <Typography.Title
                    level={5}
                    className="text-center"
                    style={{ marginBottom: 0 }}
                  >
                    {beautifyCost(product.cost)}
                  </Typography.Title>
                </Card.Grid>
              ))}
            </TabPane>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default ProductTabs;
