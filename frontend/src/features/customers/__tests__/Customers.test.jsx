import { act, screen } from "@testing-library/react";
import { COMMON_SUCCESS_MESSAGE, CUSTOMERS_ROUTE } from "../../../constants";
import { renderTestApp, mockState, server } from "../../../tests";
import userEvent from "@testing-library/user-event";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Customers", () => {
  it("should successfully create a Customer", async () => {
    await act(async () => renderTestApp(CUSTOMERS_ROUTE, mockState));

    expect(screen.queryByText(COMMON_SUCCESS_MESSAGE)).not.toBeInTheDocument();

    const createButton = screen
      .getByText("Create New Customer")
      .closest("button");
    await act(async () => userEvent.click(createButton));

    const nameInput = screen.getByPlaceholderText("Enter name");
    const phoneInput = screen.getByPlaceholderText("89031234567");
    const emailInput = screen.getByPlaceholderText("Enter email");
    const socialInput = screen.getByPlaceholderText("www.website.com");
    const cityInput = screen.getByPlaceholderText("Enter city name");

    await act(async () => {
      userEvent.type(nameInput, "John Doe");
      userEvent.type(phoneInput, "89031234567");
      userEvent.type(emailInput, "user@test.com");
      userEvent.type(socialInput, "www.google.com");
      userEvent.type(cityInput, "Tokyo");
    });

    const okButton = screen.getByText("OK").closest("button");
    await act(async () => userEvent.click(okButton));

    expect(screen.getByText(COMMON_SUCCESS_MESSAGE)).toBeInTheDocument();
  });

  it("should successfully edit the Customer", async () => {
    await act(async () => renderTestApp(CUSTOMERS_ROUTE, mockState));

    expect(requestSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({
        method: "PATCH",
      })
    );

    const editButton = screen.getAllByText("Edit")[0].closest("button");
    await act(async () => userEvent.click(editButton));

    const okButton = screen.getByText("OK").closest("button");
    await act(async () => userEvent.click(okButton));

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "PATCH",
      })
    );
  });

  it("should successfully delete the Customer", async () => {
    await act(async () => renderTestApp(CUSTOMERS_ROUTE, mockState));

    expect(requestSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({
        method: "DELETE",
      })
    );

    const deleteButton = screen.getAllByText("Delete")[0].closest("button");
    await act(async () => userEvent.click(deleteButton));

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});
