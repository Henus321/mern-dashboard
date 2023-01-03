import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { LEN_11, MAX_100, MAX_20, ONLY_NUMBERS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clearCustomer,
  createCustomer,
  updateCustomer,
} from "./customersSlice";

const CustomersModal = () => {
  const { customer } = useAppSelector((state) => state.customers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer);
      setIsModalOpen(true);
    }
  }, [customer, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    if (customer) {
      dispatch(clearCustomer());
    }
  };

  const onFinish = () => {
    if (customer) {
      const newCustomer = { ...form.getFieldsValue(), _id: customer._id };
      dispatch(updateCustomer(newCustomer));
      dispatch(clearCustomer());
    }
    if (!customer) {
      const newCustomer = form.getFieldsValue();
      dispatch(createCustomer(newCustomer));
    }
  };

  return (
    <>
      <Modal
        title={customer ? "Edit Customer" : "Create New Customer"}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="customers-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name" }, MAX_20]}
          >
            <Input className="rounded" size="large" placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please input phone" },
              LEN_11,
              ONLY_NUMBERS,
            ]}
            name="phone"
            label="Phone Number"
          >
            <Input placeholder="89031234567" className="rounded" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email" },
              {
                type: "email",
                message: "Please enter a validate email!",
              },
              MAX_20,
            ]}
          >
            <Input className="rounded" size="large" placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="social"
            label="Social Network"
            rules={[
              { required: true, message: "Please input social network" },
              { type: "url" },
              MAX_100,
            ]}
          >
            <Input
              className="rounded"
              size="large"
              placeholder="www.website.com"
            />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please input name" }, MAX_20]}
          >
            <Input
              className="rounded"
              size="large"
              placeholder="Enter city name"
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
