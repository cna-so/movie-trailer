import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "App";
import store from 'app/store'
import GlobalStyle from "GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
