import { useEffect } from "react";
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
import { RangePickerProps } from "antd/lib/date-picker";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { paymentOptions, assemblyOptions } from "../../constants/Options";
import { ICustomer } from "../../models/customers";
import { IOrderProps } from "../../models/orders";
import { ERROR_DURATION } from "../../constants/Notifications";
import { updateOrder } from "./ordersSlice";
import { fetchCustomers } from "../customers/customersSlice";
import { setProduct } from "../products/productsSlice";
import dayjs from "dayjs";
import moment from "moment";

const EditSettings: React.FC<IOrderProps> = ({ order }) => {
  const { isLoading: ordersIsLoading } = useAppSelector(
    (state) => state.orders
  );
  const { customers, isLoading } = useAppSelector((state) => state.customers);
  const { product } = useAppSelector((state) => state.products);
  const [form] = Form.useForm();
  const initialFormValues = {
    ...order,
    customer: {
      value: order.customer._id,
      label: order.customer.name,
    },
    registration: moment(order.registration),
    delivery: moment(order.delivery),
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialProduct = order.product._id;

    dispatch(setProduct(initialProduct));
    // eslint-disable-next-line
  }, [dispatch]);

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

  const disabledDate: RangePickerProps["disabledDate"] = (current) =>
    current && current < dayjs().endOf("day");

  const onFinish = (values: any, product: string) => {
    if (!product) {
      notification.error({
        message: "Error!",
        description: "Please pick a Product.",
        duration: ERROR_DURATION,
      });
      return;
    }
    const customer = values.customer.value
      ? values.customer.value
      : values.customer;
    const newOrder = { ...values, product, customer, _id: order._id };

    dispatch(updateOrder(newOrder));
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
          initialValues={initialFormValues}
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
            // initialValue={getCurrentTime()}
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
          <Button
            loading={ordersIsLoading}
            htmlType="submit"
            size="large"
            type="primary"
            className="rounded w-full mt-30"
          >
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default EditSettings;
