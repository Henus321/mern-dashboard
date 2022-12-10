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
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCustomers } from "../customers/customersSlice";
import { paymentOptions, assemblyOptions } from "../../constants/Options";
import { ICustomer } from "../../models/ICustomer";
import moment from "moment";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import { ERROR_DURATION } from "../../constants/Errors";

const OrderSettings = () => {
  const { customers, isLoading } = useAppSelector((state) => state.customers);
  const { product } = useAppSelector((state) => state.products);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

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
        description: "Please pick a Product.",
        duration: ERROR_DURATION,
      });
      return;
    }
    console.log({ ...values, product });
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
          <Button
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

export default OrderSettings;
