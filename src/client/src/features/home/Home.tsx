import React, { SFC } from "react";

import { Link } from "react-router-dom";
import styles from "./home.less";

interface Props {}

const Home: SFC<Props> = ({}) => (
  <div className={styles.home}>
    <p>Hei</p>
    <Link to="/sample">Hello</Link>
  </div>
);

export default Home;
