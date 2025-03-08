import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import analysisRoutes from './routes/analysis.routes';
import authRoutes from './auth/auth.routes';
import { authMiddleware } from './auth/auth.middleware';

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Permitir localhost para desarrollo
    if (!origin || origin.startsWith('http://localhost')) return callback(null, true);
    // Permitir cualquier subdominio de vercel.app
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);
    // Permitir dominio personalizado
    if (origin === 'https://eco-analyzer.bmtechlab.online') return callback(null, true);
    // Si no está permitido
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Middleware de debugging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - Content-Type: ${req.get('Content-Type')}`);
  next();
});

app.use(express.json({ limit: '10mb' }));

// Error handler para JSON malformado
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    console.error('JSON Syntax Error:', error.message);
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next(error);
});

// Health check endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'EcoAnalyzer API is running',
    timestamp: new Date().toISOString() 
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/analysis', authMiddleware, analysisRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
