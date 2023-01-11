import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { REGISTRATION_ROUTE, PASSWORD_MATCH_MESSAGE } from "../../../constants";
import {
  renderTestApp,
  mockState,
  server,
  mockAuthStateUnauthorized,
} from "../../../tests";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Registration", () => {
  it("navigate to Login by link", async () => {
    await act(async () =>
      renderTestApp(REGISTRATION_ROUTE, {
        ...mockState,
        auth: mockAuthStateUnauthorized,
      })
    );

    const loginLink = screen.getByRole("link", {
      name: "Log in and get started!",
    });
    await act(async () => userEvent.click(loginLink));

    const loginTitle = screen.getByText(/Login/i);
    expect(loginTitle).toBeInTheDocument();
  });

  it("throws password missmatch error", async () => {
    await act(async () =>
      renderTestApp(REGISTRATION_ROUTE, {
        ...mockState,
        auth: mockAuthStateUnauthorized,
      })
    );

    const nameInput = screen.getByPlaceholderText("Your name");
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmInput = screen.getByPlaceholderText("Confirm password");

    await act(async () => {
      userEvent.type(nameInput, "John Doe");
      userEvent.type(emailInput, "user@test.com");
      userEvent.type(passwordInput, "123456");
      userEvent.type(confirmInput, "1234567");
    });

    const submitButton = screen.getByRole("button");
    await act(async () => userEvent.click(submitButton));

    const notification = screen.getByText(PASSWORD_MATCH_MESSAGE);
    expect(notification).toBeInTheDocument();
  });

  it("successfully registers the user and redirects to app", async () => {
    await act(async () =>
      renderTestApp(REGISTRATION_ROUTE, {
        ...mockState,
        auth: mockAuthStateUnauthorized,
      })
    );

    expect(requestSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(screen.queryByText(/Maurice Ramos/i)).not.toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText("Your name");
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmInput = screen.getByPlaceholderText("Confirm password");

    await act(async () => {
      userEvent.type(nameInput, "John Doe");
      userEvent.type(emailInput, "user2@test.com");
      userEvent.type(passwordInput, "123456");
      userEvent.type(confirmInput, "123456");
    });

    const submitButton = screen.getByRole("button");
    await act(async () => userEvent.click(submitButton));

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(screen.getByText(/Maurice Ramos/i)).toBeInTheDocument();
  });
});
