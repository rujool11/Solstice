import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender, isLastMessage } from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";
import { Tooltip, Avatar } from "@chakra-ui/react";
import { isSameSenderMargin } from "../../config/ChatLogics";
import "./styles.css";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          return (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, m, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}

              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#FFE4ED"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginBottom: "1px",
                  marginTop: "1px",
                }}
              >
                {m.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

// (m, i) ==== (message, index)

export default ScrollableChat;
