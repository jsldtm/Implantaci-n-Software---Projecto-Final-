// Código por - Joaquín Saldarriaga
// This Service file handles the Firebase product-related operations
// such as fetching, adding, updating, & deleting products!

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "@/services/firebase";

const db = getFirestore(app);

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => doc.data());
}

// Function to add a new product
export async function addProduct(product: any) {
  return await addDoc(collection(db, "products"), product);

}
