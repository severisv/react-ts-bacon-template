import React, { SFC } from "react";
import { connect } from "react-redux";
import { Store } from "Store";
import { combine, Reducer } from "utils/repatch";
import styles from "./modal.less";

export const modalKey = "modal";
const reduce = (reducer: Reducer<State>) => combine<State>(modalKey, reducer);

interface State {
  isVisible: boolean;
}

export const initialModalState: State = {
  isVisible: false
};

export const closeModal = () => reduce(state => ({ isVisible: false }));
export const openModal = () => reduce(state => ({ isVisible: true }));

export default connect(
  (state: Store) => ({
    ...state[modalKey]
  }),
  { close: closeModal }
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
