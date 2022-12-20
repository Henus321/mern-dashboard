import React, { useEffect, useMemo } from "react";
import { Button, Row, Form, Input, Col, notification } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { updateUser, reset } from "../profileAuthSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IUser } from "../../../models";
import {
  COMMON_SUCCESS_MESSAGE,
  ERROR_DURATION,
  MAX_100,
  MAX_40,
  SUCCESS_DURATION,
} from "../../../constants";

import ProfileLayout from "../ProfileLayout";

const { TextArea } = Input;

const EditProfile = () => {
  const { user, isError, isModified, message } = useAppSelector(
    (state) => state.auth
  );
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      ...user,
    };
  }, [user]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      form.setFieldsValue(initialValues);
      dispatch(reset());
    }

    if (isModified) {
      notification.success({
        message: "Success!",
        description: COMMON_SUCCESS_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [dispatch, isError, isModified, message]);

  const onSave = (formFields: IUser) => {
    dispatch(updateUser(formFields));
  };

  const onCancel = () => {
    form.setFieldsValue(initialValues);
  };

  return (
    <ProfileLayout>
      <Form
        form={form}
        onFinish={onSave}
        initialValues={initialValues}
        layout="vertical"
      >
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
                MAX_40,
              ]}
            >
              <Input placeholder="Enter name" className="rounded" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="username" label="Username" rules={[MAX_40]}>
              <Input placeholder="Enter username" className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              rules={[
                {
                  len: 11,
                  message: "A phone number must be exactly 11 characters!",
                },
              ]}
              name="phone"
              label="Phone Number"
            >
              <Input placeholder="89031234567" className="rounded" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="website"
              label="Website"
              rules={[{ type: "url" }, { type: "string", max: 40 }]}
            >
              <Input placeholder="www.website.com" className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="company" label="Company" rules={[MAX_40]}>
              <Input placeholder="Enter company name" className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="address" label="Address" rules={[MAX_100]}>
              <Input placeholder="Enter your address" className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="about" label="About">
              <TextArea
                className="rounded"
                rows={6}
                placeholder="Maximum of 200 characters"
                maxLength={200}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col>
            <Button onClick={() => onCancel()} size="large" className="rounded">
              Cancel <CloseOutlined />
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              type="primary"
              className="rounded"
              htmlType="submit"
            >
              Save <SaveOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </ProfileLayout>
  );
};

export default EditProfile;
