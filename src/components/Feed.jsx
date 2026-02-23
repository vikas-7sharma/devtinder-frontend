import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      // Prevent refetch if already loaded
      if (feed && feed.length > 0) return;

      const res = await axios.get(`${BASE_URL}user/feed`, {
        withCredentials: true,
      });

      // IMPORTANT: backend sends { data: users }
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Feed Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Loading state
  if (!feed) return <h1 className="text-center mt-10">Loading...</h1>;

  // Empty feed state
  if (feed.length === 0)
    return <h1 className="text-center mt-10">No Users Found</h1>;

  return (
    <div className="flex justify-center my-10">
      {/* Show first user card */}
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;