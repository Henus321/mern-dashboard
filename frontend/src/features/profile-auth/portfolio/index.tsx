import React, { useEffect, useMemo } from "react";
import { Button, Row, Form, Input, Col, notification } from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { reset, updateUser } from "../profileAuthSlice";
import { IPortfolio } from "../../../models";
import { ERROR_DURATION, MAX_40 } from "../../../constants";

import ProfileLayout from "../ProfileLayout";

const { TextArea } = Input;

const Portfolio = () => {
  const { user, isError, message } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      ...user?.portfolio,
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
    // eslint-disable-next-line
  }, [dispatch, isError, message]);

  const onFinish = (values: IPortfolio) => {
    dispatch(updateUser({ portfolio: values }));
  };

  const onCancel = () => {
    form.setFieldsValue(initialValues);
  };

  return (
    <ProfileLayout>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="profession" label="Profession" rules={[MAX_40]}>
              <Input placeholder="Enter your profession" className="rounded" />
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
                          {
                            type: "url",
                            message: "Please enter valid url.",
                          },
                          { type: "string", max: 100 },
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
                          placeholder="www.website.com"
                        />
                      </Form.Item>
                    </Form.Item>
                  ))}
                  {fields.length <= 9 && (
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
                  )}
                </>
              )}
            </Form.List>
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
    </ProfileLayout>
  );
};

export default Portfolio;
