import messageReducer, { addMessage, loadMore, MessageState } from "./messages";

const testMessage: Message = {
  id: "test",
  sender: "Me",
  text: "Word",
  time: Date.now(),
  type: "message",
};
describe("counter reducer", () => {
  const initialState: MessageState = {
    limit: 25,
    messages: [],
  };
  it("should handle initial state", () => {
    expect(messageReducer(undefined, { type: "unknown" })).toEqual({
      limit: 25,
      messages: [],
    });
  });

  it("should add to messages", () => {
    const actual = messageReducer(initialState, addMessage(testMessage));
    expect(actual.messages[0]).toEqual(testMessage);
  });

  it("should increase limit", () => {
    const actual = messageReducer(initialState, loadMore());
    expect(actual.limit).toEqual(50);
  });
});
