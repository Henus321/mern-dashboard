import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LOGIN_ROUTE } from "../../../constants";
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

describe("Login", () => {
  it("should focus inputs on tab", async () => {
    await act(async () =>
      renderTestApp(LOGIN_ROUTE, {
        ...mockState,
        auth: mockAuthStateUnauthorized,
      })
    );

    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Password");

    userEvent.tab();
    expect(emailInput).toHaveFocus();

    userEvent.tab();
    expect(passwordInput).toHaveFocus();
  });

  it("should successfully log in with pre-filled fields and redirects to app", async () => {
    await act(async () =>
      renderTestApp(LOGIN_ROUTE, {
        ...mockState,
        auth: mockAuthStateUnauthorized,
      })
    );

    expect(screen.queryByText(/Photo/i)).not.toBeInTheDocument();

    const submitButton = screen.getByRole("button");
    await act(async () => userEvent.click(submitButton));

    expect(screen.getByText(/Photo/i)).toBeInTheDocument();
  });

  it("should allow valid fields and warn invalid ones", async () => {
    await act(async () =>
      renderTestApp(LOGIN_ROUTE, {
        ...mockState,
        auth: mockAuthStateUnauthorized,
      })
    );

    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Password");

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    await act(async () => {
      userEvent.type(emailInput, "user@test.com");
      userEvent.type(passwordInput, "123456");
    });

    expect(emailInput).toBeValid();
    expect(passwordInput).toBeValid();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    await act(async () => {
      userEvent.type(emailInput, "usertestcom");
      userEvent.type(
        passwordInput,
        "12345678901234567890123456789012345678901"
      );
    });

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });
});
