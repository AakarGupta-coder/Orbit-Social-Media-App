import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts) || []; // Ensure posts is always an array
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("Fetched posts:", data); // Debugging log
      dispatch(setPosts({ posts: Array.isArray(data) ? data : [] })); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("Fetched user posts:", data); // Debugging log
      dispatch(setPosts({ posts: Array.isArray(data) ? data : [] })); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId, token, dispatch]); // Added dependencies to prevent stale state

  return (
      <>
        {Array.isArray(posts) && posts.length > 0 ? (
            posts.map(
                ({
                   _id,
                   userId,
                   firstName,
                   lastName,
                   description,
                   location,
                   picturePath,
                   userPicturePath,
                   likes,
                   comments,
                 }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )
        ) : (
            <p>No posts available</p> // Prevents crash when posts is undefined or empty
        )}
      </>
  );
};

export default PostsWidget;
