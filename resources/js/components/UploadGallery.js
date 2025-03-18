import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ModalImageViewer from './Modals/ModalImageViewer';

const UploadGallery = ({ images = [], onDelete, minHeight }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const [showImage, setShowImage] = useState(false);

    const handleDelete = (index) => {
        onDelete(index);
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
                                src={typeof pic === 'object' ? URL.createObjectURL(pic) : pic}
                                alt="uploaded_pic"
                                style={{ width: '100%', cursor: 'pointer' }}
                                onClick={() => {
                                    setSelectedImage(pic);
                                    setShowImage(true);
                                }}
                            />
                        </div>
                        <div className="d-flax flex-col p-1">
                            {typeof pic === 'object' && (
                                <>
                                    <p className="text-sm m-0"><b>ชื่อไฟล์</b> {pic?.name}</p>
                                    <p className="text-sm m-0"><b>ขนาด</b> {Math.round(pic?.size/1024)} KB</p>
                                </>
                            )}

                            {/* {typeof pic === 'object' && ( */}
                                <div className="text-end mt-1">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                        ลบ
                                    </button>
                                </div>
                            {/* )} */}
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default UploadGallery
