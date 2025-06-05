const { onRequest } = require('firebase-functions/v2/https');
const { OpenAI } = require('openai');

// Load environment variables from .env file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

// Initialize OpenAI with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY environment variable is not set');
  console.error('Please create a .env file in the functions directory with OPENAI_API_KEY=your-key-here');
  process.exit(1);
}

exports.chat = onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Health check endpoint
  if (req.path === '/health' || req.url === '/health') {
    res.status(200).send('OK');
    return;
  }

  try {
    const { message = 'Hello', threadId } = req.body || {};
    
    if (!message.trim()) {
      throw new Error('Message cannot be empty');
    }

    // Your Assistant ID - replace with your actual assistant ID
    const assistantId = 'asst_mHpx4MqKq1XfGDwTYRP3Jzzk';

    // Create a thread if no threadId is provided
    let currentThreadId = threadId;
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // Add the message to the thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: assistantId
    });

    // Wait for the assistant's response
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    while (runStatus.status !== 'completed') {
      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed');
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(currentThreadId);
    const assistantMessage = messages.data.find(m => m.role === 'assistant');
    const reply = assistantMessage?.content[0]?.text?.value || "I'm sorry, I couldn't generate a response.";

    res.status(200).json({
      reply,
      threadId: currentThreadId, // Include the thread ID in the response
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unknown error occurred'
    });
  }
});
