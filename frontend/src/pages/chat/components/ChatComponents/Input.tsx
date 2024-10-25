import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Message } from "../../../../interfaces";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons/faPaperclip";
import useMessageStore from "../../../../stores/useMessageStore";
import { useState } from "react";

interface InputProps {
  message: Message;
  setMessage: (message: Message) => void;
}
const Input = ({ message, setMessage }: InputProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { sendFile, sendMessage } = useMessageStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage({ ...message, content: e.target.value });
  };

  const handleSendMessage = () => {
    console.log("Sending message");
    if (selectedFile) {
      sendFile(selectedFile, message);
      setSelectedFile(null);
      return;
    }
    if (message.content) {
      sendMessage(message);
      setMessage({ ...message, content: "" });
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("file:", file);
    }
  };

  return (
    <div className="flex w-full py-2">
      <div className="flex flex-col w-10/12">
        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected file preview"
            className="w-full object-cover mr-2"
          />
        )}

        <div className="w-full flex items-center bg-gray-800 rounded-full gap-2 justify-center mx-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-11/12 px-5 py-2 rounded-full bg-transparent focus:bg-black focus:bg-opacity-30 text-white focus:outline-none ml-3"
            value={message.content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor="file-input" className="file-input-label">
            <FontAwesomeIcon
              icon={faPaperclip}
              className="text-gray-400 px-4 text-xl cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <button
        className="w-2/12 p-4 bg-blue-500 rounded-full"
        onClick={() => handleSendMessage()}
      >
        Send
      </button>
    </div>
  );
};

export default Input;
