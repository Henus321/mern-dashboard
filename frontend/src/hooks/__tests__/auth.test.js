import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "@/store";
import { mockAuthPositiveResult, mockState } from "@/tests";
import { useAuthStatus } from "@/hooks";

const store = setupStore(mockState);
const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("Auth Hooks", () => {
  it("should return positive result", async () => {
    const { result } = renderHook(() => useAuthStatus(), {
      wrapper,
    });

    expect(result.current).toStrictEqual(mockAuthPositiveResult);
  });
});
