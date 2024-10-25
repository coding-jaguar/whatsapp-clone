import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { Message } from "../../../../interfaces";

interface ChatsDisplayProps {
  messages: Message[] | null;
}
const ChatsDisplay = ({ messages }: ChatsDisplayProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {}, [messages]);
  return (
    <div className="w-full px-2 h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-300 scrollbar-opacity-20">
      <div className="h-full pr-4">
        {messages?.map((message, index) => (
          <ChatBubble message={message} key={index} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};
export default ChatsDisplay;
