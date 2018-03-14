import { Modal, modalClose, modalOpen } from "components";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import component, { UpdateFn } from "utils/component";
import { getValue, postValue } from "./endpoints";

const initialState = {
  value: "initialValue",
  error: ""
};

type State = typeof initialState;

interface Props extends RouteComponentProps<{}> {
  modalOpen: typeof modalOpen;
  modalClose: typeof modalClose;
}

const setValue = (value: string) => (state: State): State => ({
  ...state,
  value
});

const setValidationError = (error: string) => (state: State): State => ({
  ...state,
  error
});

const submit = (props: Props, state: State, update: UpdateFn<State>) => () => {
  postValue(state.value).then(result => {
    if (result.success) {
      props.modalClose();
      props.history.push("/");
    } else {
      update(setValidationError("It didn't work"));
    }
  });
};

const Hello = component<Props, State>(initialState, {
  componentDidMount: ({ update }) =>
    getValue().then(({ value }) => update(setValue(value)))
})(({ props, state, update }) => (
  <div>
    <p>Hello</p>
    <button onClick={props.modalOpen}>Åpne skjema</button>
    <Modal>
      <div>
        <input
          onChange={e => update(setValue(e.target.value))}
          type="text"
          value={state.value}
        />
        <span>{state.error}</span>
        <button onClick={submit(props, state, update)}>send</button>
      </div>
    </Modal>
  </div>
));

export default withRouter(
  connect(undefined, {
    modalOpen,
    modalClose
  })(Hello)
);
