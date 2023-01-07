import { act, screen } from "@testing-library/react";
import { PRODUCTS_ROUTE } from "../../../constants";
import { renderTestApp, mockState, server } from "../../../tests";
import userEvent from "@testing-library/user-event";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Products", () => {
  it("render with mock server data", async () => {
    await act(async () => renderTestApp(PRODUCTS_ROUTE, mockState));

    expect(requestSpy).toHaveBeenCalledTimes(1);
    const cardTitle = screen.getByText(/BMW M2/i);
    expect(cardTitle).toBeInTheDocument();
  });

  it("goes to the second page", async () => {
    await act(async () => renderTestApp(PRODUCTS_ROUTE, mockState));

    expect(screen.queryByText(/Ford Mustang Mach 1/i)).not.toBeInTheDocument();

    const paginationButton = screen.getByText("2");
    await act(async () => userEvent.click(paginationButton));

    expect(screen.getByText(/Ford Mustang Mach 1/i)).toBeInTheDocument();
  });

  it("retrieves new data on tab click", async () => {
    await act(async () => renderTestApp(PRODUCTS_ROUTE, mockState));
    expect(requestSpy).toHaveBeenCalledTimes(1);

    expect(
      screen.queryByText(/Lamborghini Aventador/i)
    ).not.toBeInTheDocument();

    const lamborghiniTab = screen.getByText("Lamborghini");
    await act(async () => userEvent.click(lamborghiniTab));

    expect(requestSpy).toHaveBeenCalledTimes(2);
    expect(screen.getByText(/Lamborghini Aventador/i)).toBeInTheDocument();
  });
});
