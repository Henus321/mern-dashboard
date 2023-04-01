import { act, screen } from "@testing-library/react";
import { DEFAULT_AUTHORIZED_USER_ROUTE } from "@/constants";
import { renderTestApp, mockState, server } from "@/tests";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Side Menu", () => {
  it("should navigate through all menu item", async () => {
    await act(async () =>
      renderTestApp(DEFAULT_AUTHORIZED_USER_ROUTE, mockState)
    );

    const productsMenuItem = screen.getByRole("link", { name: "Products" });
    await act(async () => userEvent.click(productsMenuItem));
    expect(screen.getByTestId("products-card")).toBeInTheDocument();

    const customersMenuItem = screen.getByRole("link", { name: "Customers" });
    await act(async () => userEvent.click(customersMenuItem));
    expect(screen.getByTestId("customers-card")).toBeInTheDocument();

    const profileMenuItem = screen.getByRole("link", { name: "Profile" });
    await act(async () => userEvent.click(profileMenuItem));
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();

    const ordersMenuItem = screen.getByRole("link", { name: "Orders" });
    await act(async () => userEvent.click(ordersMenuItem));
    expect(screen.getByTestId("orders-card")).toBeInTheDocument();
  });
});
