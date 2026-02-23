import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(removeUser());
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm px-6">
      {/* Left */}
      <div className="flex-1">
        <span
          className="btn btn-ghost text-xl"
          onClick={() => navigate("/")}
        >
          DevTinder
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            {/* Welcome text */}
            <span className="hidden md:block font-medium">
              Welcome, <span className="font-bold">{user.firstName}</span>
            </span>

            {/* Profile dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={() => navigate("/profile")}>Profile</a>
                </li>

                {/* Connections Button */}
                <li>
                  <a onClick={() => navigate("/connections")}>
                    Connections
                  </a>
                </li>

                {/* 🔥 NEW Requests Button */}
                <li>
                  <a onClick={() => navigate("/request")}>
                    Requests
                  </a>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;