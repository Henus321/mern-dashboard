import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { MailOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { MAX_40 } from "../../constants";

const CustomersModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          // initialValues={initialValues}
          layout="vertical"
          name="login-form"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email" },
              {
                type: "email",
                message: "Please enter a validate email!",
              },
              MAX_40,
            ]}
          >
            <Input
              className="rounded"
              name="email"
              size="large"
              placeholder="Your email"
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password" },
              MAX_40,
            ]}
          >
            <Input.Password
              className="rounded"
              name="password"
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="primary"
        size="large"
        className="rounded align-self-end m-submit-button"
        onClick={showModal}
      >
        Create New Customer <UserAddOutlined />
      </Button>
    </>
  );
};

export default CustomersModal;
