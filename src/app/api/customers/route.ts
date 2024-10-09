import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // Mock implementation - just return the received data
  return NextResponse.json(body);
}

export async function GET() {
  // Mock implementation - return a list of customers
  return NextResponse.json([
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ]);
}
