import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ModalImageViewer from './Modals/ModalImageViewer';

const UploadedGalleries = ({ images = [], onDelete, minHeight }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const [showImage, setShowImage] = useState(false);

    const handleDelete = (id) => {
        onDelete(id);
    };

    return (
        <Row className="my-3" style={{ minHeight: minHeight }}>
            <ModalImageViewer
                isOpen={showImage}
                hideModal={() => setShowImage(false)}
                image={selectedImage}
            />

            {images?.map((pic, index) => (
                <Col md={3} key={index}>
                    <div className="border rounded-2">
                        <div
                            style={{
                                position: 'relative',
                                height: '200px',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={pic.path}
                                alt="uploaded_pic"
                                style={{ width: '100%', cursor: 'pointer' }}
                                onClick={() => {
                                    setSelectedImage(pic.path);
                                    setShowImage(true);
                                }}
                            />
                        </div>
                        <div className="d-flax flex-col p-1">
                            <div className="text-end mt-1">
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(pic.id)}>
                                    ลบ
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default UploadedGalleries
