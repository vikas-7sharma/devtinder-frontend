import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_URL + "profile", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  } catch (err) {
    console.error(
      "Fetch User Error:",
      err.response?.data || err.message
    );

    if (err.response?.status === 401) {
      navigate("/login");
    }
  }
};

  useEffect(() => {
    fetchUser();   // ✅ CALL THE FUNCTION HERE
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <footer />
    </div>
  );
};

export default Body;
