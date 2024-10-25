import React from "react";
import { Message } from "../../../../interfaces";
import { getAusTime } from "../../../../utils";
import api from "../../../../axios";

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const myId = parseInt(
    JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).userId
  );
  const isOwnMessage = myId === message.fromUserId;
  const time = getAusTime(message.createdAt);

  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchImage = async () => {
      if (message.imageUrl) {
        console.log("Fetching image at:", message.imageUrl);

        try {
          const response = await api.get(message.imageUrl, {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const imageBlobUrl = URL.createObjectURL(response.data);
          setImageUrl(imageBlobUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();

    // Clean up the URL when the component unmounts
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [message.imageUrl]);

  return (
    <div
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      } mb-4 p-3 w-full`}
    >
      <div
        className={`max-w-[70%] min-w-[120px] rounded-lg p-2 ${
          isOwnMessage
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="message"
            className="w-full h-full rounded-none"
          />
        )}

        <p className="text-2xl text-wrap">{message.content}</p>
        <div className="flex justify-end">
          {time && (
            <span className="text-s right-0 bottom-0 text-nowrap mt-2">
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
