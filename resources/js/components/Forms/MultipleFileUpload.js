import React, { useState } from 'react'

const MultipleFileUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        setSelectedFiles(prevState => [...prevState, file]);
    };

    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    return (
        <div>
            <div className="file-upload">
                <div className="file-upload-box">
                    <input
                        type="file"
                        className="file-upload-input"
                        onChange={handleFileChange}
                        multiple
                    />

                    <span>Drag and Drop or <span className="file-upload-link">Choose your files</span></span>
                </div>
            </div>
            <div className="file-attach">
                {selectedFiles.map((file, index) => (
                    <div className="file-attach-box" key={index}>
                        <div className="file-image">
                            <img src={URL.createObjectURL(file)} alt="" />
                        </div>
                        <div className="file-detail">
                            <h6>{file?.name}</h6>
                            <p>
                                <span className="me-2">Size: {filesizes(file?.size)}</span>
                                <span>Modified Time: {file?.lastModifiedDate.toLocaleString('en-IN')}</span>
                            </p>

                            <div className="file-actions">
                                <button type="button" className="file-action-btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-end">
                <button className="btn-upload">Upload</button>
            </div>
        </div>
    )
}

export default MultipleFileUpload
