// Código por - Joaquín Saldarriaga
// This file is part of the login portal application.
// It contains the API route for fetching product categories.
// It exports a GET function that returns a list of product categories in JSON format.

import { NextResponse } from "next/server";

const categories = [
  { id: 1, name: "Office & writing", image: "/images/office.png" },
  { id: 2, name: "Technology", image: "/images/technology.png" },
  { id: 3, name: "Accessories", image: "/images/accessories.png" },
  { id: 4, name: "Shirts", image: "/images/shirts.png" },
  { id: 5, name: "Household", image: "/images/household.png" },
  { id: 6, name: "Movies & TV", image: "/images/movies.png" },
  { id: 7, name: "Pet supplies", image: "/images/pets.png" },
  { id: 8, name: "Sports", image: "/images/sports.png" },
  { id: 9, name: "Books", image: "/images/books.png" },

];

export async function GET() {
  return NextResponse.json(categories);

}
