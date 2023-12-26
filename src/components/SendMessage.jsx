import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { push, ref, set, serverTimestamp } from "firebase/database";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter a valid message!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      const messagesRef = ref(db, "messages");
      const newMessageRef = push(messagesRef);

      await set(newMessageRef, {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });

      setValue("");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className="bg-gray-800 fixed bottom-0 w-full py-4 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-4 containerWrap flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input w-full focus:outline-none bg-gray-700 rounded-l-lg px-4 py-2"
          type="text"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r-lg px-6 py-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
