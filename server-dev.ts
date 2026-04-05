import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * DEVELOPMENT AUTH SERVER (No Google Sheets Required)
 * 
 * This is a simplified version for testing.
 * For production, use the full server.ts with Google Sheets integration.
 * 
 * Start: npx ts-node server-dev.ts
 */

const app = express();
const PORT = 5000;
const JWT_SECRET = 'dev-secret-key-change-in-production';

app.use(cors());
app.use(express.json());

// In-memory storage
const users: Map<string, any> = new Map();
let userIdCounter = 1;

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// Middleware to verify JWT
const verifyToken = (req: AuthRequest, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Sign Up Route
app.post('/api/auth/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    for (const user of users.values()) {
      if (user.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = `user_${userIdCounter++}`;
    const newUser = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      createdAt: new Date().toISOString(),
    };

    users.set(userId, newUser);

    // Log to console (for development tracking)
    console.log('✓ New user registered:', { id: userId, email, name });
    console.log('📊 Total users:', users.size);

    // Generate token
    const token = jwt.sign(
      { id: userId, email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      id: userId,
      name,
      email,
      phone,
      address,
      createdAt: newUser.createdAt,
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login Route
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    let user = null;
    for (const u of users.values()) {
      if (u.email === email) {
        user = u;
        break;
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Log login
    console.log('✓ User logged in:', email);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get Profile Route
app.get('/api/auth/profile', verifyToken, (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = users.get(userId!);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Get All Users (Development Only)
app.get('/api/dev/users', (req: Request, res: Response) => {
  const userList = Array.from(users.values()).map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone || 'Not provided',
    address: u.address || 'Not provided',
    createdAt: u.createdAt,
  }));
  res.json({ total: users.size, users: userList });
});

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Dev auth server is running',
    users: users.size,
  });
});

app.listen(PORT, () => {
  console.log('\n🚀 DEV Auth Server Running!');
  console.log(`📍 http://localhost:${PORT}`);
  console.log('\n📝 API Endpoints:');
  console.log(`  POST   http://localhost:${PORT}/api/auth/signup`);
  console.log(`  POST   http://localhost:${PORT}/api/auth/login`);
  console.log(`  GET    http://localhost:${PORT}/api/auth/profile (needs token)`);
  console.log(`  GET    http://localhost:${PORT}/api/dev/users (view all users)`);
  console.log(`  GET    http://localhost:${PORT}/api/health`);
  console.log('\n💡 View registered users at: http://localhost:5000/api/dev/users\n');
});
