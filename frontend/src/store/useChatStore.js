import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await api.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await api.get(`/message/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, message } = get();
    try {
      const res = await api.post(
        `/message/sendMessage/${selectedUser._id}`,
        messageData
      );
      set({ message: [...message, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    } 
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
