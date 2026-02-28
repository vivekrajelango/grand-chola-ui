import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

export async function POST(req: Request) {
  try {
    const { product } = await req.json(); // Get data from client
    const output = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: product,
    });

    return NextResponse.json({ embedding: output });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
