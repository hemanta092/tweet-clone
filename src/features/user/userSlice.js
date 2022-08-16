import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const refURLT = "https://tweet-postgress-service.herokuapp.com/tweet/";
const refURLA = "https://tweet-postgress-auth.herokuapp.com/auth/";
// const refURLT = "http://localhost:8082/tweet/";
// const refURLA = "http://localhost:8081/auth/";

const loginurl = refURLA + "login";
const validateUrl = refURLA + "validate";
const signupURL = refURLA + "register";
const signoutURL = refURLT + "logout";
const forgotURL = refURLA + "forget";
const updatePasswordURL = refURLA + "updatePassword";

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  userId: "",
  token: "",
  forgotUserid: "",
};

const defaultState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  userId: "",
  token: "",
  forgotUserid: "",
};

export const loginRequest = createAsyncThunk(
  "user/loginRequest",
  async (reqBody) => {
    try {
      const resp = await axios.post(loginurl, reqBody);
      return resp.data;
    } catch (error) {
      throw new Error();
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (reqBody, thunkAPI) => {
    let headers = {
      Authorization: reqBody,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Controll-Allow-Methods": "*",
    };
    try {
      const resp = await axios.get(validateUrl, { headers });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const signupRequest = createAsyncThunk(
  "user/signupRequest",
  async (reqBody) => {
    try {
      const res = await axios.post(signupURL, reqBody.body);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const signoutRequest = createAsyncThunk(
  "user/signout",
  async (reqBody) => {
    try {
      const res = await axios.get(signoutURL, {
        headers: {
          Authorization: reqBody.token,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const forgotRequest = createAsyncThunk(
  "user/forgotRequest",
  async (reqBody) => {
    try {
      const res = await axios.post(forgotURL, reqBody);
      if (res.data.valid === false) throw new Error();
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (reqBody) => {
    try {
      const res = await axios.post(updatePasswordURL, reqBody);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateForgotUserid: (state, action) => {
      state.forgotUserid = action.payload;
    },
  },
  extraReducers: {
    [loginRequest.pending]: (state) => {
      state.isLoading = true;
    },

    [loginRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.user.name = action.payload.userName;
      state.token = `Bearer ${action.payload.authToken}`;
    },
    [loginRequest.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
    [getUser.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
    [signoutRequest.fulfilled]: (state) => {
      Object.assign(state, defaultState);
    },
    [forgotRequest.fulfilled]: (state, action) => {},
    [signupRequest.fulfilled]: (state, action) => {},
    [updatePassword.fulfilled]: (state, action) => {},
  },
});

export const { handleLogin, updateForgotUserid } = userSlice.actions;

export default userSlice.reducer;
