import { act, screen } from "@testing-library/react";
import { mockState } from "../../../dev-data/mock-state";
import { renderTestApp } from "../../../utils";
import Orders from "../orders";

describe("Orders", () => {
  test("test", async () => {
    await act(async () =>
      renderTestApp(<Orders />, {
        initialState: mockState,
      })
    );

    expect(await screen.findAllByText(/No data/i));
    // screen.debug(undefined, 300000);
  });
});
