import axios from "axios";
import { NextResponse } from "next/server";


//
const NEST_BACKEND_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL || "http://localhost:5000/api";

export async function POST(request: Request) {
  try {
 
    const data = await request.json();

    const token = request.headers.get("authorization") || "";

  
    const response = await axios.post(
      `${NEST_BACKEND_URL}/challenges`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Error creating challenge:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal server error" },
      { status: error.response?.status || 500 }
    );
  }
}
