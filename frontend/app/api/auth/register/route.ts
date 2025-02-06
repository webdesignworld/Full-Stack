"use client";

import axios from "axios";
import { NextResponse } from "next/server";

// http://localhost:5000
const NEST_BACKEND_URL = process.env.NEST_BACKEND_URL || "http://localhost:5000";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON from the frontend signup form.
    const data = await request.json();



    // Forward the data to your Express backend's manager signup endpoint.
    const response = await axios.post(`${NEST_BACKEND_URL}/auth/register`, data);

    // Return the response from your Express backend to the frontend.
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Manager signup error:", error);
    return NextResponse.json(
      { error: error?.response?.data?.message || "Internal server error" },
      { status: error?.response?.status || 500 }
    );
  }
}
