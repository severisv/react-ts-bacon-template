import { initialModalState, modalKey } from "components";
import RepatchStore from "repatch";
import { printDiff } from "utils/debug";

interface User {
  name: string;
}

export interface InitialState {
  user: User;
}

export interface Store extends InitialState {
  [modalKey]: typeof initialModalState;
}

export const createStore = (initialState: InitialState) => {
  const store = new RepatchStore<Store>({
    [modalKey]: initialModalState,
    ...initialState
  });

  if (process.env.NODE_ENV !== "production") {
    let prevState = store.getState();

    store.subscribe(() => {
      const newState = store.getState();
      printDiff(prevState, newState, "Store");
      prevState = newState;
    });
  }

  return store;
};
