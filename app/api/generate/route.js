import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request, context) {
  const prompt = request.nextUrl.searchParams.get("prompt");
  console.log("Prompt received:", prompt);

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  async function run() {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      // "generate the blog 'title' and 'content' in json format for " +
          // +". The content should use HTML tags and Tailwind CSS basic classes only to decorate text. Ensure the content is 3000+ words.and also keep in mind never use a newline character."

      console.log("Generated response:", result.response.text());
      return result.response.text(); // This should be a valid JSON string

    } catch (error) {
      console.error("Error during generation:", error);
      throw new Error("Failed to generate blog content.");
    }
  }

  try {
    const responseText = await run();

    // Attempt to parse the response to ensure it's valid JSON
    try {
      const parsedResponse = JSON.parse(responseText);
      return NextResponse.json({ json: parsedResponse });
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return NextResponse.json({ error: 'Failed to parse generated content.' });
    }

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: 'An error occurred while generating the blog.' });
  }
}
