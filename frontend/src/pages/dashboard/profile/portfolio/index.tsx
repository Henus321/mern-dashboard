import { useEffect, useMemo } from "react";
import { Button, Row, Form, Input, Col, notification, Grid } from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { reset, updateUser } from "@/store/profile-auth/profileAuthSlice";
import { IPortfolio } from "@/models";
import {
  COMMON_SUCCESS_MESSAGE,
  ERROR_DURATION,
  MAX_40,
  SUCCESS_DURATION,
} from "@/constants";

import { ProfileLayout } from "@/features/profile-auth";

const { TextArea } = Input;
const { useBreakpoint } = Grid;

const Portfolio = () => {
  const { user, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const [form] = Form.useForm();

  const { xl } = useBreakpoint();
  const spanFull = xl ? 12 : 24;
  const gutter = 12;

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

    if (isSuccess) {
      notification.success({
        message: "Success!",
        description: COMMON_SUCCESS_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [dispatch, isError, isSuccess, message]);

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
        <Row gutter={gutter}>
          <Col span={spanFull}>
            <Form.Item name="profession" label="Profession" rules={[MAX_40]}>
              <Input
                size="large"
                placeholder="Enter your profession"
                className="rounded"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={spanFull}>
            <Form.Item name="description" label="Description">
              <TextArea
                size="large"
                className="rounded"
                rows={8}
                placeholder="Maximum of 200 characters"
                maxLength={200}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={spanFull}>
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
                          size="large"
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
        <Row gutter={gutter}>
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
