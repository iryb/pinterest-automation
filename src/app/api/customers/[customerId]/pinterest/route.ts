import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  // Mock implementation - just return the received data
  return NextResponse.json(body)
}