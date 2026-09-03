const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('[MongoDB] MONGO_URI not set — skipping DB connection (dev mode)');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully → ${uri}`);
  } catch (err) {
    console.error(`[MongoDB] Connection failed: ${err.message}`);
    console.warn('[MongoDB] Server will continue without database (tools served from static registry)');
  }
}

module.exports = { connectDB };
