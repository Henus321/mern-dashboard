import {
  Form,
  Select,
  DatePicker,
  Radio,
  Cascader,
  Divider,
  Button,
  Card,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchCustomers } from "../../customers/customersSlice";
import { paymentOptions, assemblyOptions } from "../../../constants/Options";
import { ICustomer } from "../../../models/ICustomer";
import moment from "moment";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";

const Settings = () => {
  const { customers, isLoading } = useAppSelector((state) => state.customers);
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

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  return (
    <>
      <Divider style={{ fontSize: "20px", textAlign: "center" }}>
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
        >
          <Form.Item name="customer" label="Customer">
            <Select loading={isLoading} options={setOptions(customers)} />
          </Form.Item>
          <Form.Item name="assembly" label="Assembly">
            <Radio.Group options={assemblyOptions} name="assembly" />
          </Form.Item>
          <Form.Item name="payment" label="Payment">
            <Cascader options={paymentOptions} />
          </Form.Item>
          <Form.Item
            initialValue={getCurrentTime()}
            name="registration"
            label="Registration"
          >
            <DatePicker disabled format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item name="delivery" label="Delivery">
            <DatePicker disabledDate={disabledDate} format={"DD/MM/YYYY"} />
          </Form.Item>
        </Form>
        <Button
          style={{ marginTop: "30px" }}
          size="large"
          type="primary"
          className="rounded"
        >
          Submit
        </Button>
      </Card>
    </>
  );
};

export default Settings;
