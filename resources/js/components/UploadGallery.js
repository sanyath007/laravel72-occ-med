import React from 'react'
import { Col, Row } from 'react-bootstrap'

const UploadGallery = ({ images = [], onDelete, minHeight }) => {
    const handleDelete = (index) => {
        onDelete(index);
    };

    return (
        <Row className="my-3" style={{ minHeight: minHeight }}>
            {images.map((pic, index) => (
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
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="d-flax flex-col p-1">
                            <p className="text-sm m-0"><b>ชื่อไฟล์</b> {pic?.name}</p>
                            <p className="text-sm m-0"><b>ขนาด</b> {Math.round(pic?.size/1024)} KB</p>

                            {typeof pic === 'object' && (
                                <div className="text-end mt-1">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                        ลบ
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default UploadGallery
