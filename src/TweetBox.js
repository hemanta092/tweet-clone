import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./TweetBox.css";

import { useSelector, useDispatch } from "react-redux";
import { addTweet } from "./features/tweet/tweetSlice";
import { Button } from "@mui/material";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetTag, setTweetTag] = useState("");

  const { token } = useSelector((state) => state.user);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const sendTweet = (e) => {
    e.preventDefault();
    if (tweetMessage.length !== 0) {
      const variant = "success";
      const data = {
        body: {
          message: tweetMessage,
          tag: tweetTag,
        },
        token,
      };
      dispatch(addTweet(data));
      setTweetMessage("");
      setTweetTag("");
      enqueueSnackbar("Tweeted Posted Successfully", { variant });
    } else {
      const variant = "error";
      enqueueSnackbar("Tweet cannot be empty", { variant });
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
            maxLength="144"
            autoFocus
          />
        </div>
        <div className="tweetBox__input">
          <input
            onChange={(e) => setTweetTag(e.target.value)}
            value={tweetTag}
            placeholder="#trending"
            type="text"
            maxLength="50"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
