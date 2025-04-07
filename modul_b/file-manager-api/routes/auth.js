const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../models/users');
const router = express.Router();

const jwtSecret = '4BGh564845151UHGHVGSHCSF';

router.post('/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: users.length + 1,
        email,
        password,
        firstName,
        lastName,
    };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
    console.log('Login attempt:', req.body); // Добавлено для отладки
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find((user) => user.email === email && user.password === password);
     console.log('Found User: ', user)
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  });


module.exports = router;
