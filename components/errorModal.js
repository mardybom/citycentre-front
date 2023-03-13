import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

const ErrorModal = (props) => {
  if (props.error)
    return (
      <Modal isOpen={props.errorModal}>
        <ModalHeader>{props.error.title}</ModalHeader>
        <ModalBody>
          <p>{props.error.message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              props.setErrorModal(false);
              props.refresh();
            }}
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );

  return null;
};

export default ErrorModal;
