// Código por - Joaquín Saldarriaga
import { NextResponse } from "next/server";
import { cart, CartItem } from "../route";

export async function GET(request: Request, { params }: { params: { itemId: string } }) {
  const id = params.itemId;
  const item = cart.find((item) => String(item.id) === id);
  if (!item) {
    return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: { params: { itemId: string } }) {
  const id = params.itemId;
  const { quantity } = await request.json();
  let updated = false;
  for (let i = 0; i < cart.length; i++) {
    if (String(cart[i].id) === id) {
      cart[i].quantity = quantity;
      updated = true;
      break;
    }
  }
  if (!updated) {
    return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Cart item updated", id, quantity });
}

export async function DELETE(request: Request, { params }: { params: { itemId: string } }) {
  const id = params.itemId;
  const initialLength = cart.length;
  for (let i = cart.length - 1; i >= 0; i--) {
    if (String(cart[i].id) === id) {
      cart.splice(i, 1);
    }
  }
  if (cart.length === initialLength) {
    return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Cart item deleted", id });
}

// Export the CartItem type for use in other files
// export type { CartItem };