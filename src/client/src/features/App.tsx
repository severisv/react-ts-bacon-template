import Modal from "components/modal/Modal";
import Hello from "features/hello/Hello";
import Home from "features/home/Home";
import React, { SFC } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Store } from "Store";
import styles from "./app.less";

export default connect((state: Store) => ({ state, user: state.user }))(
  ({ user, state }) => (
    <div className={styles.app}>
      Hei {user.name}!
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/hello" component={Hello} />
          <Route render={() => <h3>"404"</h3>} />
        </Switch>
      </Router>
    </div>
  )
);
