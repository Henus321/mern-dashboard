import React, { useEffect, useMemo } from "react";
import { Button, Row, Form, Input, Col } from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import ProfileHeader from "./ProfileHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Spinner from "../../components/Spinner";
import {
  fetchUser,
  updatePortfolio,
  createPortfolio,
  reset,
} from "./profileSlice";
import { IPortfolio } from "../../models/IUser";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 0 },
  },
};

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
  console.log(user);
  useEffect(() => {
    if (!isSuccess) {
      console.log("fetch");
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
    if (user && user.portfolio) dispatch(updatePortfolio(values));
    if (user && !user.portfolio) dispatch(createPortfolio(values));

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
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
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
                          {...(index === 0
                            ? formItemLayout
                            : formItemLayoutWithOutLabel)}
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
                          Add Example <PlusOutlined />
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
