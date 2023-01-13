import moment from "moment";
import { IOrder, IOrdersTable } from "../models";
import { capitalizeText } from "./typography";

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
