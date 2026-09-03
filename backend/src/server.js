require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/mongoose');

const PORT = process.env.PORT || 5000;

async function start() {
  // Attempt DB connection (non-blocking — server starts regardless)
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 ToolVerse API running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log(`   Tools:  http://localhost:${PORT}/api/tools`);
    console.log(`   Env:    ${process.env.NODE_ENV || 'development'}\n`);
  });
}

start();
