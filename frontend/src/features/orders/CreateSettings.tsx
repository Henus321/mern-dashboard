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
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCustomers } from "../customers/customersSlice";
import { paymentOptions, assemblyOptions } from "../../constants/Options";
import { ICustomer } from "../../models/customers";
import { RangePickerProps } from "antd/lib/date-picker";
import { ERROR_DURATION, PICK_MESSAGE } from "../../constants/Notifications";
import { createOrder } from "./ordersSlice";
import moment from "moment";
import dayjs from "dayjs";

const CreateSettings = () => {
  const { isLoading: ordersIsLoading } = useAppSelector(
    (state) => state.orders
  );
  const { customers, isLoading } = useAppSelector((state) => state.customers);
  const { product } = useAppSelector((state) => state.products);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelect = (e: React.SyntheticEvent<HTMLFormElement, Event>) => {
    const target = e.target as HTMLFormElement;
    if (target.id === "customer") {
      dispatch(fetchCustomers());
    }
  };

  const setOptions = (values: ICustomer[]) => {
    return values.map((value) => {
      return {
        value: value._id,
        label: value.name,
      };
    });
  };

  const getCurrentTime = () => moment(new Date());

  const disabledDate: RangePickerProps["disabledDate"] = (current) =>
    current && current < dayjs().endOf("day");

  const onFinish = (values: any, product: string) => {
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

  const onPageBack = () => {
    navigate(-1);
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
            <Select loading={isLoading} options={setOptions(customers)} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please select an assembly!" }]}
            name="assembly"
            label="Assembly"
          >
            <Radio.Group options={assemblyOptions} name="assembly" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please choose a payment method!" },
            ]}
            name="payment"
            label="Payment"
          >
            <Cascader options={paymentOptions} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please choose the registration date!",
              },
            ]}
            initialValue={getCurrentTime()}
            name="registration"
            label="Registration"
          >
            <DatePicker disabled format={"DD/MM/YYYY"} />
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
              onClick={onPageBack}
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
