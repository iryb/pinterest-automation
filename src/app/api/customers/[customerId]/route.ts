import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  const customerId = params.customerId;
  // Mock implementation - return a dummy customer object
  return NextResponse.json({
    id: customerId,
    name: "John Doe",
    email: "john@example.com",
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  const customerId = params.customerId;
  const body = await request.json();
  // Mock implementation - return the updated customer data
  return NextResponse.json({
    id: customerId,
    ...body,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  const customerId = params.customerId;
  // Mock implementation - return a success message
  return NextResponse.json({
    message: `Customer ${customerId} deleted successfully`,
  });
}
