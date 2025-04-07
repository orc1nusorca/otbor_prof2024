import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFile from '../../hooks/useFile';
import Input from '../common/Input';
import Button from '../common/Button';
import useAppContext from '../../hooks/useAppContext';

const FileEdit = () => {
    const [fileName, setFileName] = useState('');
    const [formError, setFormError] = useState('');
    const { updateFile, files } = useFile();
    const navigate = useNavigate();
    const { fileId } = useParams();
    const { loading, error, setSuccess } = useAppContext();


    useEffect(() => {
        const file = files.find(file => file.id === parseInt(fileId));
        if (file) {
            setFileName(file.name)
        }
    }, [files, fileId]);

    const validateForm = () => {
        if (!fileName) {
            setFormError('File name is required');
            return false;
        } else {
            setFormError('');
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }
        await updateFile(parseInt(fileId), fileName);
        navigate('/user-files');
    };

    const handleCancel = () => {
        navigate('/user-files');
    };

    const handleChange = (e) => {
        setFileName(e.target.value);
    };

    return (
        <div>
            <h2>Edit File Name</h2>
            <form>
                <Input type="text" value={fileName} onChange={handleChange} placeholder="New file name" error={formError} />
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Back</Button>
            </form>
        </div>
    );
};

export default FileEdit;
