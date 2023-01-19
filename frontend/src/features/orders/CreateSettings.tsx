import {
  Form,
  Select,
  DatePicker,
  Radio,
  Cascader,
  Divider,
  Button,
  Card,
  notification,
} from "antd";
import { CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  PAYMENT_OPTIONS,
  BUILD_OPTIONS,
  ERROR_DURATION,
  PICK_MESSAGE,
  ORDERS_ROUTE,
} from "../../constants";
import { fetchCustomers } from "../customers/customersSlice";
import { createOrder } from "./ordersSlice";
import { disabledDate, setSelectOptions } from "../../utils";

const CreateSettings = () => {
  const { isLoading: ordersIsLoading } = useAppSelector(
    (state) => state.orders
  );
  const { customers, isLoading } = useAppSelector((state) => state.customers);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelect = (e: React.SyntheticEvent<HTMLFormElement, Event>) => {
    const target = e.target as HTMLFormElement;
    if (target.id === "customer") {
      dispatch(fetchCustomers());
    }
  };

  const onFinish = (values: any, product: string | null) => {
    if (!product) {
      notification.error({
        message: "Error!",
        description: PICK_MESSAGE,
        duration: ERROR_DURATION,
      });
      return;
    }

    const newOrder = { ...values, product };
    dispatch(createOrder(newOrder));
  };

  const onClick = () => {
    navigate(ORDERS_ROUTE);
  };

  return (
    <>
      <Divider className="text-center" style={{ fontSize: "20px" }}>
        Specify the Settings
      </Divider>
      <Card
        bordered={false}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Form
          disabled={ordersIsLoading}
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onSelect={(e) => onSelect(e)}
          onFinish={(values) => onFinish(values, product)}
        >
          <Form.Item
            rules={[{ required: true, message: "Please choose a customer!" }]}
            name="customer"
            label="Customer"
          >
            <Select loading={isLoading} options={setSelectOptions(customers)} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please select an build!" }]}
            name="build"
            label="Build"
          >
            <Radio.Group options={BUILD_OPTIONS} name="build" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please choose a payment method!" },
            ]}
            name="payment"
            label="Payment"
          >
            <Cascader options={PAYMENT_OPTIONS} />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please choose the delivery date!" },
            ]}
            name="delivery"
            label="Delivery"
          >
            <DatePicker disabledDate={disabledDate} format={"DD/MM/YYYY"} />
          </Form.Item>
          <div className="flex justify-between">
            <Button
              loading={ordersIsLoading}
              size="large"
              danger
              ghost
              className="rounded mt-30"
              onClick={() => onClick()}
            >
              <ArrowLeftOutlined /> Back to Orders
            </Button>
            <Button
              loading={ordersIsLoading}
              htmlType="submit"
              size="large"
              type="primary"
              className="rounded mt-30"
            >
              Submit <CheckOutlined />
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default CreateSettings;
