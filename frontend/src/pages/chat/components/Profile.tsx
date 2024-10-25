import { Contact } from "../../../interfaces";

const Profile = ({ selectedContact }: { selectedContact: Contact | null }) => {
  return (
    <div className="w-4/12 flex flex-col items-center py-10">
      <img
        src={`https://i.pravatar.cc/150?u=${selectedContact?.id}`}
        alt="profile"
        className="w-24 h-24 rounded-full"
      />
      <h1 className="text-xl mt-2 text-white">{selectedContact?.name}</h1>
    </div>
  );
};
export default Profile;
