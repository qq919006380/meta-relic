import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
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