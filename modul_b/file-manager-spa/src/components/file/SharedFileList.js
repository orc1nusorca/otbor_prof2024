import React, { useEffect } from 'react';
import useFile from '../../hooks/useFile';
import Button from '../common/Button';
import useAppContext from '../../hooks/useAppContext';

const SharedFileList = () => {
    const { files, fetchSharedFiles, downloadFile } = useFile();
    const { loading, error } = useAppContext();

    useEffect(() => {
        fetchSharedFiles();
    }, [fetchSharedFiles]);

    return (
        <div>
            <h2>Shared Files</h2>
            {files.length === 0 ? (<p>No files shared with you.</p>) : (
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

export default SharedFileList;
