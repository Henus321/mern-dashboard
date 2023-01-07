import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LOGIN_ROUTE } from "../../../constants";
import { renderTestApp, mockState, server, unauthorized } from "../../../tests";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Login", () => {
  it("focus inputs on tab", async () => {
    await act(async () =>
      renderTestApp(LOGIN_ROUTE, {
        ...mockState,
        auth: unauthorized,
      })
    );

    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Password");

    userEvent.tab();
    expect(emailInput).toHaveFocus();

    userEvent.tab();
    expect(passwordInput).toHaveFocus();
  });

  it("successfully logs in with pre-filled fields and redirects to app", async () => {
    await act(async () =>
      renderTestApp(LOGIN_ROUTE, {
        ...mockState,
        auth: unauthorized,
      })
    );

    expect(screen.queryByText(/Maurice Ramos/i)).not.toBeInTheDocument();

    const submitButton = screen.getByRole("button");
    await act(async () => userEvent.click(submitButton));

    expect(screen.getByText(/Maurice Ramos/i)).toBeInTheDocument();
  });

  it("allows valid fields and warn invalid ones", async () => {
    await act(async () =>
      renderTestApp(LOGIN_ROUTE, {
        ...mockState,
        auth: unauthorized,
      })
    );

    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await act(async () => {
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);

      userEvent.type(emailInput, "user@test.com");
      userEvent.type(passwordInput, "123456");
    });

    expect(emailInput).toBeValid();
    expect(passwordInput).toBeValid();

    await act(async () => {
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);

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
