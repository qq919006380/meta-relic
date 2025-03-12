import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-d50c4e25bce3437c9309f93529cc0f95',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;
    
    const completion = await openai.chat.completions.create({
      messages,
      model: "deepseek-chat",
    });
    
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error('DeepSeek API error:', error);
  }
}