import React from "react";
import { connect } from "react-redux";
import { Store } from "Store";
import { combine, Reducer } from "utils/repatch";
import styles from "./modal.less";

export const modalKey = "modal";
const update = (reducer: Reducer<State>) => combine<State>(modalKey, reducer);

interface State {
  isVisible: boolean;
}

export const initialModalState: State = {
  isVisible: false
};

export const modalClose = () => update(_ => ({ isVisible: false }));
export const modalOpen = () => update(_ => ({ isVisible: true }));

export const Modal = connect(
  (state: Store) => ({
    ...state[modalKey]
  }),
  { close: modalClose }
)(
  props =>
    props.isVisible ? (
      <div className={styles.modal}>
        <div className={styles.overlay} onClick={props.close} />
        <div className={styles.wrapper}>
          <div className={styles.window}>{props.children}</div>
        </div>
      </div>
    ) : null
);
