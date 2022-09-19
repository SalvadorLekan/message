interface Message {
  id: string;
  sender: string;
  text: string;
  type: MessageType;
  time: number;
}

type MessageType = "message" | "join" | "leave";

interface User {
  name: string;
}
