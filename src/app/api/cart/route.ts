// This file is part of the login portal application.

// This file is part of the login portal application.

import { NextResponse } from "next/server";

// Define the type for a cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Explicitly type the cart as an array of CartItem
let cart: CartItem[] = [];

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const item: CartItem = await request.json();
  cart.push(item);
  return NextResponse.json({ message: "Item added to cart!", cartItem: item });
}

export async function PUT(request: Request) {
  const { id, quantity }: { id: number; quantity: number } = await request.json();
  cart = cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  return NextResponse.json({ message: "Item quantity updated!", updatedQuantity: quantity });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() || "0", 10);
  cart = cart.filter((item) => item.id !== id);
  return NextResponse.json({ message: "Item removed from cart!", cart });
}

export type { CartItem };
export { cart };