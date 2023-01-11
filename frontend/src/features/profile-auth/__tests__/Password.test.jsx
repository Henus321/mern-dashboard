import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  COMMON_SUCCESS_MESSAGE,
  PASSWORD_MATCH_MESSAGE,
  PASSWORD_ROUTE,
} from "../../../constants";
import { renderTestApp, mockState, server } from "../../../tests";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Password", () => {
  it("should successfully change password", async () => {
    await act(async () => renderTestApp(PASSWORD_ROUTE, mockState));

    expect(screen.queryByText(COMMON_SUCCESS_MESSAGE)).not.toBeInTheDocument();

    const currentPassword = screen.getByPlaceholderText(
      "Your current password"
    );
    const newPassword = screen.getByPlaceholderText("Your new password");
    const confirmPassword = screen.getByPlaceholderText(
      "Confirm your new password"
    );

    await act(async () => {
      userEvent.type(currentPassword, "123456");
      userEvent.type(newPassword, "1234567");
      userEvent.type(confirmPassword, "1234567");
    });

    const saveButton = screen.getByText("Save").closest("button");
    await act(async () => userEvent.click(saveButton));

    expect(screen.getByText(COMMON_SUCCESS_MESSAGE)).toBeInTheDocument();
  });

  it("should get password missmatch notification", async () => {
    await act(async () => renderTestApp(PASSWORD_ROUTE, mockState));

    expect(screen.queryByText(PASSWORD_MATCH_MESSAGE)).not.toBeInTheDocument();

    const currentPassword = screen.getByPlaceholderText(
      "Your current password"
    );
    const newPassword = screen.getByPlaceholderText("Your new password");
    const confirmPassword = screen.getByPlaceholderText(
      "Confirm your new password"
    );

    await act(async () => {
      userEvent.type(currentPassword, "123456");
      userEvent.type(newPassword, "1234567");
      userEvent.type(confirmPassword, "12345678");
    });

    const saveButton = screen.getByText("Save").closest("button");
    await act(async () => userEvent.click(saveButton));

    expect(screen.getByText(PASSWORD_MATCH_MESSAGE)).toBeInTheDocument();
  });

  it("should successfully log out", async () => {
    await act(async () => renderTestApp(PASSWORD_ROUTE, mockState));

    const logoutButton = screen.getByText("Logout").closest("button");
    await act(async () => userEvent.click(logoutButton));

    expect(screen.getByText("Sign up and get started!")).toBeInTheDocument();
  });
});
