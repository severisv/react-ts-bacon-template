import React from "react";
import ReactDOM from "react-dom";
import App from "./features/App";

interface User {
  name: string;
}

interface InitialState {
  user: User;
}

declare var window: { initialState: InitialState };

const initialState = window.initialState;

ReactDOM.render(<App {...initialState} />, document.getElementById("root"));

declare var module: any;
// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
