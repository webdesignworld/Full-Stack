
import axios from "axios";
import { NextResponse } from "next/server";

// Use your environment variable for the NestJS API base URL.
const NESTJS_API_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL || "http://localhost:5000/api";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Retrieve the token from the request headers.
    const token = request.headers.get("authorization") || "";

    // Forward the DELETE request to your NestJS API endpoint.
    const response = await axios.delete(
      `${NESTJS_API_URL}/challenges/${params.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Delete challenge error:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal server error" },
      { status: error.response?.status || 500 }
    );
  }
}
