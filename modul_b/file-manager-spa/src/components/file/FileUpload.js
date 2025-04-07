import React, { useState } from 'react';
import useFile from '../../hooks/useFile';
import Button from '../common/Button';
import useAppContext from '../../hooks/useAppContext';

const FileUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { uploadFiles } = useFile();
    const { loading, error } = useAppContext();

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };


    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            await uploadFiles(selectedFiles);
            setSelectedFiles([]);
        }
    };


    const handleDownload = async (file) => {
        const link = document.createElement('a');
        link.href = file.url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2>Upload Files</h2>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="drop-area"
            >
                <p>Drag and drop files here or click to select</p>
                <input type="file" multiple onChange={handleFileSelect} />
            </div>
            {selectedFiles.length > 0 && (
                <div>
                    <h3>Selected Files:</h3>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </div>

            )}
            <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
                Upload Files
            </Button>
        </div>
    );
};

export default FileUpload;
