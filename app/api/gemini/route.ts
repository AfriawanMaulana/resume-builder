import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        return console.error('Invalid API KEY')
    }
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // const prompt = `
    //     Summarize the following resume into a short professional profile (3-4 sentences).
    //     Write the results directly, without prefixes, without introductions, without text prompts, without additional explanations.
    //     Write the summary in ${language === "english" ? "english" : "indonesian"}
    // ---
    // ${resumeText}
    // `;
    const prompt = `${resumeText}`

    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    // summary = summary.replace(/^Berikut.*?:\s*/i, "");


    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
