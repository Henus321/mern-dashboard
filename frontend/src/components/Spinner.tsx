import { Spin } from "antd";

export const Spinner = () => {
  return (
    <Spin
      tip="Loading..."
      size="large"
      className="m-auto w-full h-full flex flex-column justify-center align-center"
    />
  );
};
