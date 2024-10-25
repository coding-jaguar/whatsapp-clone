import { useEffect } from "react";
import api from "../../../axios";
import Input from "./ChatComponents/Input";
import ChatsDisplay from "./ChatComponents/ChatsDisplay";
import { Contact } from "../../../interfaces";
import useMessagesStore from "../../../stores/useMessageStore";
import useMessageStore from "../../../stores/useMessageStore";
import { useNavigate } from "react-router-dom";

interface ChatProps {
  selectedContact: Contact | null;
}

const Chat = ({ selectedContact }: ChatProps) => {
  const { message, setMessage, messages, setMessages } = useMessagesStore();

  const { socket, initializeSocket } = useMessageStore();

  if (!socket) {
    initializeSocket();
  }

  const token = localStorage.getItem("token");
  if (!token) {
    const navigate = useNavigate();
    navigate("/login");
  }

  const fromUserId = token
    ? parseInt(JSON.parse(atob(token.split(".")[1])).userId)
    : -1;

  useEffect(() => {
    if (!socket) {
      initializeSocket();
    }

    if (selectedContact) {
      const fetchMessages = async () => {
        try {
          const fetchMessages = async () => {
            try {
              const response = await api.get(`/messages/get-messages`, {
                params: {
                  fromUserId: fromUserId,
                  toUserId: selectedContact.id,
                },
              });
              setMessages(response.data);
            } catch (error) {
              console.error("Failed to fetch messages:", error);
            }
          };

          fetchMessages();
        } catch (error: any) {
          console.log(error);
        }
      };

      fetchMessages();

      // Clean up function to remove event listeners when component unmounts
      return () => {
        if (socket) {
          socket.off("receiveMessage");
        }
      };
    }
  }, [selectedContact, fromUserId]);

  return (
    <div className="w-8/12 flex justify-between flex-col items-center">
      <ChatsDisplay messages={messages} />
      <Input message={message} setMessage={setMessage} />
    </div>
  );
};
export default Chat;
