
import axios from "axios";
import { NextResponse } from "next/server";


//
const NESTJS_BACKEND_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL || "http://localhost:5000/api";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON body (challenge data)
    const data = await request.json();

    // Get the Authorization header from the incoming request.
    // (If you want to forward the same token the client sent.)
    const token = request.headers.get("authorization") || "";

    // Forward the POST request to your NestJS API.
    // For example, assume your NestJS endpoint is at /challenges
    const response = await axios.post(
      `${NESTJS_BACKEND_URL}/challenges`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    // Return the response from the NestJS API.
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Error creating challenge:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal server error" },
      { status: error.response?.status || 500 }
    );
  }
}
