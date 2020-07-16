import * as React from "react";
import { Modal } from "@material-ui/core";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export class SMSModal extends React.Component<IProps, {}> {
  renderModalBody() {
    return <div>SMS Modal</div>;
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal open={isOpen} onClose={onClose}>
        {this.renderModalBody()}
      </Modal>
    );
  }
}
