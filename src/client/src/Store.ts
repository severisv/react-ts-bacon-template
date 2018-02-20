import { initialModalState, modalKey } from "components/modal/Modal";
import RepatchStore from "repatch";
import { InitialState } from "./Index";

export interface Store extends InitialState {
  [modalKey]: typeof initialModalState;
}

export const createStore = (initialState: InitialState) =>
  new RepatchStore<Store>({
    [modalKey]: initialModalState,
    ...initialState
  });
