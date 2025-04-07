import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFile from '../../hooks/useFile';
import Button from '../common/Button';
import useAppContext from '../../hooks/useAppContext';

const FileList = () => {
    const { files, fetchUserFiles, deleteFile, downloadFile } = useFile();
    const navigate = useNavigate();
    const { loading, error } = useAppContext();

    useEffect(() => {
        fetchUserFiles();
    }, [fetchUserFiles]);

    const handleEdit = (fileId) => {
        navigate(`/edit-file/${fileId}`);
    };

    const handlePermissions = (fileId) => {
        navigate(`/file-permissions/${fileId}`);
    };

    return (
        <div>
            <h2>Your Files</h2>
            {files.length === 0 ? (<p>No files uploaded yet.</p>) : (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {files.map(file => (
                        <tr key={file.id}>
                            <td>{file.name}</td>
                            <td>
                                <Button onClick={() => handleEdit(file.id)}>Edit</Button>
                                <Button onClick={() => deleteFile(file.id)}>Delete</Button>
                                <Button onClick={() => handlePermissions(file.id)}>Permissions</Button>
                                <Button onClick={() => downloadFile(file.id, file.name)}>Download</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FileList;
