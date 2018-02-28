import React from "react";
import MockRouter from "react-mock-router";
import { Provider } from "react-redux";
import { createStore, InitialState, Store } from "store";

const initialStore: InitialState = {
  user: {
    name: "Frank"
  }
};

interface Props {
  initialState?: (state: Store) => Store;
  // tslint:disable-next-line:ban-types
  dispatch?: Function[];
  children: React.ReactNode | React.ReactNode[];
}

export default ({ children, initialState, dispatch = [] }: Props) => {
  const initState = initialState
    ? initialState(createStore(initialStore).getState())
    : initialStore;
  const store = createStore({ ...initialStore, ...initState } as any);
  dispatch.forEach(fn => store.dispatch(fn() as any));

  return (
    <MockRouter>
      <Provider store={store as any}>{children}</Provider>
    </MockRouter>
  );
};
