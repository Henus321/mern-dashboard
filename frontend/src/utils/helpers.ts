import { ICustomer, IOrder, IOrdersTable, IProduct } from "../models";
import { capitalizeText } from "./typography";
import { RangePickerProps } from "antd/lib/date-picker";
import { PAGE_SIZE } from "../constants";
import dayjs from "dayjs";
import moment from "moment";

export const convertOrdersToDataSource = (
  ordersArray: IOrder[]
): IOrdersTable[] =>
  ordersArray.map((item, index) => {
    const customer = {
      customer: item.customer.name,
    };
    const product = {
      photoUrl: item.product.photoUrl,
      brand: capitalizeText(item.product.brand),
      model: item.product.model,
      cost: item.product.cost,
    };
    const order = {
      key: item._id,
      id: item._id,
      number: index + 1,
      build: capitalizeText(item.build),
      payment: item.payment.map((pay) => capitalizeText(pay)).join(" "),
      delivery: moment(item.delivery).format("DD/MM/YYYY"),
    };

    return {
      ...customer,
      ...product,
      ...order,
    };
  });

export const createCityFilters = (customers: ICustomer[]) =>
  Array.from(new Set(customers.map((item) => item.city))).map((city) => {
    return {
      text: city,
      value: city,
    };
  });

export const setSelectOptions = (values: ICustomer[]) => {
  return values.map((value) => {
    return {
      value: value._id,
      label: value.name,
    };
  });
};

export const disabledDate: RangePickerProps["disabledDate"] = (current) =>
  current && current < dayjs().endOf("day");

export const createOrderFormValues = (order: IOrder) => ({
  ...order,
  customer: {
    value: order.customer._id,
    label: order.customer.name,
  },
  delivery: moment(order.delivery),
});

export const setCustomerOptions = (values: ICustomer[]) => {
  return values.map((value) => {
    return {
      value: value._id,
      label: value.name,
    };
  });
};

export const getPaginationData = (pageNumber: number) => {
  const pageStart = (pageNumber - 1) * PAGE_SIZE;
  const pageEnd = (pageNumber - 1) * PAGE_SIZE + PAGE_SIZE;
  return { pageStart, pageEnd };
};

export const getProductsHeight = (isLoading: boolean, products: IProduct[]) => {
  const cardHeight = isLoading || products.length === 0 ? "100%" : "";
  const cardBodyHeight =
    isLoading || products.length === 0 ? "calc(100% - 126px)" : "";
  return { cardHeight, cardBodyHeight };
};
