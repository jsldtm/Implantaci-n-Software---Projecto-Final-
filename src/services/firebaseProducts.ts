// This Service file handles the Firebase product-related operations
// such as fetching, adding, updating, & deleting products!

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/services/firebase";

const db = getFirestore(app);

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => doc.data());
}
