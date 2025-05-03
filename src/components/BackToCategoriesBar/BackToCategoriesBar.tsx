// This file is part of the Product Detailed View page in a Next.js application.

import Link from "next/link";
import styles from "./BackToCategoriesBar.module.css";

export default function BackToCategoriesBar({ category }: { category: string }) {
  return (
    <div className={styles.bar}>
      {/* Navigate to the Categories portal with the selected category */}
      <Link href={`/categories?selectedCategory=${category}`} className={styles.link}>
        ← Back to {category}
      </Link>
    </div>
  );
}