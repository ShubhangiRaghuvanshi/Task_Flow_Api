const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');   
const cors = require('cors');dotenv.config();
const app = express();
const userRoutes = require('./Routes/User');
const taskRoutes = require('./Routes/Task');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    app.use('/api/user', userRoutes);
    app.use('/api/task', taskRoutes);
   
