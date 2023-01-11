import {
  server,
  mockCustomersPayload,
  mockState,
  mockErrorMessage,
} from "../../../tests";
import customersReducer, { fetchCustomers } from "../customersSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Customers Slice", () => {
  it("should fetch Customers with resolved response", async () => {
    const dispatch = jest.fn();
    const thunk = fetchCustomers();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchCustomers.pending().type);
    expect(end[0].type).toBe(fetchCustomers.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockCustomersPayload);
  });

  it("should receive error message with 'fetchCustomers.rejected' action", async () => {
    const state = customersReducer(
      mockState.orders,
      fetchCustomers.rejected(null, "", undefined, mockErrorMessage)
    );

    expect(state.message).toBe(mockErrorMessage);
  });
});
