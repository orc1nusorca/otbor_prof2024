import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FileList from './components/file/FileList';
import FileEdit from './components/file/FileEdit';
import FilePermissions from './components/file/FilePermissions';
import FileUpload from './components/file/FileUpload';
import SharedFileList from './components/file/SharedFileList';
import Layout from './components/layout/Layout';
import useAuth from './hooks/useAuth';
import { AppProvider } from './contexts/AppContext';


const App = () => {
    return (
        <AppProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <AppRoutes />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </AppProvider>
    );
};

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
    <Routes>
        <Route path="/user-files" element={<FileList />} />
        <Route path="/shared-files" element={<SharedFileList />} />
        <Route path="/edit-file/:fileId" element={<FileEdit />} />
        <Route path="/file-permissions/:fileId" element={<FilePermissions />} />
        <Route path="/upload-files" element={<FileUpload />} />
    </Routes>
);


export default App;
