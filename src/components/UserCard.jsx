import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    Age,
    about,
    Gender,
  } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      setLoading(true);

      await axios.post(
        `${BASE_URL}request/send/${status}/${userId}`, // 🔥 safer URL
        {},
        { withCredentials: true }
      );

      // Remove user from feed after sending request
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(
        "Send Request Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="h-80 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {Age && Gender && (
          <p className="text-gray-400">
            {Age}, {Gender}
          </p>
        )}

        <p>{about}</p>

        <div className="card-actions justify-center my-4 gap-4">
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-secondary"
            disabled={loading}
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;