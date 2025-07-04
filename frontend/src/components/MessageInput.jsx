import { Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
export default function MessageInput() {
  //   const [text, setText] = useState("");
  const [imagePrieview, setImagePrieveiw] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    image: null,
  });

  const { sendMessage } = useChatStore();

  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setImagePrieveiw(URL.createObjectURL(file));

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setImagePrieveiw(reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePrieveiw(null);
    setFormData((prev) => ({ ...prev, image: null }));

    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    // if (!text.trim() && !imagePrieview) return;
    try {
      let payload = formData;
      if (formData.image) {
        payload = new window.FormData();
        payload.append("text", formData.text);
        payload.append("files", formData.image);
      }
      await sendMessage(payload);
      setFormData({ text: "", image: null });
      setImagePrieveiw(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Error while sending the message");
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePrieview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePrieview}
              alt="Preiveiew"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={formData.text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, text: e.target.value }))
            }
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePrieview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!formData.text.trim() && !formData.image}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}
