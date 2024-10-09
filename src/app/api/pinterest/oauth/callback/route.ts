import { NextResponse } from "next/server";

const PINTEREST_APP_ID = process.env.PINTEREST_APP_ID;
const PINTEREST_APP_SECRET = process.env.PINTEREST_APP_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pinterest/oauth/callback`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/dashboard?error=no_code");
  }

  try {
    const tokenResponse = await fetch(
      "https://api.pinterest.com/v5/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          client_id: PINTEREST_APP_ID!,
          client_secret: PINTEREST_APP_SECRET!,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const tokenData = await tokenResponse.json();

    // TODO: Store the access token securely (e.g., in a database)
    console.log("Access Token:", tokenData.access_token);

    // Redirect back to the dashboard with a success message
    return NextResponse.redirect("/dashboard?success=true");
  } catch (error) {
    console.error("Failed to exchange code for token:", error);
    return NextResponse.redirect("/dashboard?error=auth_failed");
  }
}
