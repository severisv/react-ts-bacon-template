import Modal, { closeModal, openModal } from "components/modal/Modal";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { getValue, postValue } from "./endpoints";

const initialState = {
  value: "",
  error: ""
};

type State = typeof initialState;

interface Props extends RouteComponentProps<{}> {
  openModal: typeof openModal;
  closeModal: typeof closeModal;
}

const setValue = (value: string) => (state: State): State => ({
  ...state,
  value
});

const setValidationError = (error: string) => (state: State): State => ({
  ...state,
  error
});

class Hello extends Component<Props, State> {
  state = initialState;

  componentDidMount() {
    getValue().then(({ value }) => this.setState(setValue(value)));
  }

  submit = () => {
    const { props, state } = this;
    postValue(state.value).then(result => {
      if (result.success) {
        props.closeModal();
        props.history.push("/");
      } else {
        this.setState(setValidationError("It didn't work"));
      }
    });
  };

  render() {
    const { props, state } = this;
    return (
      <div>
        <p>Hello</p>
        <button onClick={props.openModal}>Åpne skjema</button>
        <Modal>
          <div>
            <input
              onChange={e => this.setState(setValue(e.target.value))}
              type="text"
              value={state.value}
            />
            <span style={{ color: "red" }}>{state.error}</span>
            <button onClick={this.submit}>send</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(
  connect(undefined, {
    openModal,
    closeModal
  })(Hello)
);
