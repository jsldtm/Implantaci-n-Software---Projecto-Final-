// Código por - Joaquín Saldarriaga
// This file is part of the login portal application.

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Simulate authentication logic
  if (email === 'user@example.com' && password === 'password123') {
    return NextResponse.json({ message: 'Login successful!', token: 'fake-jwt-token' });
  }

  return NextResponse.json({ message: 'Invalid credentials!' }, { status: 401 });
}