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

  it("navigates to pre-filled create Order on button click", async () => {
    await act(async () => renderTestApp(PRODUCTS_ROUTE, mockState));

    const pickedCarStyle =
      "box-shadow: 0 1px 2px -2px rgb(0 0 0 / 22%), 0 3px 6px 0 rgb(0 0 0 / 30%)";

    expect(screen.queryByText("Back to Orders")).not.toBeInTheDocument();

    const ferrariMonzaButton = screen.getByTestId("monza-sp1-button");
    await act(async () => userEvent.click(ferrariMonzaButton));

    expect(screen.getByText(/Ferrari Monza SP1/i).closest("div")).toHaveStyle(
      pickedCarStyle
    );
    expect(
      screen.queryByText(/Ferrari LaFerrari/i).closest("div")
    ).not.toHaveStyle(pickedCarStyle);
    expect(screen.getByText("Back to Orders")).toBeInTheDocument();
  });
});
