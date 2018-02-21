import Modal, { closeModal, openModal } from "components/modal/Modal";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { getValue, postValue } from "./endpoints";

interface State {
  value: string;
  error: string;
}

const initialState: State = {
  value: "",
  error: ""
};

const setValue = (value: string) => (state: State): State => ({
  ...state,
  value
});

const setValidationError = (error: string) => (state: State): State => ({
  ...state,
  error
});

interface Props extends RouteComponentProps<{}> {
  openModal: typeof openModal;
  closeModal: typeof closeModal;
}

class Hello extends Component<Props, State> {
  state = initialState;

  componentDidMount() {
    getValue().then(({ value }) => this.setState(setValue(value)));
  }

  setValue = (e: any) => this.setState(setValue(e.target.value));

  setValidationError = (error: string) =>
    this.setState(setValidationError(error));

  submit = () =>
    postValue(this.state.value).then(result => {
      if (result.success) {
        this.props.closeModal();
        this.props.history.push("/");
      } else {
        this.setValidationError("It didn't work");
      }
    });

  render() {
    const { props, state } = this;
    return (
      <div>
        <p>Hello</p>
        <button onClick={props.openModal}>Åpne skjema</button>
        <Modal>
          <div>
            <input onChange={this.setValue} type="text" value={state.value} />
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
