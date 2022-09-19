import { Provider } from "react-redux";

import { store } from "store";
import { addMessage } from "store/slices/messages";

export const broadCastChannel = new BroadcastChannel("message");

broadCastChannel.onmessage = (e) => {
  const data = e.data as Message;

  store.dispatch(addMessage(data));
};

export default function ReduxProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
