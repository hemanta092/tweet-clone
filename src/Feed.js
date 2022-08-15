import React, { useEffect } from "react";
import TweetBox from "./TweetBox";
import "./Feed.css";
import { useNavigate } from "react-router";
import { getTweets } from "./features/tweet/tweetSlice";
import { Divider, Grid } from "@mui/material";
import TweetCard from "./components/TweetCard"
import { useSelector, useDispatch } from "react-redux";


function Feed() {
  const { isLoggedIn, token } = useSelector((state) => state.user);
  const { tweets } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    dispatch(getTweets(token));
  }, [dispatch, token]);

  return (
    <>
      <div className="feed">
        <TweetBox />
        <Divider />
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {tweets?.map((post) => (
            <Grid item md key={post.tweetId}>
              <TweetCard
                id={post.tweetId}
                displayName={post.createdByName}
                username={post.createdById}
                text={post.message}
                liked={post.hasLiked}
                likeCount={post.tweetLikesCount}
                replies={post.tweetReply}
                myTweet={false}
                tag={post.tag}
                createdTime={post.updateDateTime}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Feed;
