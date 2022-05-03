import { Link } from "react-router-dom";

import "./Navbar.css";
import Temple from "../assets/temple.svg";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

export const Navbar = () => {
  const { user } = useAuth();
  const { logout, isPending } = useLogout()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="Dojo Logo" />
          <span>The Dojo</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
            {isPending && <button className="btn" disabled >Loading...</button>}
          </li>
        )}
      </ul>
    </div>
  );
};
