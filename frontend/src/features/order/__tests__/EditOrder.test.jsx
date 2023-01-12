import { act, screen } from "@testing-library/react";
import { EDIT_ORDER_ROUTE, ORDER_EDIT_MESSAGE } from "../../../constants";
import { renderTestApp, mockState, server, mockOrderId } from "../../../tests";
import userEvent from "@testing-library/user-event";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Edit Order", () => {
  it("should retrieve new data on tab click", async () => {
    await act(async () =>
      renderTestApp(EDIT_ORDER_ROUTE + `/${mockOrderId}`, mockState)
    );

    const initialCallTimes = 2;
    expect(requestSpy).toHaveBeenCalledTimes(initialCallTimes);
    expect(screen.queryByText(/Ferrari Monza SP1/i)).not.toBeInTheDocument();

    const ferrariTab = screen.getByText("Ferrari");
    await act(async () => userEvent.click(ferrariTab));

    expect(requestSpy).toHaveBeenCalledTimes(initialCallTimes + 1);
    expect(screen.getByText(/Ferrari Monza SP1/i)).toBeInTheDocument();
  });

  it("should successfully edit the Order", async () => {
    await act(async () =>
      renderTestApp(EDIT_ORDER_ROUTE + `/${mockOrderId}`, mockState)
    );

    expect(screen.queryByText(ORDER_EDIT_MESSAGE)).not.toBeInTheDocument();

    const submitButton = screen.getByText("Submit").closest("button");
    await act(async () => userEvent.click(submitButton));

    expect(screen.getByText(ORDER_EDIT_MESSAGE)).toBeInTheDocument();
  });

  it("should navigate back to Orders on button click", async () => {
    await act(async () =>
      renderTestApp(EDIT_ORDER_ROUTE + `/${mockOrderId}`, mockState)
    );

    expect(screen.queryByText(/Maurice Ramos/i)).not.toBeInTheDocument();

    const backButton = screen.getByText("Back to Orders").closest("button");
    await act(async () => userEvent.click(backButton));

    expect(screen.getByText(/Maurice Ramos/i)).toBeInTheDocument();
  });
});
