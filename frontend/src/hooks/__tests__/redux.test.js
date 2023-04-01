import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "@/store";
import { mockState } from "@/tests";
import { useAppSelector } from "@/hooks";

const store = setupStore(mockState);
const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("Redux Hooks", () => {
  it("should select auth state", async () => {
    const { result } = renderHook(() => useAppSelector((state) => state.auth), {
      wrapper,
    });

    expect(result.current).toStrictEqual(mockState.auth);
  });

  it("should select orders state", async () => {
    const { result } = renderHook(
      () => useAppSelector((state) => state.orders),
      {
        wrapper,
      }
    );

    expect(result.current).toStrictEqual(mockState.orders);
  });
});
