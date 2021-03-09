require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoDB = require('./config/mongoDB');
const colors = require('colors');

// Routes import files
const userRoutes = require('./routes/authRoutes')

const app = express();

mongoDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


// Routes
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`.yellow.bold));
