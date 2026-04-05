import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets Setup
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// In-memory storage (replace with database in production)
const users: Map<string, any> = new Map();
let userIdCounter = 1;

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

// Helper function to store data in Google Sheets
const storeUserInSheet = async (userData: any) => {
  try {
    const authClient = await auth.getClient();
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
    
    if (!SPREADSHEET_ID) {
      console.warn('Google Sheet ID not configured, skipping sheet storage');
      return;
    }

    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: 'Users!A:F',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            userData.id,
            userData.email,
            userData.name,
            userData.phone || '',
            userData.address || '',
            new Date().toISOString(),
          ],
        ],
      },
      auth: authClient,
    };

    await sheets.spreadsheets.values.append(request);
    console.log('User data stored in Google Sheets');
  } catch (error) {
    console.error('Error storing in Google Sheets:', error);
    // Don't fail the signup if sheets fails
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

    // Store in Google Sheets
    await storeUserInSheet(newUser);

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

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Auth server is running' });
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
  console.log('Make sure to set up your Google Sheets credentials and environment variables');
});
