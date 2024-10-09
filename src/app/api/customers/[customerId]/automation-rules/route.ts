import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  const customerId = params.customerId;
  // Mock implementation - return dummy automation rules
  return NextResponse.json([
    { id: "1", name: "Rule 1", customerId },
    { id: "2", name: "Rule 2", customerId },
  ]);
}

export async function POST(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  const customerId = params.customerId;
  const body = await request.json();
  // Mock implementation - return the new rule with an ID
  return NextResponse.json({
    id: "3",
    customerId,
    ...body,
  });
}
