import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RootState, setupStore } from "../store";

import AppRouter from "../components/AppRouter";

export const renderTestApp = (
  component?: React.ReactNode,
  options?: {
    route: string;
    initialState: RootState;
  }
) => {
  const store = setupStore(options?.initialState);
  const route = options?.route ? options.route : "";

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <AppRouter />
        {component}
      </MemoryRouter>
    </Provider>
  );
};

// export const renderWithRouter = (component: any, initialRoute = "/") => {
//   return render(
//     <MemoryRouter initialEntries={[initialRoute]}>
//       <AppRouter />
//       {component}
//     </MemoryRouter>
//   );
// };

// export const renderWithRedux = (component: any, initialState?: RootState) => {
//   const store = setupStore(initialState);

//   return render(<Provider store={store}>{component}</Provider>);
// };
