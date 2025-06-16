import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import initBot from "../app/main";

initBot()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
