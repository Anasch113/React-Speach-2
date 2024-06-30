import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./GlobalState/store";
import { Provider } from "react-redux";
// import "../src/css/mainglobal.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
   
      <App />
    </Provider>
  </>
);
