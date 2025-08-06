// test-websocket.js
// Simple test script to verify WebSocket functionality

const io = require('socket.io-client');

console.log('🧪 Testing WebSocket connection...');

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  timeout: 5000
});

socket.on('connect', () => {
  console.log('✅ WebSocket connected successfully!');
  console.log('🔌 Socket ID:', socket.id);
  
  // Join customer room
  socket.emit('join-customer-room');
  console.log('👥 Joined customer room');
  
  // Listen for events
  socket.on('portfolio-updated', (data) => {
    console.log('📡 Received portfolio-updated event:', data);
  });
  
  socket.on('portfolio-changed', (data) => {
    console.log('📡 Received portfolio-changed event:', data);
  });
  
  socket.on('test-event', (data) => {
    console.log('🧪 Received test event:', data);
  });
  
  // Test the connection by making a request to trigger an event
  setTimeout(() => {
    console.log('🔄 Testing WebSocket event emission...');
    fetch('http://localhost:5000/test-websocket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('✅ Test event sent:', data);
    })
    .catch(error => {
      console.error('❌ Failed to send test event:', error);
    });
  }, 1000);
});

socket.on('connect_error', (error) => {
  console.error('❌ WebSocket connection failed:', error);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 WebSocket disconnected:', reason);
});

// Cleanup after 10 seconds
setTimeout(() => {
  console.log('🧹 Cleaning up...');
  socket.disconnect();
  process.exit(0);
}, 10000); 