import {
  server,
  mockOrderId,
  mockNewOrder,
  mockOrderPayload,
  mockState,
  mockErrorMessage,
} from "../../../tests";
import orderReducer, { createOrder, updateOrder } from "../ordersSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Order Slice", () => {
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
    const state = orderReducer(
      mockState.order,
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
    const state = orderReducer(
      mockState.order,
      createOrder.rejected(null, "", undefined, mockErrorMessage)
    );

    expect(state.message).toBe(mockErrorMessage);
  });
});
