// This file works on the 'saved' API route.
// It exports a GET function that returns a list of saved items in JSON format.

import { NextResponse } from 'next/server';

const savedItems = [
  { name: 'Advanced Scientific Calculator', image: '/images/calculator.png' },
  { name: 'Themed Tumbler', image: '/images/tumbler.png' },
  { name: 'Glasses?', image: '/images/glasses.png' },
  { name: 'Mini Desk Lamp', image: '/images/lamp.png' },
  { name: 'Wireless Desk Charging', image: '/images/wireless-charger.png' },
  
  // Continue adding more items as needed
  { name: 'One Hundred Years of Solitude book illustrated', image: '/images/cienaniosdesoledad.png' },
  { name: 'Canvas Tote Bag', image: '/images/totebag.png' },
  { name: 'Paper Over Board Ring Binders', image: '/images/pinkbinder.png' },
  
];

export async function GET() {
  return NextResponse.json(savedItems);
}

export async function POST(request: Request) {
  const item = await request.json();
  savedItems.push(item);
  return NextResponse.json({ message: 'Item saved for later', savedItems });
}

export { savedItems };