import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:3000/api/auth/logout", {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    localStorage.clear();

    return () => {
      ignore = true;
      navigate("/");
    };
  }, []);

  return <></>;
}

export default LogOut;
