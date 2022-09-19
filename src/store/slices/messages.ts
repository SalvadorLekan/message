import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

interface MessageState {
  messages: Message[];
  limit: number;
}

const initialState: MessageState = {
  messages: [],
  limit: 25,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    loadMore(state) {
      state.limit += 25;
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export function selectMessages(state: RootState) {
  const messages = state.messages.messages;
  let realMessagesMet = 0;

  const tobeReturned = [];

  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].type === "message") {
      realMessagesMet++;
    }

    tobeReturned.push(messages[i]);

    if (realMessagesMet === state.messages.limit) {
      break;
    }
  }
  return {
    messages: tobeReturned,
    total: messages.length,
  };
}

export default messagesSlice.reducer;
