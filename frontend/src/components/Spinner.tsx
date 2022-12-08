import { Spin } from "antd";
import React from "react";

const Spinner = () => {
  return (
    <Spin
      tip="Loading..."
      size="large"
      className="m-auto w-full h-full flex flex-column justify-center align-center"
    />
  );
};

export default Spinner;
