import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RootState, setupStore } from "@/store";

import { AppRouter } from "@/components";

export const renderTestApp = (route: string, initialState?: RootState) => {
  const store = setupStore(initialState);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <AppRouter />
      </MemoryRouter>
    </Provider>
  );
};

export const getValidDay = () => {
  const result = new Date();
  result.setDate(result.getDate() + 3);

  return result.getDate();
};
