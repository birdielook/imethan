import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json();
    
    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      );
    }

    const workflowId = process.env.OPENAI_CHATKIT_WORKFLOW_ID;
    
    if (!workflowId) {
      return NextResponse.json(
        { error: 'Workflow ID not configured' },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: "Bearer " + process.env.OPENAI_API_SECRET_KEY,
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: deviceId,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const { client_secret } = await response.json();

    return NextResponse.json({ client_secret });
  } catch (error) {
    console.error('ChatKit session error:', error);
    return NextResponse.json(
      { error: 'Failed to create ChatKit session' },
      { status: 500 }
    );
  }
}
