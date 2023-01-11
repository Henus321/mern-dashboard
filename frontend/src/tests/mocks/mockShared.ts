export const mockDeleteResponse = {
  status: "success",
  data: null,
};

export const mockSuccessResponse = { status: "success" };

export const mockAuthResponse = {
  status: "success",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTIxZmM4MjNkMzBiODVjZDE3MDA3MCIsImlhdCI6MTY3MzA5NzEwNiwiZXhwIjoxNjgwODczMTA2fQ.dvrXXfQI-mRM-H01sJxbmoY-0rYVHwd80QNPAVQBoSk",
  data: {
    data: {
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
    },
  },
};

export const mockErrorMessage = "Something went wrong...";

export const mockAuthPositiveResult = {
  checkingStatus: false,
  loggedIn: true,
};
