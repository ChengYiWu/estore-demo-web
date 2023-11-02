import { createBrowserRouter } from "react-router-dom";
import App from "./App";


// 因為要可以在 component tree 之外使用 navigate function
// Ref: https://github.com/remix-run/react-router/issues/9422
const router = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> },
]);

export default router;
