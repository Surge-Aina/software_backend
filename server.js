// server.js
// Main entry point for the backend server
// Sets up Express, connects to MongoDB, and mounts API routes

const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const cors = require('cors'); // Import CORS to allow cross-origin requests
require('dotenv').config(); // Load environment variables from .env file
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const portfolioRoutes = require('./routes/portfolio'); // Import portfolio API routes
const authRoutes = require('./routes/auth'); // Import authentication routes
const seedUsers = require('./seed/users'); // Import seed users function

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

/**
 * Connect to MongoDB using the URI from .env
 * @function
 * @returns {Promise<void>} Logs success or error to console
 * @notes Uses Mongoose for ODM. Connection is required for API to function.
 */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected'); // Log success
    // Seed users after successful database connection
    await seedUsers();
  })
  .catch(err => console.error(err)); // Log connection errors

/**
 * Mount the portfolio API routes at /portfolio
 * @function
 * @param {string} path - The base path for the routes
 * @param {Router} router - The Express router for portfolio APIs
 */
app.use('/portfolio', portfolioRoutes);

/**
 * Mount the authentication API routes at /auth
 * @function
 * @param {string} path - The base path for the routes
 * @param {Router} router - The Express router for authentication APIs
 */
app.use('/auth', authRoutes);

/**
 * Serve static files from uploads directory
 * @function
 * @param {string} path - The URL path to serve files from
 * @param {Function} middleware - Express static middleware
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * Socket.IO connection handling for real-time updates
 */
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  socket.on('join-customer-room', () => {
    socket.join('customer-updates');
    socket.join('cust@test.com-updates');
    console.log('👥 Customer joined update room');
  });
  
  socket.on('join-admin-room', () => {
    socket.join('admin-updates');
    socket.join('admin@test.com-updates');
    console.log('👤 Admin joined update room');
  });
  
  socket.on('join-user-room', (userId) => {
    socket.join(`${userId}-updates`);
    console.log(`👤 User ${userId} joined their specific room`);
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

/**
 * Test endpoint to trigger WebSocket events
 * @route   POST /test-websocket
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @returns {Object} Success message
 */
app.post('/test-websocket', (req, res) => {
  const io = req.app.get('io');
  if (io) {
    io.emit('test-event', {
      message: 'Test WebSocket event',
      timestamp: new Date().toISOString()
    });
    console.log('📡 Test WebSocket event emitted');
    res.json({ message: 'Test event sent' });
  } else {
    res.status(500).json({ error: 'Socket.IO not available' });
  }
});

/**
 * Start the Express server on the specified port
 * @function
 * @param {number} PORT - The port number to listen on
 * @returns {void}
 */
const PORT = process.env.PORT || 5100;

// Only start the server if this file is run directly (not imported for testing)
if (require.main === module) {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; 