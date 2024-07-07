import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENAI_API_KEY = process.env.API_KEY;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const evaluations = response.data.choices[0].message.content.trim();
    console.log('Evaluations:', evaluations); // ここで評価結果をログ出力

    return NextResponse.json(JSON.parse(evaluations));
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Error calling OpenAI API' }, { status: 500 });
  }
}
