import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import Error from "./pages/Error";
import MyTweets from "./pages/MyTweets";
import AllUsers from "./pages/AllUsers";
import SearchUser from "./pages/SearchUser";
import LoginForm from "./components/LoginForm";
import ForgetForm from "./components/ForgetForm";
import SignUp from "./components/SignUp";
import SignInSide from "./components/SignInSide";
import UpdateForm from "./components/UpdateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Feed />} />
          <Route path="*" element={<Error />} />
          <Route path="my_tweets" element={<MyTweets />} />
          <Route path="all_users" element={<AllUsers />} />
          <Route path="search_users" element={<SearchUser />} />
        </Route>

        <Route path="/login" exact element={<SignInSide />}>
          <Route index element={<LoginForm />} />
          <Route exact path="signup" element={<SignUp />} />
          <Route exact path="forgot" element={<ForgetForm />} />
          <Route path="update" exact element={<UpdateForm></UpdateForm>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
