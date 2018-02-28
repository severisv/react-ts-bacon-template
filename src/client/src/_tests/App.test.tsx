import App from "features/App";
import React from "react";
import renderer from "react-test-renderer";
import TestProvider from "./testutil/TestProvider";

test(`render app`, () => {
  renderer.create(
    <TestProvider>
      <App />
    </TestProvider>
  );
});
