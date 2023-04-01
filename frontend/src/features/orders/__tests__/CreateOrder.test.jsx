import { act, screen } from "@testing-library/react";
import { CREATE_ORDER_ROUTE, ORDER_CREATE_MESSAGE } from "@/constants";
import {
  renderTestApp,
  mockState,
  server,
  getValidDay,
  mockCreateOrderParams,
} from "@/tests";
import userEvent from "@testing-library/user-event";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Create Order", () => {
  it("should retrieve new data on tab click", async () => {
    await act(async () =>
      renderTestApp(CREATE_ORDER_ROUTE + mockCreateOrderParams, mockState)
    );

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText(/Lamborghini Aventador/i)
    ).not.toBeInTheDocument();

    const lamborghiniTab = screen.getByText("Lamborghini");
    await act(async () => userEvent.click(lamborghiniTab));

    expect(requestSpy).toHaveBeenCalledTimes(2);
    expect(screen.getByText(/Lamborghini Aventador/i)).toBeInTheDocument();
  });

  it("should successfully create an Order", async () => {
    await act(async () =>
      renderTestApp(CREATE_ORDER_ROUTE + mockCreateOrderParams, mockState)
    );

    expect(screen.queryByText(ORDER_CREATE_MESSAGE)).not.toBeInTheDocument();

    const carPick = screen.getByText("Ferrari 308").closest("div");
    const customerInput = screen.getByRole("combobox", { name: "Customer" });
    const buildInput = screen.getByText("Luxury").closest("label");
    const paymentInput = screen.getByRole("combobox", { name: "Payment" });
    const deliveryInput = screen.getByPlaceholderText("Select date");
    const validDay = getValidDay();
    const submitButton = screen.getByText("Submit").closest("button");

    userEvent.click(carPick);
    await act(async () => userEvent.click(customerInput));
    await act(async () => userEvent.click(screen.getByText("Diane Chavez")));
    userEvent.click(buildInput);
    userEvent.click(paymentInput);
    userEvent.click(screen.getByText(/instant/i));
    userEvent.click(screen.getByText(/cash/i));
    userEvent.click(deliveryInput);
    userEvent.click(screen.getAllByText(validDay)[0].closest("td"));

    await act(async () => userEvent.click(submitButton));

    expect(screen.getByText(ORDER_CREATE_MESSAGE)).toBeInTheDocument();
  });

  it("should navigate back to Orders on button click", async () => {
    await act(async () =>
      renderTestApp(CREATE_ORDER_ROUTE + mockCreateOrderParams, mockState)
    );

    expect(screen.queryByText(/Photo/i)).not.toBeInTheDocument();

    const backButton = screen.getByText("Back to Orders").closest("button");
    await act(async () => userEvent.click(backButton));

    expect(screen.getByText(/Photo/i)).toBeInTheDocument();
  });
});
