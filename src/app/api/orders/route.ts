// Código por - Joaquín Saldarriaga
// This API endpoint handles the creation of new orders!
// It (will) use Firebase Firestore to store order data

import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "@/services/firebase";
import { verifyFirebaseToken } from "@/services/verifyFirebaseToken";

// Define the Firestore database
const db = getFirestore(app);

// Now we can create the API route for orders
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split("Bearer ")[1];
  try {
    await verifyFirebaseToken(token || "");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ordersCol = collection(db, "orders");
  const snapshot = await getDocs(ordersCol);
  const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(orders);
}

// Then we can create the POST route to add new orders
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split("Bearer ")[1];
  try {
    await verifyFirebaseToken(token || "");
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const ordersCol = collection(db, "orders");
  const docRef = await addDoc(ordersCol, data);
  return NextResponse.json({ id: docRef.id });

}
