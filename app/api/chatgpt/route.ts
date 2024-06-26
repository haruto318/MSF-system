import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});


export async function POST(request: NextRequest) {
  const data = await request.json();
  const model = "gpt-3.5-turbo";
  const temperature = 1; //回答内容の一貫性、確信度を指定する。0に近いほどより一貫性があり、確信度の高い内容を出力する。２に近いほど、より冒険的で創造的な内容を出力する。0~2の間で指定する。
  const seed = 1234; // 乱数のシード値。同じ値を指定すると同じ結果が得られる。整数値を指定する。
  const n = 1; // 生成する回答の数。ただし、回答数が増えるほど、その分トークンを消費する。
  const max_tokens = 150; // 生成する最大トークン数

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: data }],
      temperature: temperature,
      seed: seed,
      model: model,
      n: n,
      // max_tokens: max_tokens,
    });
    return NextResponse.json(
      { data: chatCompletion.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}