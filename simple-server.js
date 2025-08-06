// simple-server.js
// Minimal server to test WebSocket functionality

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
  res.json({ message: 'Simple server is running!' });
});

// Authentication routes
app.post('/auth/login', (req, res) => {
  const { email } = req.body;
  
  // Simple mock authentication
  if (email === 'admin@test.com' || email === 'cust@test.com') {
    res.json({
      success: true,
      user: {
        ownerId: email,
        email: email,
        role: email === 'admin@test.com' ? 'admin' : 'customer'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Portfolio routes
app.get('/portfolio/:ownerId', (req, res) => {
  const { ownerId } = req.params;
  
  // Mock portfolio data
  const mockPortfolio = {
    ownerId: ownerId,
    type: 'software_engineer',
    profile: {
      name: ownerId === 'admin@test.com' ? 'Admin User' : 'Customer User',
      email: ownerId,
      location: 'San Francisco, CA',
      github: 'https://github.com/example',
      linkedin: 'https://linkedin.com/in/example',
      bio: 'A passionate software engineer with expertise in modern web technologies.',
      avatarUrl: null
    },
    skills: [
      { name: 'JavaScript', level: 'Expert', rating: 5 },
      { name: 'React', level: 'Advanced', rating: 4 },
      { name: 'Node.js', level: 'Intermediate', rating: 3 }
    ],
    projects: [
      {
        title: 'Portfolio App',
        description: 'A modern portfolio application with real-time updates',
        repoUrl: 'https://github.com/example/portfolio',
        demoUrl: 'https://portfolio.example.com',
        techStack: ['React', 'Node.js', 'Socket.IO'],
        imageUrl: null
      }
    ],
    experience: [
      {
        company: 'Tech Corp',
        role: 'Senior Software Engineer',
        duration: '2022-2024',
        details: 'Led development of multiple web applications using React and Node.js'
      }
    ],
    education: [
      {
        degree: 'B.S. Computer Science',
        institution: 'University of Technology',
        year: '2020'
      }
    ],
    certifications: [],
    resumePdfUrl: null,
    uiSettings: {
      baseRem: 1.1,
      sectionRem: {
        about: 1.1,
        skills: 1.1,
        projects: 1.1,
        experience: 1.1,
        education: 1.1,
        certifications: 1.1
      }
    }
  };
  
  res.json(mockPortfolio);
});

app.put('/portfolio/:ownerId', (req, res) => {
  const { ownerId } = req.params;
  
  // Emit WebSocket event for portfolio update
  io.emit('portfolio-updated', {
    ownerId: ownerId,
    message: 'Portfolio updated',
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true, message: 'Portfolio updated' });
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
  console.log(`✅ Simple server running on port ${PORT}`);
  console.log(`🔌 WebSocket server ready`);
  console.log(`🌐 HTTP server ready`);
  console.log(`🔐 Auth routes available`);
  console.log(`📁 Portfolio routes available`);
});

module.exports = app; 