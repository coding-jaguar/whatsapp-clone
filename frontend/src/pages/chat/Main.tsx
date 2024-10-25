import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import ContactPanel from "./components/ContactPanel";
import { Contact } from "../../interfaces";
import useUserStore from "../../stores/useUserStore";
import useMessageStore from "../../stores/useMessageStore";
import SideBar from "./components/ChatComponents/SideBar";

const Main = () => {
  const navigate = useNavigate();
  const { fetchContacts } = useUserStore();
  const { initializeSocket } = useMessageStore();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Check for token and navigate to login if not found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchContacts();
      initializeSocket();
    }
  }, [fetchContacts, initializeSocket, navigate]);

  return (
    <div className="flex w-full text-center h-full text-white">
      <SideBar />
      <ContactPanel
        setSelectedContact={setSelectedContact}
        selectedContact={selectedContact}
      />
      <div className="w-px bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 shadow-lg"></div>
      <Chat selectedContact={selectedContact} />
      <div className="w-px bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 shadow-lg"></div>
      <Profile selectedContact={selectedContact} />
    </div>
  );
};

export default Main;
