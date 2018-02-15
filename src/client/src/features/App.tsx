import React, { SFC } from "react";

import Home from "features/home/Home";

import styles from "./app.less";

interface Props {
  user: {
    name: string;
  };
}

const App: SFC<Props> = ({ user }) => (
  <div className={styles.app}>
    Hei {user.name}!
    <Home />
  </div>
);

export default App;
