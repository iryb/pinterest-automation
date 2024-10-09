import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code provided" },
      { status: 400 }
    );
  }

  try {
    // TODO: Exchange the code for an access token
    // This is where you'd make a request to Pinterest's token endpoint
    // Store the token securely (e.g., in a database associated with the user)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to exchange code for token:", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Pinterest" },
      { status: 500 }
    );
  }
}
