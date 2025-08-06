// test-server.js
// Simple test server to verify WebSocket functionality

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Test server is running!' });
});

// Test WebSocket endpoint
app.post('/test-websocket', (req, res) => {
  io.emit('test-event', {
    message: 'Test WebSocket event',
    timestamp: new Date().toISOString()
  });
  console.log('📡 Test WebSocket event emitted');
  res.json({ message: 'Test event sent' });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  socket.on('join-customer-room', () => {
    socket.join('customer-updates');
    console.log('👥 Customer joined update room');
  });
  
  socket.on('join-admin-room', () => {
    socket.join('admin-updates');
    console.log('👤 Admin joined update room');
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

const PORT = 5100;

server.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`🔌 WebSocket server ready`);
});

module.exports = app; 