import React, { SFC } from "react";

import styles from "./home.less";

interface Props {}

const Home: SFC<Props> = ({}) => (
  <div className={styles.home}>
    <p>Hei</p>
  </div>
);

export default Home;
