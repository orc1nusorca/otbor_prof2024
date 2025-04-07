import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import useAppContext from '../../hooks/useAppContext';
import LoadingSpinner from '../common/LoadingSpinner';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();
    const { loading, setLoading, error, setError } = useAppContext();

    const validateForm = () => {
        let errors = {};
        if (!credentials.email) errors.email = 'Email is required';
        if (!credentials.password) errors.password = 'Password is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials);
            if (response.status === 200) {
                login(response.data.token);
                navigate('/user-files');
            } else {
                setError('Login failed!');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className='container'>
            <LoadingSpinner isLoading={loading} />
            <h2>Login</h2>
            <ErrorMessage error={error} />
            <form onSubmit={handleSubmit}>
                <Input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" error={formErrors.email} />
                <Input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" error={formErrors.password} />
                <Button type="submit">Login</Button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
