const express = require('express');
const { files } = require('../models/files');
const { users } = require('../models/users');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    const userId = req.userId;
    const userFiles = files.filter(file => file.ownerId === userId);
    res.status(200).json(userFiles);
});

router.get('/shared', (req, res) => {
    const userId = req.userId;
    const sharedFiles = files.filter(file => file.permissions && file.permissions.includes(userId));
    res.status(200).json(sharedFiles);
});

router.delete('/:fileId', (req, res) => {
    const userId = req.userId;
    const fileId = parseInt(req.params.fileId);
    const index = files.findIndex(file => file.id === fileId && file.ownerId === userId);
    if (index === -1) {
        return res.status(404).json({ message: 'File not found' });
    }
    files.splice(index, 1);
    res.status(204).send();
});

router.get('/:fileId/download', (req, res) => {
    const userId = req.userId;
    const fileId = parseInt(req.params.fileId);
    const file = files.find(file => file.id === fileId && file.ownerId === userId || (file.permissions && file.permissions.includes(userId)));
    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }
    const fileContent = 'This is some file content';
    res.status(200).send(fileContent);
});

router.put('/:fileId', (req, res) => {
    const userId = req.userId;
    const fileId = parseInt(req.params.fileId);
    const { name } = req.body;
    const file = files.find(file => file.id === fileId && file.ownerId === userId);
    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }
    file.name = name;
    res.status(200).json(file);
});

router.post('/upload', (req, res) => {
    const userId = req.userId;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFiles = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    const newFiles = uploadedFiles.map((file, index) => ({
        id: files.length + index + 1,
        name: file.name,
        ownerId: userId,
        permissions: [],
    }));
    files.push(...newFiles)

    res.status(201).json({ message: 'File(s) successfully uploaded' })
});
router.post('/:fileId/permissions', (req, res) => {
    const userId = req.userId;
    const fileId = parseInt(req.params.fileId);
    const { email } = req.body;
    const file = files.find(file => file.id === fileId && file.ownerId === userId);

    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!file.permissions) {
        file.permissions = [];
    }

    if (file.permissions.includes(user.id)) {
        return res.status(409).json({ message: 'User has permission' });
    }

    file.permissions.push(user.id);
    res.status(201).json({ message: 'Permission added' });
});

router.delete('/:fileId/permissions', (req, res) => {
    const userId = req.userId;
    const fileId = parseInt(req.params.fileId);
    const { email } = req.body;

    const file = files.find(file => file.id === fileId && file.ownerId === userId);
    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!file.permissions) {
        return res.status(404).json({ message: 'Permissions not found' });
    }

    file.permissions = file.permissions.filter(id => id !== user.id);
    res.status(204).send();
});

router.get('/:fileId/permissions', (req, res) => {
    const userId = req.userId;
    const fileId = parseInt(req.params.fileId);
    const file = files.find(file => file.id === fileId && (file.ownerId === userId || (file.permissions && file.permissions.includes(userId))));

    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }
    const usersWithPermission = file.permissions.map(permissionId => {
        return users.find(user => user.id === permissionId);
    });

    res.status(200).json(usersWithPermission);
});

module.exports = router;
