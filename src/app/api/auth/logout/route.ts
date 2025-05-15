// This file logs a user out of the application.

import { NextResponse } from 'next/server';

export async function POST() {
  // Simulate clearing the user's session
  return NextResponse.json({ message: 'Logout successful!' });

}