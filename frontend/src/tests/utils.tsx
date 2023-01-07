import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RootState, setupStore } from "../store";

import AppRouter from "../components/AppRouter";

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
