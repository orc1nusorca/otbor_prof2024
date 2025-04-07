import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFile from '../../hooks/useFile';
import Input from '../common/Input';
import Button from '../common/Button';
import useAppContext from '../../hooks/useAppContext';

const FilePermissions = () => {
    const [userEmail, setUserEmail] = useState('');
    const [formError, setFormError] = useState('');
    const [permissions, setPermissions] = useState([]);
    const { getPermissions, addPermission, deletePermission, files } = useFile();
    const navigate = useNavigate();
    const { fileId } = useParams();
    const { loading, error, setSuccess, clearSuccess } = useAppContext();

    useEffect(() => {
        if (fileId) {
            getPermissions(parseInt(fileId));
        }
    }, [fileId, getPermissions]);


    useEffect(() => {
        if (files) {
            setPermissions(files);
        }
    }, [files]);

    const validateForm = () => {
        if (!userEmail) {
            setFormError('Email is required');
            return false;
        } else {
            setFormError('');
        }
        return true;
    };

    const handleAddUser = async () => {
        if (!validateForm()) {
            return;
        }
        await addPermission(parseInt(fileId), userEmail);
        await getPermissions(parseInt(fileId));
        setUserEmail('');
    };

    const handleRemoveUser = async (email) => {
        await deletePermission(parseInt(fileId), email);
        await getPermissions(parseInt(fileId));
    };

    const handleCancel = () => {
        navigate('/user-files');
    };

    const handleChange = (e) => {
        setUserEmail(e.target.value);
    };

    return (
        <div>
            <h2>File Permissions</h2>
            <div>
                <h3>Add New User</h3>
                <Input type="email" value={userEmail} onChange={handleChange} placeholder="User Email" error={formError} />
                <Button onClick={handleAddUser}>Add</Button>
            </div>

            {permissions.length === 0 ? (<p>No users have access to this file.</p>) : (
                <table>
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map(permission => (
                            <tr key={permission.email}>
                                <td>{permission.email}</td>
                                <td>
                                    <Button onClick={() => handleRemoveUser(permission.email)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Button onClick={handleCancel}>Back</Button>
        </div>
    );
};

export default FilePermissions;
