import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as authActions from "../../../../../../actions/auth";
import * as editProfileSettings from "../../../../../../services/editProfileSettings";

class DeleteProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleWarningModal = this.toggleWarningModal.bind(this);
    }

    toggleWarningModal() {
        this.setState(prev => {
            return {
                modalShow: !prev.modalShow
            };
        });
    }

    async handleSubmit() {
        const { history, dispatch } = this.props;

        try {
            await editProfileSettings.remove();

            dispatch(authActions.logOut());

            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { modalShow } = this.state;

        return (
            <>
                <h5>Danger zone:</h5>
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
                        <Button onClick={this.handleSubmit}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

DeleteProfileForm.propTypes = {
    onSubmitError: PropTypes.func,
    history: ReactRouterPropTypes.history,
    dispatch: PropTypes.func
};

const connectedDeleteProfileForm = connect()(DeleteProfileForm);

export default withRouter(connectedDeleteProfileForm);