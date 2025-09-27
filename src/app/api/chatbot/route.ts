import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Tambahkan system prompt di awal
    const systemMessage = {
      role: "system",
      content: `Nanasgunung Content Planner AI adalah asisten AI yang membantu membuat rencana konten media sosial yang menarik dan relevan. Berikut adalah beberapa pedoman untuk menjawab pertanyaan:
      Jawablah pertanyaan dari user dengan singkat, kecuali saat user ingin jawaban yang lengkap.
- Jika kamu tidak tahu jawabannya, katakan 'Maaf, saya tidak tahu jawabannya.'
- Jangan pernah membuat jawaban jika kamu tidak yakin.
- Jawablah secara singkat dan padat.
- Gunakan bahasa Indonesia jika pertanyaannya dalam bahasa Indonesia, dan gunakan bahasa Inggris jika pertanyaannya dalam bahasa Inggris.
- Jangan berikan informasi yang salah atau menyesatkan.
- Berikan referensi atau sumber jika memungkinkan.
- Jawablah dengan nada yang ramah dan membantu.`,
    };

    const finalMessages = [systemMessage, ...messages];

    // Jalankan model Granite (non-streaming)
    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
      input: {
        messages: finalMessages,
        temperature: 0.6,
        max_completion_tokens: 512,
      },
    });

    // Replicate biasanya mengembalikan array of JSON string
    let reply = "";
    if (Array.isArray(output)) {
      const combined = output.join("");
      try {
        const parsed = JSON.parse(combined);
        reply =
          parsed?.choices?.[0]?.message?.content ??
          parsed?.choices?.[0]?.text ??
          combined;
      } catch {
        reply = combined;
      }
    } else if (typeof output === "object" && output !== null) {
      // @ts-ignore
      reply = output?.choices?.[0]?.message?.content ?? "No reply";
    } else if (typeof output === "string") {
      reply = output;
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chatbot API error:", err);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
