// src/stores/useMessageStore.ts
import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import { Message } from "../interfaces";
import api from "../axios";

interface MessageState {
  messages: Message[];
  message: Message;
  fromUserId: number;
  toUserId: number;
  socket: Socket | null;
  initializeSocket: () => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setMessage: (msg: Partial<Message>) => void;
  sendMessage: (msg: Message) => void;
  sendFile: (file: File, message: Message) => void;
}

const token = localStorage.getItem("token");

let parsedUserId = -1;
if (token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    parsedUserId = parseInt(payload.userId);
  } catch (error) {
    console.error("Failed to parse token:", error);
    // Optionally, remove the invalid token
    // localStorage.removeItem("token");
  }
}

const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  message: {
    fromUserId: parsedUserId,
    toUserId: 0,
    content: "",
    createdAt: "",
    imageUrl: "",
  },
  fromUserId: parsedUserId,
  toUserId: 0,
  socket: null,

  initializeSocket: () => {
    if (!token || parsedUserId === -1) return; // Prevent socket initialization without valid token

    const socket: Socket = io("http://localhost:3001", {
      auth: { token: token },
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      socket.emit("register", get().fromUserId);
    });

    socket.on("receiveMessage", (newMessage: Message) => {
      if (newMessage.fromUserId === get().toUserId) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    set({ socket });
  },

  setMessages: (messages: Message[]) => set({ messages }),

  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setMessage: (msg: Partial<Message>) =>
    set((state) => ({ message: { ...state.message, ...msg } })),

  sendMessage: (msg: Message) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("sendMessage", msg);
      set((state) => ({
        messages: [...state.messages, msg],
      }));
    }
  },

  sendFile: async (file: File, message: Message) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle the response as needed
      // For example, you might want to update the message with the file URL
      console.log(response.data);

      const updatedMessage = {
        ...message,
        imageUrl: response.data.fileUrl,
      };
      get().sendMessage(updatedMessage);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  },
}));

export default useMessageStore;
