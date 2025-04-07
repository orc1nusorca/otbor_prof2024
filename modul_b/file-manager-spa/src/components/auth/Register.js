import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import useAppContext from '../../hooks/useAppContext';
import LoadingSpinner from '../common/LoadingSpinner';


const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const { loading, setLoading, error, setError } = useAppContext();

    const validateForm = () => {
        let errors = {};
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await authService.register(formData);
            if (response.status === 201) {
                navigate('/login');
            } else {
                setError('Registration failed!');
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
            <h2>Register</h2>
            <ErrorMessage error={error} />
            <form onSubmit={handleSubmit}>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" error={formErrors.email} />
                <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" error={formErrors.password} />
                <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" error={formErrors.firstName} />
                <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" error={formErrors.lastName} />
                <Button type="submit">Register</Button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
