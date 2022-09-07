import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetCard from "../components/TweetCard";
import { Grid } from "@mui/material";
import { getMyTweets } from "../features/tweet/tweetSlice";
import { useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";

const MyTweets = () => {
  const dispatch = useDispatch();
  const { myTweets,isLoading } = useSelector((state) => state.tweet);
  const { isLoggedIn,token, userId } = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  
  useEffect(() => {
    dispatch(getMyTweets({ token, userId }));
  }, [token, userId, dispatch]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Tweets</h1>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        {myTweets.length===0 && isLoading === true ? (
            <Spinner animation="border" variant="primary" style={{margin:" auto",marginTop:"40%"}} />
          ) :(myTweets?.map((tweet) => (
          <Grid item md key={tweet.updateDateTime}>
            <TweetCard
              id={tweet.tweetId}
              displayName={tweet.createdByName}
              username={tweet.createdById}
              text={tweet.message}
              liked={tweet.hasLiked}
              likeCount={tweet.tweetLikesCount}
              replies={tweet.tweetReply}
              myTweet={true}
              tag={tweet.tag}
              createdTime={tweet.updateDateTime}
            />
          </Grid>
        )))}
      </Grid>
    </>
  );
};

export default MyTweets;
