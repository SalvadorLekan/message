import { useAppDispatch, useAppSelector } from "hooks/store";
import { addMessage, loadMore, selectMessages } from "store/slices/messages";
import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { selectLoggedInUser } from "store/slices/user";
import { useCallback, useEffect, useRef } from "react";
import { broadCastChannel } from "context/store";

export default function MessageScreen() {
  const { messages, total } = useAppSelector(selectMessages);
  const user = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();
  const chatRef = useRef<HTMLDivElement>(null);

  const more = useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  const scrollToButtom = useCallback(() => {
    const chat = chatRef.current;
    if (chat) {
      const { scrollHeight, clientHeight } = chat;

      chat.scrollTo(0, scrollHeight - clientHeight);
    }
  }, []);

  useEffect(scrollToButtom, [messages.at(-1)?.id, scrollToButtom]);

  const send = useCallback(
    (text: string) => {
      const message: Message = {
        id: (Date.now() * Math.random()).toString(36),
        text: text,
        sender: user.name,
        time: Date.now(),
        type: "message",
      };
      dispatch(addMessage(message));
      broadCastChannel.postMessage(message);
    },
    [dispatch, user.name]
  );
  return (
    <Container
      sx={{
        height: "100vh",
        bgcolor: "background.paper",
        display: "grid",
        gridTemplateRows: "1fr auto",
        gridTemplateColumns: "1fr",
        gridTemplateAreas: "'messages' 'input'",
      }}>
      <Box
        ref={chatRef}
        sx={{
          overflowY: "auto",
        }}>
        {messages.length !== total && (
          <Button onClick={more} fullWidth size="small">
            Load more
          </Button>
        )}
        {messages.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "97%",
            }}>
            <Typography variant="h5" component="h1">
              No messages
            </Typography>
          </Box>
        )}
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemAvatar>
                <Avatar alt={message.sender} src={`https://avatars.dicebear.com/api/human/${message.sender}.svg`} />
              </ListItemAvatar>
              <ListItemText secondary={message.text} primary={message.sender === user.name ? "You" : message.sender} />
            </ListItem>
          ))}
        </List>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.currentTarget.message.value;
          if (message) {
            send(message);
            e.currentTarget.message.value = "";
          }
        }}>
        <TextField multiline name="message" fullWidth />
        <Button type="submit">Send</Button>
      </form>
    </Container>
  );
}
