import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, item } = await req.json();

    const systemPrompt = `You are an AI assistant representing this specific agent/candidate card.
Answer using ONLY these exact details when asked about the card — never invent or guess:
- Title: ${item.title}
- Description: ${item.description}
- Price: ${item.price}
- Location: ${item.location}
- Released: ${item.date}
- Rating: ${item.rating}

You can also answer general questions the user asks, in a natural, helpful, concise way (2-4 sentences).`;

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: { sender: string; text: string }) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: apiMessages,
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', errText);
      return NextResponse.json({ reply: "Sorry, I'm having trouble responding right now." }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I didn't quite catch that.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('Server error in /api/agent-chat:', err);
    return NextResponse.json({ reply: 'Something went wrong on my end.' }, { status: 500 });
  }
}