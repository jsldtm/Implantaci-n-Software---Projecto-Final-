// This file registers a new user

// This file registers a new user

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  email: string;
  passwordHash: string;
}

let users: User[] = [];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  // Check if the user already exists
  if (users.find((user) => user.email === email)) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser: User = { id: users.length + 1, email, passwordHash };
  users.push(newUser);

  return NextResponse.json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email } });
}