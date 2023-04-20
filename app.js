const express = require('express');
const connectDB = require('./config/db')
// khoi dong app

const app = express();

//nhap kahu router
const posts = require('./routers/posts')
// khoi dong express middleware

app.use(express.json());

// ket noi
connectDB();

// mang router post vao su dung

app.use('/posts', posts)

const PORT = 5000;

app.listen(PORT, () => console.log(`Sever khoi dong port ${PORT}`));
