import { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Searchbar from "./ContactsPanelComponents/Searchbar";
import ContactsList from "./ContactsPanelComponents/ContactsList";
import { Contact } from "../../../interfaces";
import useUserStore from "../../../stores/useUserStore";

const ContactPanel = ({
  setSelectedContact,
  selectedContact,
}: {
  setSelectedContact: (contact: any) => void;
  selectedContact: Contact | null;
}) => {
  const { contacts, fetchContacts } = useUserStore();

  useEffect(() => {
    fetchContacts();
  }, []);

  if (!contacts) {
    return (
      <div className="w-4/12 flex flex-col justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-4/12">
      <Searchbar />
      <ContactsList
        contacts={contacts}
        setSelectedContact={setSelectedContact}
        selectedContact={selectedContact}
      />
    </div>
  );
};
export default ContactPanel;
