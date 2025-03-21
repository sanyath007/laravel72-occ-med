import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaTimesCircle } from 'react-icons/fa'
import { useScreenSize } from '../hooks/useScreenSize'
import ModalImageViewer from './Modals/ModalImageViewer';

const UploadedGalleries = ({ images = [], onDelete, minHeight }) => {
    const screenSize = useScreenSize();
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
                <Col md={4} key={index} style={{ marginBottom: '10px' }}>
                    <div className="border rounded-3" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ height: screenSize.width <= 768 ? '100%' : '180px' }}>
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
                        <span
                            className="upload__image-close-btn"
                            style={{
                                top: screenSize.width <= 768 ? '8px' : '3px',
                                right: screenSize.width <= 768 ? '8px' : '3px',
                            }}
                        >
                            <FaTimesCircle
                                size={screenSize.width <= 768 ? '25px' : '20px'}
                                onClick={() => handleDelete(pic.id)}
                            />
                        </span>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default UploadedGalleries
