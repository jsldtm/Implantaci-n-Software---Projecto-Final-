import { NextResponse } from "next/server";
import { savedItems } from "../route";

export async function GET(request: Request, { params }: { params: { itemId: string } }) {
  const name = decodeURIComponent(params.itemId);
  const item = savedItems.find((item) => item.name === name);
  if (!item) {
    return NextResponse.json({ message: "Saved item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(request: Request, { params }: { params: { itemId: string } }) {
  const name = decodeURIComponent(params.itemId);
  const initialLength = savedItems.length;
  for (let i = savedItems.length - 1; i >= 0; i--) {
    if (savedItems[i].name === name) {
      savedItems.splice(i, 1);
    }
  }
  if (savedItems.length === initialLength) {
    return NextResponse.json({ message: "Saved item not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Saved item deleted", name });
}

