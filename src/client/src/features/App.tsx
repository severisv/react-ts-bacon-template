import Layout from "features/common/Layout";
import Hello from "features/hello/Hello";
import Hello2 from "features/hello/Hello2";
import Home from "features/home/Home";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Store } from "Store";
import styles from "./app.less";

export default connect((state: Store) => ({ user: state.user }))(({ user }) => (
  <div className={styles.app}>
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/hello" component={Hello} />
          <Route path="/hellokitty" component={Hello2} />
          <Route render={() => <h3>"404"</h3>} />
        </Switch>
      </Router>
    </Layout>
  </div>
));
