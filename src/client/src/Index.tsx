import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./features/App";
import { createStore, InitialState } from "./Store";

declare var window: { initialState: InitialState };

const initialState = window.initialState;

const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store as any}>
    <App />
  </Provider>,
  document.getElementById("root")
);

declare var module: any;
// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
