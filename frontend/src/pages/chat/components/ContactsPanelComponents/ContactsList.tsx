import { Contact } from "../../../../interfaces";
import useMessageStore from "../../../../stores/useMessageStore";

interface ContactsListProps {
  contacts: Contact[];
  setSelectedContact: (contact: Contact) => void;
  selectedContact: Contact | null;
}

const ContactsList = ({
  contacts,
  setSelectedContact,
  selectedContact,
}: ContactsListProps) => {
  const { message, setMessage } = useMessageStore();

  return (
    <div className="flex flex-col text-white">
      {contacts.map((contact) => {
        const cssClass = `p-2 border-b border-gray-600 hover:bg-slate-600 cursor-pointer ${
          contact.id === selectedContact?.id ? "bg-slate-600 bg-opacity-40" : ""
        }`;

        return (
          <div
            key={contact.id}
            className={cssClass}
            onClick={() => {
              const now = new Date().toISOString();
              setMessage({
                ...message,
                toUserId: parseInt(contact.id),
                createdAt: now,
              });

              setSelectedContact(contact);
            }}
          >
            {contact.name}
          </div>
        );
      })}
    </div>
  );
};
export default ContactsList;
