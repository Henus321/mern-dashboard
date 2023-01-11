import {
  server,
  mockProductsPayload,
  mockState,
  mockErrorMessage,
} from "../../../tests";
import productsReducer, { fetchProducts } from "../productsSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Products Slice", () => {
  it("should fetch Products with resolved response", async () => {
    const dispatch = jest.fn();
    const withoutBrand = "";
    const thunk = fetchProducts(withoutBrand);

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchProducts.pending().type);
    expect(end[0].type).toBe(fetchProducts.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockProductsPayload);
  });

  it("should receive error message with 'fetchProducts.rejected' action", async () => {
    const state = productsReducer(
      mockState.orders,
      fetchProducts.rejected(null, "", undefined, mockErrorMessage)
    );

    expect(state.message).toBe(mockErrorMessage);
  });
});
