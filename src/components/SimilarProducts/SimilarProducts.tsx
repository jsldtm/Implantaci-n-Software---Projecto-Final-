// This file is part of the Product Detailed View page
// It provides a "Back to Categories" link that allows...
//    users to navigate back to the specified category page.  

import styles from "./SimilarProducts.module.css";

export default function SimilarProducts({ category }: { category: string }) {
  const products = [
    {
      id: "1",
      name: "Licensed Jaguar I-Pace R.C. Toy Car",
      price: "$1799.99 MXN",
      image: "/images/minijaguarrc.png",
    },
    {
      id: "2",
      name: "Google Home Mini 2nd Generation - Chalk",
      price: "$1199.99 MXN",
      image: "/images/google-home.png",
    },
    {
      id: "3",
      name: "Uber One Gift Card",
      price: "$119.99 MXN",
      image: "/images/uber-one.png",
    },
  ];

  return (
    <div className={styles.similarProducts}>
      <h2 className={styles.title}>Similar products</h2>
      <div className={styles.list}>
        {products.map((product) => (
          <div key={product.id} className={styles.product}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}