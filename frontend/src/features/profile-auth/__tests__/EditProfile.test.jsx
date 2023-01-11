import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { COMMON_SUCCESS_MESSAGE, EDIT_PROFILE_ROUTE } from "../../../constants";
import { renderTestApp, mockState, server } from "../../../tests";

const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Edit Profile", () => {
  it("should successfully edit Profile", async () => {
    await act(async () => renderTestApp(EDIT_PROFILE_ROUTE, mockState));

    expect(screen.queryByText(COMMON_SUCCESS_MESSAGE)).not.toBeInTheDocument();

    const saveButton = screen.getByText("Save").closest("button");
    await act(async () => userEvent.click(saveButton));

    expect(screen.getByText(COMMON_SUCCESS_MESSAGE)).toBeInTheDocument();
  });

  it("should reset forms on cancel button", async () => {
    await act(async () => renderTestApp(EDIT_PROFILE_ROUTE, mockState));

    const initialName = "Test";
    const newName = "John Doe";
    const nameInput = screen.getByPlaceholderText("Enter name");

    await act(async () => {
      userEvent.clear(nameInput);
      userEvent.type(nameInput, newName);
    });

    expect(screen.getByPlaceholderText("Enter name").value).toEqual(newName);

    const cancelButton = screen.getByText("Cancel").closest("button");

    await act(async () => {
      userEvent.click(cancelButton);
    });

    expect(screen.getByPlaceholderText("Enter name").value).toEqual(
      initialName
    );
  });

  it("should allow valid fields and warn invalid ones", async () => {
    await act(async () => renderTestApp(EDIT_PROFILE_ROUTE, mockState));

    const nameInput = screen.getByPlaceholderText("Enter name");
    const phoneInput = screen.getByPlaceholderText("89031234567");
    const websiteInput = screen.getByPlaceholderText("www.website.com");

    await act(async () => {
      userEvent.clear(nameInput);
      userEvent.clear(phoneInput);
      userEvent.clear(websiteInput);

      userEvent.type(nameInput, "Test");
      userEvent.type(phoneInput, "89031234567");
      userEvent.type(websiteInput, "www.google.com");
    });

    expect(nameInput).toBeValid();
    expect(phoneInput).toBeValid();
    expect(websiteInput).toBeValid();

    await act(async () => {
      userEvent.clear(nameInput);
      userEvent.clear(phoneInput);
      userEvent.clear(websiteInput);

      userEvent.type(nameInput, "MoreThen40SymbolsTextThatWillBreakDownLayout");
      userEvent.type(phoneInput, "8903123456a");
      userEvent.type(websiteInput, "www.googlecom");
    });

    expect(nameInput).toBeInvalid();
    expect(phoneInput).toBeInvalid();
    expect(websiteInput).toBeInvalid();
  });
});
