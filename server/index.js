import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';  // Load dotenv
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the MEMORIES APP')
})

// MongoDB Connection
const PORT = process.env.PORT || 5000;
// const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.set("strictQuery", true); // Prevent deprecation warning

console.log(`Connection URL: ${process.env.CONNECTION_URL}`);
console.log(`Port: ${PORT}`);

console.log('Starting MongoDB connection...');
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(' Error connecting to MongoDB:', error.message));

// Error Handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
