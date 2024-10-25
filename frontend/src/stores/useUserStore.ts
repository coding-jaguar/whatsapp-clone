// src/stores/useUserStore.ts
import { create } from "zustand";
import { Contact } from "../interfaces";
import api from "../axios";

interface UserState {
  contacts: Contact[] | null;
  fetchContacts: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  contacts: null,
  fetchContacts: async () => {
    try {
      const response = await api.get("/contacts/get-all-contacts");

      const contactsList: Contact[] = response.data.map((contact: any) => ({
        id: contact.contact.id,
        name: contact.contact.name,
      }));
      set({ contacts: contactsList });
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  },
}));

export default useUserStore;
