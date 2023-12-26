import { ref, onValue, orderByChild, limitToFirst } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { query } from "firebase/database";
import { useSpring, animated } from "react-spring";
import Message from "./Message";

const ChatBox = () => {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    const q = query(messagesRef, orderByChild("createdAt"), limitToFirst(50));
    const unsubscribe = onValue(q, (snapshot) => {
      const messages = snapshot.val() || {};
      const orderedMessages = Object.values(messages).sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setMessages(orderedMessages);
    });

    return () => unsubscribe;
  }, []);

  return (
    <animated.div style={fadeInProps} className="pb-44 pt-20 containerWrap">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </animated.div>
  );
};

export default ChatBox;
