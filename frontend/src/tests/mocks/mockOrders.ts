import { BRANDS } from "../../constants";
import moment from "moment";

export const mockOrders = {
  status: "success",
  results: 2,
  data: {
    data: [
      {
        _id: "63a45698897ba4cbeb8331d1",
        customer: {
          _id: "637e4e7773efdf2fa89cb3cf",
          name: "Alexander Erkhov",
        },
        product: {
          _id: "638659488b5dcba2413a7345",
          brand: "lamborghini",
          model: "Huracan",
          photoUrl:
            "https://images.unsplash.com/photo-1636866120504-81110da6e04f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
          cost: 399999,
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis ullam perferendis perspiciatis quod explicabo, saepe recusandae, laudantium error nemo, dolorum ipsa! Repellendus eius nostrum recusandae, nisi exercitationem optio eligendi nesciunt.",
          name: "Lamborghini Huracan",
        },
        build: "luxury",
        payment: ["mortgage", "extend"],
        delivery: "2022-12-28T13:07:32.164Z",
        user: "63a21fc823d30b85cd170070",
        createdAt: "2022-12-22T13:07:36.079Z",
        updatedAt: "2023-01-02T10:56:39.166Z",
        __v: 0,
      },
      {
        _id: "63a843b601e73b759793284f",
        customer: {
          _id: "637e4ea773efdf2fa89cb3e9",
          name: "Maurice Ramos",
        },
        product: {
          _id: "63b1d88b8941218030f1bb01",
          brand: "porsche",
          model: "911 GT3",
          photoUrl:
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          cost: 239999,
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis ullam perferendis perspiciatis quod explicabo, saepe recusandae, laudantium error nemo, dolorum ipsa! Repellendus eius nostrum recusandae, nisi exercitationem optio eligendi nesciunt.",
          name: "Porsche 911 GT3",
        },
        build: "sport",
        payment: ["mortgage", "fixed"],
        delivery: "2022-12-29T12:36:04.940Z",
        user: "63a21fc823d30b85cd170070",
        createdAt: "2022-12-25T12:36:06.368Z",
        updatedAt: "2023-01-01T19:42:05.829Z",
        __v: 0,
      },
    ],
  },
};

export const mockFulfilledOrders = mockOrders.data.data.reverse();

export const mockOrder = {
  status: "success",
  data: {
    data: {
      _id: "63a45698897ba4cbeb8331d1",
      customer: {
        _id: "637e4e7773efdf2fa89cb3cf",
        name: "Alexander Erkhov",
      },
      product: {
        _id: "63b1a6cabd961010ad26164d",
        brand: "lamborghini",
        model: "Aventador",
        photoUrl:
          "https://images.unsplash.com/photo-1612393266591-c32944e815c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        cost: 299999,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis ullam perferendis perspiciatis quod explicabo, saepe recusandae, laudantium error nemo, dolorum ipsa! Repellendus eius nostrum recusandae, nisi exercitationem optio eligendi nesciunt.",
        name: "Lamborghini Aventador",
      },
      build: "luxury",
      payment: ["mortgage", "extend"],
      delivery: "2022-12-28T13:07:32.164Z",
      user: "63a21fc823d30b85cd170070",
      createdAt: "2022-12-22T13:07:36.079Z",
      updatedAt: "2023-01-06T15:16:02.320Z",
      __v: 0,
    },
  },
};

export const mockOrderId = "63a45698897ba4cbeb8331d1";

export const mockOrderPayload = mockOrder.data.data;

export const mockNewOrder = {
  customer: "637e4e7773efdf2fa89cb3cf",
  build: "luxury",
  payment: ["mortgage", "extend"],
  delivery: moment("2022-12-28T13:07:32.164Z"),
  product: "63b1a6cabd961010ad26164d",
};

export const mockCreateOrderParams = `?brand=${BRANDS[0]}`;
