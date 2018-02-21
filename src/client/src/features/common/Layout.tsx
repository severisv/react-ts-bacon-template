import React, { SFC } from "react";
import Header from "./Header";
import styles from "./layout.less";

const Layout: SFC = ({ children }) => (
  <div>
    <Header />
    <div className={styles.container}>{children}</div>
  </div>
);

export default Layout;
