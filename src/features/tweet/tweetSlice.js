import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const refURL = "https://tweet-postgress-service.herokuapp.com/tweet/";
// const refURL = "http://localhost:8082/tweet/";
const getTweetUrl = refURL + "getAllTweets";
const addTweetUrl = refURL + "addTweet";
const getMyTweetsUrl = refURL + "getTweetsByUserId";
const getAllUsersUrl = refURL + "getAllUsers";
const searchUserURL = refURL + "searchByUserName";
const likeTweetURL = refURL + "likeTweet";
const replyTweetURL = refURL + "replyTweet";
const editTweetURL = refURL + "updateTweet";
const deleteTweetURL = refURL + "deleteTweet";

const initialState = {
  isLoading: false,
  tweets: [],
  myTweets: [],
  allUsers: [],
  searchUserResults: [],
};

export const getTweets = createAsyncThunk(
  "tweet/getTweets",
  async (reqBody, thunkAPI) => {
    try {
      const resp = await axios.get(getTweetUrl, {
        headers: {
          Authorization: reqBody,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const addTweet = createAsyncThunk(
  "tweet/addTweet",
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.post(addTweetUrl, reqBody.body, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getMyTweets = createAsyncThunk(
  "tweet/getMyTweetsgetMyTweets",
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.get(`${getMyTweetsUrl}/${reqBody.userId}`, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "tweet/getAllUsers",
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.get(getAllUsersUrl, {
        headers: {
          Authorization: reqBody,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const searchUserByUsername = createAsyncThunk(
  "tweet/searchUserByUsername",
  async (reqBody, thunkAPI) => {
    try {
      const res = await axios.get(`${searchUserURL}/${reqBody.userInput}`, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const likeTweet = createAsyncThunk("likeTweet", async (reqBody) => {
  try {
    const res = await axios.get(`${likeTweetURL}/${reqBody.tweetId}`, {
      headers: {
        Authorization: reqBody.token,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const tweetReply = createAsyncThunk("tweetReply", async (reqBody) => {
  try {
    const res = await axios.post(
      `${replyTweetURL}/${reqBody.tweetId}`,
      reqBody.body,
      {
        headers: {
          Authorization: reqBody.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const editTweet = createAsyncThunk("editTweet", async (reqBody) => {
  try {
    const res = await axios.post(editTweetURL, reqBody.body, {
      headers: {
        Authorization: reqBody.token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const deleteTweet = createAsyncThunk("deleteTweet", async (reqBody) => {
  try {
    const res = await axios.get(`${deleteTweetURL}/${reqBody.tweetId}`, {
      headers: {
        Authorization: reqBody.token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getTweetsData: (state, action) => {
      const details = action.payload;
      state.loginInput = details;
    },
  },
  extraReducers: {
    [getTweets.pending]: (state) => {
      state.isLoading = true;
    },
    [getTweets.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tweets = action.payload;
    },
    [getTweets.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addTweet.fulfilled]: (state, action) => {
      state.tweets = [action.payload, ...state.tweets];
    },
    [getMyTweets.fulfilled]: (state, action) => {
      state.myTweets = action.payload;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
    },
    [searchUserByUsername.fulfilled]: (state, action) => {
      state.searchUserResults = action.payload;
    },
    [likeTweet.fulfilled]: (state, action) => {
      state.tweets = state.tweets.map((t) => {
        console.log(action.payload);
        if (t.tweetId === action.payload.tweetId) {
          t.hasLiked = action.payload.hasLiked;
          t.tweetLikes = action.payload.tweetLikes;
          t.tweetLikesCount = action.payload.tweetLikesCount;
          t.updateDateTime = action.payload.updateDateTime;
        }
        return t;
      });

      state.myTweets = state.myTweets.map((t) => {
        if (t.tweetId === action.payload.tweetId) {
          t.hasLiked = action.payload.hasLiked;
          t.tweetLikes = action.payload.tweetLikes;
          t.tweetLikesCount = action.payload.tweetLikesCount;
          t.updateDateTime = action.payload.updateDateTime;
        }
        return t;
      });
    },
    [tweetReply.fulfilled]: (state, action) => {
      console.log(action);
      state.tweets = state.tweets.map((t) => {
        if (t.tweetId === action.payload.tweetId) {
          t.tweetReply = action.payload.tweetReply;
          t.updateDateTime = action.payload.tweetLikesCount;
        }
        return t;
      });
      state.myTweets = state.myTweets.map((t) => {
        if (t.tweetId === action.payload.tweetId) {
          t.tweetReply = action.payload.tweetReply;
          t.updateDateTime = action.payload.tweetLikesCount;
        }
        return t;
      });
    },
    [editTweet.fulfilled]: (state, action) => {
      state.tweets = state.tweets.map((t) => {
        if (t.tweetId === action.payload.tweetId) {
          t.message = action.payload.message;
        }
        return t;
      });
      state.myTweets = state.myTweets.map((t) => {
        if (t.tweetId === action.payload.tweetId) {
          t.message = action.payload.message;
        }
        return t;
      });
    },
    [deleteTweet.fulfilled]: (state, action) => {
      state.tweets = state.tweets.filter(
        (item) => item.tweetId !== action.payload.tweetId
      );
      state.myTweets = state.myTweets.filter(
        (item) => item.tweetId !== action.payload.tweetId
      );
    },
  },
});

//export const { handleLogin } = tweetSlice.actions;

export default tweetSlice.reducer;
