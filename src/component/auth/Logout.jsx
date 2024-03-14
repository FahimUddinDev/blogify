import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("authData");
    navigate("/login");
  };

  return (
    <button className="icon-btn" onClick={handleLogout}>
      <span className="text-white/50 hover:text-white transition-all duration-200">
        Logout
      </span>
    </button>
  );
};

export default Logout;
