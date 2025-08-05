import {
    ChatBubbleOutlineOutlined,
    StarBorderOutlined,
    StarOutlined,
    ShareOutlined,
    RocketLaunchOutlined, // Updated send button icon
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    InputBase,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
                        postId,
                        postUserId,
                        name,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments: initialComments,
                    }) => {
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(initialComments || []);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const addComment = async () => {
        if (!newComment.trim()) return;

        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        setNewComment("");

        const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
        });

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addComment();
        }
    };

    const handleShare = () => {
        const postUrl = `${window.location.origin}/post/${postId}`;

        if (navigator.share) {
            navigator.share({
                title: "Check out this post on Orbit!",
                text: description,
                url: postUrl,
            }).catch((error) => console.log("Error sharing:", error));
        } else {
            navigator.clipboard.writeText(postUrl);
            alert("Post link copied to clipboard!");
        }
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <StarOutlined sx={{ color: primary }} />
                            ) : (
                                <StarBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton onClick={handleShare}>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {isComments && (
                <Box mt="0.5rem">
                    {/* Comment Input Box */}
                    <FlexBetween sx={{ gap: "0.5rem", p: "0.5rem" }}>
                        <InputBase
                            fullWidth
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                            sx={{
                                backgroundColor: palette.neutral.light,
                                borderRadius: "1rem",
                                padding: "0.5rem 1rem",
                            }}
                        />
                        <IconButton onClick={addComment} sx={{ color: primary }}>
                            <RocketLaunchOutlined /> {/* 🚀 Rocket icon added here */}
                        </IconButton>
                    </FlexBetween>

                    {/* Existing Comments */}
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
