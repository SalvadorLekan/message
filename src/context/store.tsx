import { Provider } from "react-redux";
import { BroadcastChannel } from "broadcast-channel";
import { store } from "store";
import { addMessage } from "store/slices/messages";

export const broadCastChannel = new BroadcastChannel<Message>("message");

broadCastChannel.onmessage = (data) => {
  if (data) store.dispatch(addMessage(data));
};

export default function ReduxProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
