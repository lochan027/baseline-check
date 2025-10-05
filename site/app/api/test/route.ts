import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ message: 'Hello from API!', timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Test API Error:', error)
    return NextResponse.json({ error: 'Test API failed' }, { status: 500 })
  }
}