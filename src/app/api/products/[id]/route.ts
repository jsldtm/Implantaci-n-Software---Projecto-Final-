import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Cable USB-B', price: 109.99, category: 'Technology' },
  { id: 2, name: 'Wireless Desk Charging', price: 149.99, category: 'Technology' },
  // COmplement with the other products of ALL categories
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}