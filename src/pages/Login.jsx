import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signinWithGoogle } = UserAuth();

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const textProps = useSpring({
    opacity: 1,
    from: { opacity: 0, marginTop: -20 },
    config: { duration: 800 },
  });

  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser, navigate]);

  return (
    <animated.div
      style={props}
      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 min-h-screen flex items-center justify-center"
    >
      <div className="text-white text-center">
        <animated.h1 style={textProps} className="text-5xl font-bold mb-4">
          Welcome to GLSID-CHAT 👋🏻
        </animated.h1>
        <animated.p style={textProps} className="text-lg mb-8">
          Join the conversation, meet new people, and make connections in one
          shared room.
        </animated.p>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Login With Google
        </button>
      </div>
    </animated.div>
  );
};

export default Login;
