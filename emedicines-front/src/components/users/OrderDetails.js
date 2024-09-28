import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export default function OrderDetails(props){
    const [show, setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow = () =>setShow(true);
    console.log(props);

    return(
        <>
            <Button variant='primary' onClick={handleShow}>
                Launch modal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.title>Modal heading</Modal.title>
                </Modal.Header>
                <Modal.Body>
                    Modal description
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}