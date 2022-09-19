import Login from "components/login";
import MessageScreen from "components/message-screen";
import { useAppSelector } from "hooks/store";
import { selectUser } from "store/slices/user";

function App() {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Login />;
  }
  return <MessageScreen />;
}

export default App;
