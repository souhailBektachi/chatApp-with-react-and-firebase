import { UserAuth } from "../context/AuthContext";
import { useSpring, animated } from "react-spring";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();

  const navbarProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <animated.div
      style={navbarProps}
      className="navbar fixed z-10 bg-gray-800 text-white shadow-md"
    >
      <div className="containerWrap flex justify-between items-center py-2">
        <animated.a
          href="/"
          style={navbarProps}
          className="btn btn-ghost normal-case text-lg font-bold"
        >
          GLSID CHAT
        </animated.a>
        {currentUser && (
          <animated.button
            onClick={handleLogout}
            className="btn btn-ghost normal-case text-sm transition duration-300 hover:text-gray-300"
          >
            Logout
          </animated.button>
        )}
      </div>
    </animated.div>
  );
};

export default Navbar;
