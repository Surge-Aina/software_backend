const mongoose = require('mongoose');
const User = require('./models/User');
const Portfolio = require('./models/Portfolio');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testCustomer = async () => {
  try {
    console.log('🔍 Testing customer setup...');
    
    // Find or create customer user
    let customer = await User.findOne({ email: 'customer@test.com' });
    if (!customer) {
      console.log('❌ Customer user not found. Creating...');
      const bcrypt = require('bcryptjs');
      const customerPassword = await bcrypt.hash('Customer@123', 12);
      customer = new User({
        username: 'customer',
        email: 'customer@test.com',
        password: customerPassword,
        role: 'customer'
      });
      await customer.save();
      console.log('✅ Customer user created with ID:', customer._id);
    } else {
      console.log('✅ Customer user found with ID:', customer._id);
    }

    // Check if portfolio exists
    const portfolio = await Portfolio.findOne({ ownerId: customer._id.toString() });
    if (!portfolio) {
      console.log('❌ Customer portfolio not found. Creating...');
      
      const customerPortfolio = new Portfolio({
        ownerId: customer._id.toString(),
        profile: {
          name: 'John Doe',
          subtitle: 'Software Developer',
          bio: 'A passionate software developer with experience in web development and mobile applications.',
          email: 'john.doe@example.com',
          location: 'San Francisco, CA',
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe'
        },
        skills: [
          { name: 'JavaScript', level: 'Advanced', rating: 4, description: 'Frontend and backend development' },
          { name: 'React', level: 'Intermediate', rating: 3, description: 'UI development' },
          { name: 'Node.js', level: 'Intermediate', rating: 3, description: 'Backend development' }
        ],
        projects: [
          {
            title: 'E-commerce Website',
            description: 'A full-stack e-commerce platform built with React and Node.js',
            repoUrl: 'https://github.com/johndoe/ecommerce',
            demoUrl: 'https://ecommerce-demo.com',
            techStack: ['React', 'Node.js', 'MongoDB']
          },
          {
            title: 'Task Management App',
            description: 'A simple task management application with drag-and-drop functionality',
            repoUrl: 'https://github.com/johndoe/task-app',
            demoUrl: 'https://task-app-demo.com',
            techStack: ['React', 'CSS3', 'LocalStorage']
          }
        ],
        experience: [
          {
            role: 'Junior Developer',
            company: 'Tech Startup',
            duration: '2022 - Present',
            details: 'Working on web applications using modern JavaScript frameworks.'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            year: '2022'
          }
        ],
        certifications: [
          {
            title: 'AWS Certified Developer',
            year: '2023'
          }
        ],
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
      });

      await customerPortfolio.save();
      console.log('✅ Customer portfolio created successfully!');
    } else {
      console.log('✅ Customer portfolio already exists');
    }

    console.log('📋 Customer credentials: customer@test.com / Customer@123');
    console.log('🎯 Customer ownerId:', customer._id.toString());
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

testCustomer(); 