export const mockCustomers = {
  status: "success",
  results: 4,
  data: {
    data: [
      {
        _id: "637e4e2473efdf2fa89cb3c6",
        name: "Jeffery Nichols",
        phone: "89039039220",
        email: "jeff@gmail.com",
        social: "https://www.instagram.com/nasa",
        city: "New York",
        key: "8300d79b-4e53-4a44-9812-7833dbd4cfd0",
        __v: 0,
      },
      {
        _id: "637e4e7773efdf2fa89cb3cf",
        name: "Alexander Erkhov",
        phone: "89224134422",
        email: "ekrhov@mail.ru",
        social: "www.linkedin.com",
        city: "Moscow",
        key: "521c6298-21ba-4d44-8588-4c848a13206d",
        __v: 0,
      },
      {
        _id: "637e4ea773efdf2fa89cb3e9",
        name: "Maurice Ramos",
        phone: "89537186228",
        email: "maurice@gmail.com",
        social: "www.facebook.com",
        city: "Mexico",
        key: "2f4dbef3-3d8f-4413-aa28-4dda6407c3e0",
        __v: 0,
      },
      {
        _id: "637e4eeb73efdf2fa89cb3ee",
        name: "Diane Chavez",
        phone: "89115229223",
        email: "dianes@yahoo.com",
        social: "https://www.instagram.com/nasa",
        city: "Buenos Aires",
        key: "a1c7c5d7-8dbc-4108-8334-c42ba329d964",
        __v: 0,
      },
    ],
  },
};

export const mockNewCustomer = {
  status: "success",
  data: {
    data: {
      name: "John Doe",
      phone: "89031234567",
      email: "user@test.com",
      social: "www.google.com",
      city: "Tokyo",
      _id: "63c94a1d5c4cee86def874f8",
      key: "ff8755ff-defc-4d4d-848f-b23ace3ca9e7",
      __v: 0,
    },
  },
};

export const mockCustomerId = "637e4eeb73efdf2fa89cb3ee";

export const mockCustomersPayload = mockCustomers.data.data;
