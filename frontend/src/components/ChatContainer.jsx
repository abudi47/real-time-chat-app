import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";
export default function ChatContainer() {
  const { isMessageLoading, messages, getMessage, selectedUser } =
    useChatStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser._id);
    }
  }, [selectedUser?._id, getMessage]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>message ....</p>

      <MessageInput />
    </div>
  );
}
