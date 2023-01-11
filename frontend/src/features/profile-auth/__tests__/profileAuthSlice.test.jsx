import { mockState, mockUser, server } from "../../../tests";
import profileAuthReducer, {
  logout,
  updateUser,
  fetchUser,
  passwordChange,
  login,
  register,
} from "../profileAuthSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Profile Auth Slice", () => {
  it("should fetch User data with resolved response", async () => {
    const dispatch = jest.fn();
    const thunk = fetchUser();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchUser.pending().type);
    expect(end[0].type).toBe(fetchUser.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockUser);
  });

  it("should set isModified flag to true with 'updateUser.fulfilled' action", async () => {
    const state = profileAuthReducer(mockState.auth, updateUser.fulfilled());

    expect(state.isModified).toBe(true);
  });

  it("should set user to null with 'logout.fulfilled' action", async () => {
    const state = profileAuthReducer(mockState.auth, logout.fulfilled());

    expect(state.user).toBeNull;
  });

  it("should fetch User data with successful password change", async () => {
    const dispatch = jest.fn();
    const thunk = passwordChange();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(passwordChange.pending().type);
    expect(end[0].type).toBe(passwordChange.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockUser);
  });

  it("should fetch User data with successful log in", async () => {
    const dispatch = jest.fn();
    const thunk = login();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(login.pending().type);
    expect(end[0].type).toBe(login.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockUser);
  });

  it("should fetch User data with successful registration", async () => {
    const dispatch = jest.fn();
    const thunk = register();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(register.pending().type);
    expect(end[0].type).toBe(register.fulfilled().type);
    expect(end[0].payload).toStrictEqual(mockUser);
  });
});
