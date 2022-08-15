import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import tweetReducer from "./features/tweet/tweetSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweet: tweetReducer,
  },
});
