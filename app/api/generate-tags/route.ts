// app/api/generate-tags/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  const { content } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{
      role: 'system',
      content: 'Suggest 5-7 tags for this content. Respond ONLY with comma-separated values:'
    }, { role: 'user', content }]
  });

  const tags = response.choices[0] && response.choices[0].message && response.choices[0]?.message?.content?.split(/,\s*/);
  return NextResponse.json({ tags });
}