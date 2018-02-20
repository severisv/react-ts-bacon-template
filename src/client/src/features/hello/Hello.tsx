import Modal, { closeModal, openModal } from "components/modal/Modal";
import React, { Component, SFC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { get, post } from "utils/api";

const setValue = (value: string) => (state: State) => ({
  ...state,
  value
});

const setValidationError = (error: string) => (state: State) => ({
  ...state,
  error
});

interface State {
  value: string;
  error: string;
}

const initialState: State = {
  value: "",
  error: ""
};

interface Props extends RouteComponentProps<{}> {
  openModal: typeof openModal;
  closeModal: typeof closeModal;
}

class Hello extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    get<{ value: string }>("/api/value").then(({ value }) =>
      this.setState(setValue(value))
    );
  }

  setValue = (e: any) => this.setState(setValue(e.target.value));

  setValidationError = (error: string) =>
    this.setState(setValidationError(error));

  submit = () =>
    post<{ success: boolean }>("/api/value", {
      value: this.state.value
    }).then(result => {
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
