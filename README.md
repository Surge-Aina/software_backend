# Portfolio Backend API

A robust RESTful API built with Express.js, MongoDB, and Node.js for managing portfolio data. Features file uploads, data validation, and comprehensive testing with a focus on scalability and maintainability.

## 🚀 Features

- **RESTful API**: Complete CRUD operations for portfolio data
- **File Uploads**: Image uploads for projects and certifications using Multer
- **Data Validation**: Comprehensive input validation and sanitization
- **Database Integration**: MongoDB with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and logging
- **Testing**: Full test suite with Jest and Supertest
- **Security**: Input sanitization and file type validation

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM)
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Jest** - Testing framework
- **Supertest** - HTTP testing library
- **dotenv** - Environment variable management

## 📦 Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start
```

## 🎯 Available Scripts

```bash
# Start development server (http://localhost:5100)
npm start

# Start with nodemon (auto-restart on changes)
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage

# Lint code
npm run lint

# Format code
npm run format
```

## 🏗️ Project Structure

```
backend/
├── models/              # Mongoose schemas
│   └── Portfolio.js    # Portfolio data model
├── routes/             # API route handlers
│   └── portfolio.js    # Portfolio CRUD routes
├── uploads/            # File upload directory
├── test/              # Test files
│   ├── portfolio.test.js  # API tests
│   └── setup.js       # Test configuration
├── server.js          # Main application entry point
├── package.json       # Dependencies and scripts
├── jest.config.js     # Jest configuration
└── README.md         # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=5100
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880
```

### Database Configuration
The application uses MongoDB with the following setup:
- **Database**: Portfolio data storage
- **Collections**: Portfolios, users, files
- **Indexes**: Optimized for query performance
- **Validation**: Schema-level data validation

## 🌐 API Endpoints

### Portfolio Management

#### GET `/portfolio/:ownerId`
Retrieve portfolio data for a specific owner.

**Response:**
```json
{
  "ownerId": "gayathrinuthana",
  "name": "Gayathri Nuthana Ganti",
  "title": "Software Engineer",
  "about": "Passionate developer...",
  "skills": [...],
  "projects": [...],
  "experience": [...],
  "education": [...],
  "certifications": [...]
}
```

#### POST `/portfolio`
Create a new portfolio.

**Request Body:**
```json
{
  "ownerId": "gayathrinuthana",
  "name": "Gayathri Nuthana Ganti",
  "title": "Software Engineer",
  "about": "Passionate developer..."
}
```

#### PUT `/portfolio/:ownerId`
Update existing portfolio data.

#### DELETE `/portfolio/:ownerId`
Delete a portfolio.

### File Uploads

#### POST `/portfolio/:ownerId/avatar`
Upload profile picture.

#### POST `/portfolio/:ownerId/project-image`
Upload project image.

**File Requirements:**
- **Types**: JPG, PNG, GIF
- **Max Size**: 5MB
- **Storage**: Local filesystem

## 📊 Data Models

### Portfolio Schema
```javascript
{
  ownerId: String,
  name: String,
  title: String,
  about: String,
  avatar: String,
  skills: [{
    name: String,
    level: String,
    rating: Number,
    description: String
  }],
  projects: [{
    title: String,
    description: String,
    imageUrl: String,
    techStack: [String],
    githubUrl: String,
    liveUrl: String
  }],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    graduationDate: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    imageUrl: String
  }],
  uiSettings: {
    baseRem: Number,
    theme: String,
    sectionRem: {
      about: Number,
      skills: Number,
      projects: Number,
      experience: Number,
      education: Number,
      certifications: Number
    }
  }
}
```

## 🧪 Testing

The application includes comprehensive testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **File Upload Tests**: Multer functionality
- **Error Handling Tests**: Edge case scenarios

### Test Coverage
- **API Endpoints**: 100% coverage
- **File Uploads**: Complete validation testing
- **Error Handling**: Comprehensive error scenarios
- **Data Validation**: Schema validation testing

## 🔒 Security Features

### Input Validation
- **Data Sanitization**: XSS prevention
- **File Type Validation**: Secure file uploads
- **Size Limits**: Prevent large file uploads
- **CORS Configuration**: Controlled cross-origin access

### File Upload Security
- **Type Checking**: Only allowed file types
- **Size Limits**: Maximum file size enforcement
- **Path Validation**: Secure file storage paths
- **Virus Scanning**: Optional malware detection

## 📈 Performance

### Database Optimization
- **Indexes**: Optimized query performance
- **Connection Pooling**: Efficient database connections
- **Caching**: Response caching for static data
- **Compression**: Gzip compression for responses

### File Handling
- **Streaming**: Efficient file uploads
- **Compression**: Image optimization
- **CDN Ready**: Cloud storage integration
- **Caching**: Static file caching

## 🚀 Deployment

### Production Setup
```bash
# Install production dependencies
npm install --production

# Set environment variables
NODE_ENV=production
PORT=5100
MONGODB_URI=your_mongodb_uri

# Start production server
npm start
```

### Deployment Options
- **Heroku**: Platform as a Service
- **AWS EC2**: Virtual private server
- **DigitalOcean**: Cloud hosting
- **Railway**: Modern deployment platform

### Environment Variables
```env
# Production
NODE_ENV=production
PORT=5100
MONGODB_URI=mongodb+srv://...
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=5242880

# Development
NODE_ENV=development
PORT=5100
MONGODB_URI=mongodb://localhost:27017/portfolio
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880
```

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Check linting
npm run lint
```

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **Commitlint**: Conventional commit messages

## 📚 API Documentation

### Authentication
Currently, the API uses simple owner-based access. Future versions will include:
- JWT authentication
- Role-based access control
- API key management

### Rate Limiting
- **Requests per minute**: 100
- **File uploads per hour**: 10
- **Concurrent connections**: 50

### Error Responses
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the test examples

---

**Built with ❤️ using Express.js, MongoDB, and Node.js**
