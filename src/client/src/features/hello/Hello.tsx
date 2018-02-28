import { Modal, modalClose, modalOpen } from "components";
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

class Hello extends Component<Props, State> {
  state = initialState;

  componentDidMount() {
    getValue().then(({ value }) => this.setState(setValue(value)));
  }

  submit = () => {
    const { props, state } = this;
    postValue(state.value).then(result => {
      if (result.success) {
        props.modalClose();
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
        <button onClick={props.modalClose}>Åpne skjema</button>
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
    modalOpen,
    modalClose
  })(Hello)
);
