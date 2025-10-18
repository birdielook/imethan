# OpenAI ChatKit Implementation

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root with the following:

```bash
# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_SECRET_KEY=your_openai_api_key_here
```

### 2. ChatKit Features
- **Location**: ChatKit is implemented in the right sidebar (`sidebar-right.tsx`)
- **API Endpoint**: `/api/chatkit/session` handles session creation
- **Workflow ID**: `wf_68df4b13b3588190a09d19288d4610ec0df388c3983f58d1` (as provided)

### 3. How It Works
1. The ChatKit script is loaded in the layout
2. The right sidebar contains the ChatKit component
3. When a user interacts with the chat, it generates a device ID
4. The device ID is sent to the API endpoint to get a client secret
5. The client secret is used to authenticate with OpenAI's ChatKit service

### 4. Testing
- Start your development server: `npm run dev`
- Navigate to any page that has the sidebar (/, /about, /car, /hello)
- The ChatKit should appear in the right sidebar
- Make sure to set your `OPENAI_API_SECRET_KEY` environment variable

### 5. Troubleshooting
- Ensure your OpenAI API key has the necessary permissions for ChatKit
- Check the browser console for any errors
- Verify the workflow ID is correct in your OpenAI dashboard
