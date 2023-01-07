import { act, screen } from "@testing-library/react";
import { DELETE_MESSAGE, ORDERS_ROUTE } from "../../../constants";
import { renderTestApp, mockState, server } from "../../../tests";
import userEvent from "@testing-library/user-event";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Orders", () => {
  it("render with mock server data", async () => {
    await act(async () => renderTestApp(ORDERS_ROUTE, mockState));

    expect(requestSpy).toHaveBeenCalledTimes(1);
    const customerName = screen.getByText(/Maurice Ramos/i);
    expect(customerName);
  });

  it("navigate to Products filtered by brand", async () => {
    await act(async () => renderTestApp(ORDERS_ROUTE, mockState));

    const lamborghiniLink = screen.getByTestId("lamborghini-link");
    await act(async () => userEvent.click(lamborghiniLink));

    const cardTitle = screen.getByText(/Lamborghini Aventador/i);
    expect(cardTitle);
  });

  it("successfully delete an Order", async () => {
    await act(async () => renderTestApp(ORDERS_ROUTE, mockState));

    expect(screen.queryByText(DELETE_MESSAGE)).not.toBeInTheDocument();

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    await act(async () => userEvent.click(deleteButton));

    const request = expect.objectContaining({
      method: "DELETE",
    });
    expect(requestSpy).toHaveBeenCalledWith(request);
    expect(screen.getByText(DELETE_MESSAGE)).toBeInTheDocument();
  });
});
