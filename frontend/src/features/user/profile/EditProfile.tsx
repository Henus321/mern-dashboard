import React, { useEffect, useMemo } from "react";
import { Button, Row, Form, Input, Col } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { fetchUser, updateUser, reset } from "../userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IUser } from "../../../models/IUser";
import { useNavigate } from "react-router-dom";
import { DEFAULT_UNAUTHORIZED_USER_ROUTE } from "../../../constants/Routes";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../../../components/Spinner";

const { TextArea } = Input;

const EditProfile = () => {
  const { user, isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.user
  );
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = useMemo(() => {
    return {
      ...user,
    };
  }, [user]);

  useEffect(() => {
    if (isSuccess && !user) {
      navigate(DEFAULT_UNAUTHORIZED_USER_ROUTE);
    }

    if (!isSuccess) {
      dispatch(fetchUser());
    }
  }, [dispatch, navigate, isSuccess, user]);

  useEffect(() => {
    if (user && isError) {
      form.setFieldsValue(initialValues);
      dispatch(reset());
    }
  }, [dispatch, user, isError, form, initialValues]);

  const onSave = (formFields: IUser) => {
    dispatch(updateUser(formFields));
  };

  const onCancel = () => {
    form.setFieldsValue(initialValues);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && user && (
        <>
          <ProfileHeader user={user} />
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
                    { required: true, message: "Please input your name" },
                  ]}
                >
                  <Input className="rounded" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="username" label="Username">
                  <Input className="rounded" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email" },
                  ]}
                >
                  <Input className="rounded" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="company" label="Company">
                  <Input className="rounded" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item name="phone" label="Phone Number">
                  <Input className="rounded" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="website" label="Website">
                  <Input className="rounded" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="address" label="Address">
                  <Input className="rounded" />
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
                <Button
                  onClick={() => onCancel()}
                  size="large"
                  className="rounded"
                >
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
        </>
      )}
    </>
  );
};

export default EditProfile;
