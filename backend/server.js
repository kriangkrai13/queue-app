const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const queueRoutes = require('./routes/queue');

const app = express();

// Enable CORS for all origins (for LAN access)
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Health check endpoint for network detection
app.get('/api/queue/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    server: 'Queue Management API'
  });
});

// Main queue routes
app.use('/api/queue', queueRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Queue Management API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/queue/health',
      queue: '/api/queue'
    }
  });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'http://localhost'; // Listen on all interfaces for LAN access

app.listen(PORT, HOST, () => {
  console.log(`🚀 Queue Management API Server running on ${HOST}:${PORT}`);
  console.log(`🏥 Health Check: ${HOST}:${PORT}/api/queue/health`);
});