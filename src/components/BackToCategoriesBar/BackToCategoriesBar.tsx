// This file is part of the Product Detailed View page in a Next.js application.

import Link from "next/link";
import styles from "./BackToCategoriesBar.module.css";

export default function BackToCategoriesBar({ category }: { category: string }) {
  return (
    <div className={styles.bar}>
      <Link href={`/category/${category.toLowerCase()}`} className={styles.link}>
        ← Back to {category}
      </Link>
    </div>
  );
}