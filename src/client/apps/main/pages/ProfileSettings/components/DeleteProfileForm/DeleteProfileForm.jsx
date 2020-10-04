import * as React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class DeleteProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false
        }

        // this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleWarningModal = this.toggleWarningModal.bind(this);
    }

    toggleWarningModal() {
        this.setState(prev => {
            return {
                modalShow: !prev.modalShow
            };
        });
    }

    render() {
        const { modalShow } = this.state;

        return (
            <>
                <h5>Danger zone</h5>
                <Button variant="danger"
                        onClick={this.toggleWarningModal}>Delete profile</Button>

                <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={this.toggleWarningModal}
                    show={modalShow}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Delete profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete profile?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

DeleteProfileForm.propTypes = {
    onSubmitError: PropTypes.func
};

export default DeleteProfileForm;