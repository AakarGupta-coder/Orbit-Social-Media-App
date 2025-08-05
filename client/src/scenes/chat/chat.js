import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io.connect("http://localhost:6001");

const Chat = () => {
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", { message, room });
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });
    }, [socket]);

    return (
        <ChatContainer>
            <h1>Chat Room</h1>
            <RoomInput
                placeholder="Room Number..."
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
            />
            <JoinButton onClick={joinRoom}>Join Room</JoinButton>
            <MessageInput
                placeholder="Message..."
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <SendButton onClick={sendMessage}>Send Message</SendButton>
            <h2>Message:</h2>
            {messageReceived}
        </ChatContainer>
    );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
`;

const RoomInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const MessageInput = styled(RoomInput)``;

const JoinButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const SendButton = styled(JoinButton)`
  background-color: #2196f3;
`;

export default Chat;
