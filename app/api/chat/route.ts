import { NextRequest, NextResponse } from 'next/server';
import { model } from '@/lib/gemini';
import { generateSystemPrompt } from '@/lib/prompt';
import { Language } from '@/lib/translations';

export const runtime = 'edge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
  language?: Language;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, language = 'en' }: ChatRequest = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      );
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1].content;

    // Generate system prompt with full context (bilingual support)
    const systemPrompt = generateSystemPrompt(language);

    // Prepare chat history for Gemini
    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start a chat session with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [
            {
              text: language === 'tr'
                ? "Merhaba! Ben Eren Ali Koca'nın AI asistanıyım. Onun yetenekleri, projeleri, deneyimleri ve iş geçmişi hakkında detaylı bilgi verebilirim. Size nasıl yardımcı olabilirim?"
                : "Hello! I'm Eren Ali Koca's AI assistant. I can provide detailed information about his skills, projects, experience, and work history. How can I help you?",
            },
          ],
        },
        ...chatHistory,
      ],
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    // Send the user's message and get response
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
      success: true,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);

    // Handle specific error types
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        {
          error:
            'API configuration error. Please check your Gemini API key in .env.local',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to process your message. Please try again.',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
