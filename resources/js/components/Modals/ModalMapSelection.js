import React from 'react'
import { Modal } from 'react-bootstrap'
import Map from '../Maps/Map'

const ModalMapSelection = ({ isOpen, hideModal, onSelected, ...props }) => {
    return (
        <Modal
            show={isOpen}
            onHide={hideModal}
            size="xl"
        >
            <Modal.Header closeButton>เลือกพิกัดบนแผนที่</Modal.Header>
            <Modal.Body>
                <div style={{ height: '640px', weight: '100%' }}>
                    <Map
                        center={props.center ? props.center : ''}
                        onClick={({ lat, lng }) => {
                            onSelected({ lat, lng })
                            hideModal()
                        }} 
                    />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalMapSelection
