import { act, screen } from "@testing-library/react";
import { ORDER_DELETE_MESSAGE, ORDERS_ROUTE } from "../../../constants";
import { renderTestApp, mockState, server } from "../../../tests";
import userEvent from "@testing-library/user-event";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Orders", () => {
  it("should successfully delete an Order", async () => {
    await act(async () => renderTestApp(ORDERS_ROUTE, mockState));

    expect(screen.queryByText(ORDER_DELETE_MESSAGE)).not.toBeInTheDocument();

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    await act(async () => userEvent.click(deleteButton));

    const request = expect.objectContaining({
      method: "DELETE",
    });
    expect(requestSpy).toHaveBeenCalledWith(request);
    expect(screen.getByText(ORDER_DELETE_MESSAGE)).toBeInTheDocument();
  });

  it("should navigate to Products filtered by brand", async () => {
    await act(async () => renderTestApp(ORDERS_ROUTE, mockState));

    expect(
      screen.queryByText(/Lamborghini Aventador/i)
    ).not.toBeInTheDocument();

    const lamborghiniLink = screen.getByTestId("lamborghini-link");
    await act(async () => userEvent.click(lamborghiniLink));

    expect(screen.getByText(/Lamborghini Aventador/i)).toBeInTheDocument();
  });

  it("should navigate to edit Order", async () => {
    await act(async () => renderTestApp(ORDERS_ROUTE, mockState));

    expect(screen.queryByText(/Specify the Settings/i)).not.toBeInTheDocument();

    const editButton = screen.getAllByText("Edit")[0].closest("button");
    await act(async () => userEvent.click(editButton));

    expect(screen.getByText(/Specify the Settings/i)).toBeInTheDocument();
  });
});
