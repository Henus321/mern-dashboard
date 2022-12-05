import React, { useEffect, useMemo } from "react";
import { Button, Row, Form, Input, Col } from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import ProfileHeader from "./ProfileHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Spinner from "../../components/Spinner";
import { fetchUser, reset, updateUser } from "./profileSlice";
import { IPortfolio } from "../../models/IUser";

const { TextArea } = Input;

const Portfolio = () => {
  const { user, isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.profile
  );
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      ...user?.portfolio,
    };
  }, [user]);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUser());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (user && isError) {
      form.setFieldsValue(initialValues);
      dispatch(reset());
    }
  }, [dispatch, user, isError, form, initialValues]);

  const onSave = (values: IPortfolio) => {
    dispatch(updateUser({ portfolio: values }));

    dispatch(reset());
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
            layout="vertical"
            onFinish={onSave}
            initialValues={initialValues}
          >
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="profession" label="Profession">
                  <Input className="rounded" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="description" label="Description">
                  <TextArea
                    className="rounded"
                    rows={8}
                    placeholder="Maximum of 200 characters"
                    maxLength={200}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.List name="examples">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          label={index === 0 ? "Example" : ""}
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Please input example or delete this field.",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              addonBefore="https://"
                              addonAfter={
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                              }
                              placeholder="example"
                            />
                          </Form.Item>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          className="rounded"
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: "100%" }}
                        >
                          Add Example <strong>+</strong>
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
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
                  htmlType="submit"
                  size="large"
                  type="primary"
                  className="rounded"
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

export default Portfolio;
