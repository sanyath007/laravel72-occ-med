import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalImageViewer = ({ isOpen, hideModal, image }) => {
    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="lg"
        >
            <Modal.Header closeButton>รูปภาพ</Modal.Header>
            <Modal.Body>
                <div className="d-flex align-items-center justify-content-center">
                    <img
                        src={typeof image === 'object' ? URL.createObjectURL(image) : image}
                        alt="image-viewer"
                    />
                </div>
            </Modal.Body>
            {typeof image !== 'object' && (
                <Modal.Footer>
                    <a href={image} className="btn btn-success">ดาวน์โหลด</a>
                </Modal.Footer>
            )}
        </Modal>
    )
}

export default ModalImageViewer
