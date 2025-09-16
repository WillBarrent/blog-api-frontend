import App from "./App.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-up",
    element: <App />,
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/posts/:postId",
    element: <App />,
  }
];

export default routes;
