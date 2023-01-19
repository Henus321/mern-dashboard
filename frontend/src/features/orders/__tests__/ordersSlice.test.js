import {
  server,
  mockState,
  mockFulfilledOrders,
  mockErrorMessage,
} from "../../../tests";
import ordersReducer, { fetchOrders } from "../ordersSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Orders Slice", () => {
  it("should fetch Orders with 'fetchOrders.fulfilled' action", async () => {
    const state = ordersReducer(
      mockState.orders,
      fetchOrders.fulfilled(mockFulfilledOrders)
    );

    expect(state.orders).toStrictEqual(mockFulfilledOrders);
  });

  it("should receive error message with 'fetchOrders.rejected' action", async () => {
    const state = ordersReducer(
      mockState.orders,
      fetchOrders.rejected(null, "", undefined, mockErrorMessage)
    );

    expect(state.message).toBe(mockErrorMessage);
  });
});
