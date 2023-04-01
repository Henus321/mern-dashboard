import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { COMMON_SUCCESS_MESSAGE, PORTFOLIO_ROUTE } from "@/constants";
import { renderTestApp, mockState, server } from "@/tests";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Portfolio", () => {
  it("should successfully edit Portfolio", async () => {
    await act(async () => renderTestApp(PORTFOLIO_ROUTE, mockState));

    expect(screen.queryByText(COMMON_SUCCESS_MESSAGE)).not.toBeInTheDocument();

    const saveButton = screen.getByText("Save").closest("button");
    await act(async () => userEvent.click(saveButton));

    expect(screen.getByText(COMMON_SUCCESS_MESSAGE)).toBeInTheDocument();
  });

  it("should hide add button when more then ten examples", async () => {
    await act(async () => renderTestApp(PORTFOLIO_ROUTE, mockState));

    const addExampleButton = screen.getByText("Add Example").closest("button");

    await act(async () => {
      for (let i = 0; i < 8; i++) {
        userEvent.click(addExampleButton);
      }
    });

    expect(screen.queryByText("Add Example")).not.toBeInTheDocument();
  });

  it("should allow valid fields and warn invalid ones", async () => {
    await act(async () => renderTestApp(PORTFOLIO_ROUTE, mockState));

    const professionInput = screen.getByPlaceholderText(
      "Enter your profession"
    );
    const exampleInput = screen.getAllByPlaceholderText("www.website.com")[0];

    userEvent.clear(professionInput);
    userEvent.clear(exampleInput);

    await act(async () => {
      userEvent.type(
        professionInput,
        "4444444444444444444444444444444444444444"
      );
      userEvent.type(exampleInput, "www.google.com");
    });

    expect(professionInput).toBeValid();
    expect(exampleInput).toBeValid();

    userEvent.clear(professionInput);
    userEvent.clear(exampleInput);

    await act(async () => {
      userEvent.type(
        professionInput,
        "44444444444444444444444444444444444444444"
      );
      userEvent.type(exampleInput, "www.googlecom");
    });

    expect(professionInput).toBeInvalid();
    expect(exampleInput).toBeInvalid();
  });
});
