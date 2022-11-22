import { Spin } from "antd";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-full">
      <Spin tip="Loading..." size="large" className="m-auto" />
    </div>
  );
};

export default Spinner;
