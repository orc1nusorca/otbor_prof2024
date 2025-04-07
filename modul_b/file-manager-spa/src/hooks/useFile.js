import { useState, useEffect, useCallback } from 'react';
import { fileService } from '../services/fileService';
import useAppContext from './useAppContext';

const useFile = () => {
    const [files, setFiles] = useState([]);
    const { loading, setLoading, setError, clearError, setSuccess, clearSuccess } = useAppContext();

    const fetchUserFiles = useCallback(async () => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.getUserFiles();
            if (response.status === 200) {
                setFiles(response.data);
            } else {
                setError('Failed to fetch user files');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [clearError, setError, setLoading]);

    const fetchSharedFiles = useCallback(async () => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.getSharedFiles();
            if (response.status === 200) {
                setFiles(response.data);
            } else {
                setError('Failed to fetch shared files');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [clearError, setError, setLoading]);

    const deleteFile = async (fileId) => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.deleteFile(fileId);
            if (response.status === 204) {
                setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
                setSuccess('File successfully deleted!');
            } else {
                setError(`Failed to delete file`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = async (fileId, fileName) => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.downloadFile(fileId);
            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } else {
                setError(`Failed to download file`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const updateFile = async (fileId, newFileName) => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.updateFile(fileId, newFileName);
            if (response.status === 200) {
                setFiles(prevFiles => prevFiles.map(file =>
                    file.id === fileId ? { ...file, name: newFileName } : file));
                setSuccess('File name successfully changed!');
            } else {
                setError('Failed to update file name');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addPermission = async (fileId, userEmail) => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.addPermission(fileId, userEmail);
            if (response.status === 201) {
                setSuccess(`User: ${userEmail} has a permission on the file`);
            }
            else {
                setError(`Failed to add permission`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deletePermission = async (fileId, userEmail) => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.deletePermission(fileId, userEmail);
            if (response.status === 204) {
                setSuccess(`User: ${userEmail} permission is successfully removed`);
            } else {
                setError(`Failed to delete permission`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getPermissions = async (fileId) => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.getPermissions(fileId);
            if (response.status === 200) {
                setFiles(response.data);
            } else {
                setError('Failed to fetch file permissions');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadFiles = async (filesToUpload) => {
        setLoading(true);
        clearError();
        try {
            const response = await fileService.uploadFiles(filesToUpload);
            if (response.status === 201) {
                fetchUserFiles();
            } else {
                setError('Failed to upload file(s)');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (loading === false) {
            clearSuccess();
        }

    }, [loading, clearSuccess]);

    return {
        files,
        fetchUserFiles,
        deleteFile,
        downloadFile,
        updateFile,
        uploadFiles,
        addPermission,
        deletePermission,
        getPermissions,
        fetchSharedFiles
    };
};

export default useFile;
