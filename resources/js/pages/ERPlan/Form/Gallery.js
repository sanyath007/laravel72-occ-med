import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Gallery = ({ images = [], onDelete }) => {

    const handleDelete = (index) => {
        onDelete(index);
    };

    return (
        <Row className="my-3">
            {images.map((pic, index) => {
                return (
                    <Col md={3} key={index}>
                        <div className="border rounded-2">
                            <div
                                style={{
                                    position: 'relative',
                                    height: '200px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img src={URL.createObjectURL(pic)} alt="" style={{ width: '100%' }} />
                            </div>
                            <div className="d-flax flex-col p-1">
                                <p className="text-sm m-0"><b>ชื่อไฟล์</b> {pic?.name}</p>
                                <p className="text-sm m-0"><b>ขนาด</b> {Math.round(pic?.size/1024)} KB</p>

                                <div className="text-end mt-1">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                        ลบ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                )
            })}
        </Row>
    )
}

export default Gallery
