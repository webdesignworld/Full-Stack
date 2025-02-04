"use client";

import axios from "axios";
import { NextResponse } from "next/server";

// Use an environment variable for your Express backend URL (or fallback to localhost)
const EXPRESS_BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:5000";

export async function POST(request: Request) {
  try {
    // Parse the JSON from the client request
    const data = await request.json();

    // Forward the sign-in request to your Express backend's manager sign-in endpoint.
    // Adjust the endpoint path if needed.
    const response = await axios.post(
      `${EXPRESS_BACKEND_URL}/api/manager/signin`,
      data
    );

    // Assume the Express backend returns an object with a token.
    const token = response.data.token;

    // Create a NextResponse, include a success message and the token,
    // and set a cookie for server-side access.
    const res = NextResponse.json({ message: "Logged in successfully", token });
    res.cookies.set("token", token, {
      httpOnly: true, // inaccessible to JavaScript on the client
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error: any) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal server error" },
      { status: error.response?.status || 500 }
    );
  }
}
