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

    const workflowId = process.env.CHATKIT_WORKFLOW_ID;
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Debug logging for development and production
    console.log('Environment check:', {
      hasWorkflowId: !!workflowId,
      hasApiKey: !!apiKey,
      workflowIdLength: workflowId?.length || 0,
      apiKeyPrefix: apiKey?.substring(0, 7) || 'none',
      environment: process.env.NODE_ENV
    });
    
    if (!workflowId) {
      return NextResponse.json(
        { error: 'Workflow ID not configured' },
        { status: 500 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API Key not configured' },
        { status: 500 }
      );
    }

    const requestBody = {
      workflow: { id: workflowId },
      user: deviceId,
    };

    console.log('Making ChatKit session request:', {
      workflowId,
      deviceId,
      requestBody
    });

    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        ...(process.env.OPENAI_ORG_ID
          ? { "OpenAI-Organization": process.env.OPENAI_ORG_ID }
          : {}),
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("OpenAI API error:", {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText,
        url: response.url
      });
      return NextResponse.json(
        { 
          error: "OpenAI API error", 
          status: response.status, 
          statusText: response.statusText,
          details: errorText 
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    console.log('ChatKit session created successfully:', {
      hasClientSecret: !!responseData.client_secret,
      clientSecretLength: responseData.client_secret?.length || 0
    });

    return NextResponse.json({ client_secret: responseData.client_secret });
  } catch (error) {
    console.error('ChatKit session error:', error);
    return NextResponse.json(
      { error: 'Failed to create ChatKit session' },
      { status: 500 }
    );
  }
}
