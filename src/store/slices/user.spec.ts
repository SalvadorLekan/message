import userReducer, { UserState, login, logout } from "./user";

describe("counter reducer", () => {
  const initialState: UserState = {
    user: null,
  };
  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual({
      user: null,
    });
  });

  it("should handle login", () => {
    const actual = userReducer(
      initialState,
      login({
        name: "Test",
      })
    );
    expect(actual.user?.name).toEqual("Test");
  });

  it("should handle logout", () => {
    const actual = userReducer(initialState, logout());
    expect(actual.user).toBeNull();
  });
});
