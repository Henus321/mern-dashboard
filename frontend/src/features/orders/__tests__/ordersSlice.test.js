import {
  server,
  mockState,
  mockFulfilledOrders,
  mockErrorMessage,
  mockOrderId,
  mockNewOrder,
  mockOrderPayload,
} from "../../../tests";
import ordersReducer, {
  fetchOrders,
  createOrder,
  updateOrder,
} from "../ordersSlice";

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

  it("should update Order with resolved response", async () => {
    const dispatch = jest.fn();
    const thunk = updateOrder({ ...mockNewOrder, _id: mockOrderId });
    const { calls } = dispatch.mock;

    await thunk(dispatch);

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(updateOrder.pending().type);
    expect(end[0].type).toBe(updateOrder.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockOrderPayload);
  });

  it("should receive error message with 'updateOrder.rejected' action", async () => {
    const state = ordersReducer(
      mockState.orders,
      updateOrder.rejected(null, "", undefined, mockErrorMessage)
    );

    expect(state.message).toBe(mockErrorMessage);
  });

  it("should create Order with resolved response", async () => {
    const dispatch = jest.fn();
    const thunk = createOrder(mockNewOrder);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(createOrder.pending().type);
    expect(end[0].type).toBe(createOrder.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockOrderPayload);
  });

  it("should receive error message with 'createOrder.rejected' action", async () => {
    const state = ordersReducer(
      mockState.orders,
      createOrder.rejected(null, "", undefined, mockErrorMessage)
    );

    expect(state.message).toBe(mockErrorMessage);
  });
});
