import React from "react";
import { Typography } from "antd";
import { DesktopOutlined } from "@ant-design/icons";

const MobileReminder = () => {
  return (
    <div className="h-min-60vh flex flex-column align-center justify-center">
      <DesktopOutlined style={{ fontSize: "60px", margin: "15px 0" }} />
      <Typography.Paragraph className="mt-25 text-center py-12">
        <strong>Reminder:</strong> visit desktop version of the site for full
        functionality
      </Typography.Paragraph>
    </div>
  );
};

export default MobileReminder;
