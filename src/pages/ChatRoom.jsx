import ChatBox from "../components/ChatBox";
import SendMessage from "../components/SendMessage";

const ChatRoom = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
        <ChatBox />
      </div>
      <div className="">
        <SendMessage />
      </div>
    </div>
  );
};

export default ChatRoom;
