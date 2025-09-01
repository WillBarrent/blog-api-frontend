import "./App.css";
import Header from "./Components/Header/Header";
import SignUp from "./Pages/SignUp/SignUp";
import BlogCardsSection from "./Components/BlogCardsSection/BlogCardsSection";
import Login from "./Pages/Login/Login";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const locationPathName = location.pathname;

  return (
    <>
      <Header />
      {locationPathName === "/sign-up" ? (
        <SignUp />
      ) : locationPathName === "/login" ? (
        <Login />
      ) : (
        <BlogCardsSection />
      )}
    </>
  );
}

export default App;
