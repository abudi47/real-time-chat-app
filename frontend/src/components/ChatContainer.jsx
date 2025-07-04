import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
export default function ChatContainer() {
  const {
    isMessageLoading,
    messages,
    getMessage,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();

  const messageEndRef = useRef(null);
  const { authUser } = useAuthStore();
  console.log("mesagae", messages);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser._id);
      subscribeToMessages();

      return () => unSubscribeFromMessages();
    }
  }, [
    selectedUser?._id,
    getMessage,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((message) => (
          <div
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            key={message._id}
            ref={messageEndRef}
          >
            <div className="chat-image  avatar">
              <div className="size-10 rounded-full border ">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profilePic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time dateTime="text-xs opacity-50 ml-1 ">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.files.length > 0 && (
                <img
                  src={message.files}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}
