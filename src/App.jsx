import "./App.css";
import Header from "./Components/Header/Header";
import SignUp from "./Pages/SignUp/SignUp";
import BlogCardsSection from "./Components/BlogCardsSection/BlogCardsSection";
import Login from "./Pages/Login/Login";
import { useLocation, useParams } from "react-router-dom";
import Post from "./Pages/Post/Post";
import LogOut from "./Pages/LogOut/LogOut";

function App() {
  const location = useLocation();
  const locationPathName = location.pathname;
  const params = useParams();
  const postId = params.postId;

  return (
    <>
      <Header />
      {locationPathName === "/sign-up" ? (
        <SignUp />
      ) : locationPathName === "/login" ? (
        <Login />
      ) : postId !== undefined ? (
        <Post />
      ) : locationPathName === "/log-out" ? (
        <LogOut />
      ) : (
        <BlogCardsSection />
      )}
    </>
  );
}

export default App;
