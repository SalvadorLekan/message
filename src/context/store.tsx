import { Provider } from "react-redux";

import { store } from "store";

interface ReduxProviderProps extends React.PropsWithChildren {}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
