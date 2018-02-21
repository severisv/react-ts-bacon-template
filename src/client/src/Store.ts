import { initialModalState, modalKey } from "components/modal/Modal";
import RepatchStore from "repatch";

interface User {
  name: string;
}

export interface InitialState {
  user: User;
}

export interface Store extends InitialState {
  [modalKey]: typeof initialModalState;
}

export const createStore = (initialState: InitialState) =>
  new RepatchStore<Store>({
    [modalKey]: initialModalState,
    ...initialState
  });
