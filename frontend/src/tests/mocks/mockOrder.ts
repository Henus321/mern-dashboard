import moment from "moment";

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
