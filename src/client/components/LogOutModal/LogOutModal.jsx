import * as React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LogOutModal = ({ onHide, onLogOut, show }) => {
    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
            show={show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Log out
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to log-off?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onLogOut}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
};

LogOutModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onLogOut: PropTypes.func.isRequired
};

export default LogOutModal;