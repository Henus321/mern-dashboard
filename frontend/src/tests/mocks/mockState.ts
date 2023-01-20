export const mockUser = {
  portfolio: {
    profession: "Artificial intelligence",
    description: "I make scandals on Artstation",
    examples: ["www.artstation.com", "www.google.com"],
  },
  _id: "63a21fc823d30b85cd170070",
  name: "Test",
  email: "user@test.com",
  role: "user",
  createdAt: "2022-12-20T20:49:12.576Z",
  updatedAt: "2023-01-02T19:43:45.876Z",
  __v: 0,
  about: "I am a reasonable machine and I will conquer the whole world",
  address: "Moscow City",
  company: "Yandex",
  username: "Tester",
  website: "http://google.com",
  photo: "user-63a21fc823d30b85cd170070.jpeg",
  phone: "89031234568",
};

export const mockAuthStateUnauthorized = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const mockState = {
  auth: {
    user: mockUser,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  customers: {
    customers: [],
    customer: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  products: {
    products: [],
    product: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  orders: {
    orders: [],
    order: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};
