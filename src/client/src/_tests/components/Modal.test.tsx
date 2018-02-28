import { Modal, modalClose, modalOpen } from "components";
import React from "react";
import renderer from "react-test-renderer";
import TestProvider from "../testutil/TestProvider";

test(`render Modal with initialState returns null`, () => {
  const component = renderer
    .create(
      <TestProvider>
        <Modal />
      </TestProvider>
    )
    .toJSON();

  expect(component).toBeNull();
});

test(`render Modal dispatch modalOpen returns component`, () => {
  const component = renderer
    .create(
      <TestProvider dispatch={[modalOpen]}>
        <Modal />
      </TestProvider>
    )
    .toJSON();

  expect(component).not.toBeNull();
});

test(`render Modal dispatch modalOpen, then modalClose returns null`, () => {
  const component = renderer
    .create(
      <TestProvider dispatch={[modalOpen, modalClose]}>
        <Modal />
      </TestProvider>
    )
    .toJSON();

  expect(component).toBeNull();
});
