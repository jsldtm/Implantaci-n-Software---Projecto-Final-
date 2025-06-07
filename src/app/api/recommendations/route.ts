// Código por - Joaquín Saldarriaga
// This endpoint provides product recommendations based on the user's preferences.
// It returns a list of recommended products with their details.

import { NextResponse } from "next/server";

const recommendations = [
    // Data simulation
    { id: 1, title: "Finals & midterms", description: "Get ready for exams!", image: "/images/exams.png" },
    { id: 2, title: "Spring & summer", description: "Latest from Shirts!", image: "/images/thisisnospring.png" },
    { id: 3, title: "Camping time!", description: "Gear up for adventures!", image: "/images/camping.png" },
    { id: 4, title: "Back to school", description: "Essentials for students!", image: "/images/backtoschool.png" },
    { id: 5, title: "Holiday specials", description: "Gifts for everyone!", image: "/images/holiday.png" },
    
];

export async function GET() {
  return NextResponse.json(recommendations);
}