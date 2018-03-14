import Layout from "features/common/Layout";
import Home from "features/home/Home";
import Sample from "features/sample/Sample";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Store } from "Store";
import styles from "./app.less";

export default connect((state: Store) => ({ user: state.user }))(_ => (
  <div className={styles.app}>
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sample" component={Sample} />
          <Route render={() => <h3>"404"</h3>} />
        </Switch>
      </Router>
    </Layout>
  </div>
));
