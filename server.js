const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the File Manager API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

