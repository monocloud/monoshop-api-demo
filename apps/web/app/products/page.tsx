import { getProducts } from "../actions/api";

export default async function ProductsPage() {
  const res = await getProducts();

  if (!res.success) {
    return (
      <div style={styles.status}>
        <h1>Products</h1>
        <p style={{ marginTop: 8, maxWidth: 600 }}>
          {res.errorMessage}
        </p>
      </div>
    );
  }

  const products = res.result;

  return (
    <div>
      <h1>Products</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <h3>{product.name}</h3>
            <p style={styles.price}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  status: {
    padding: "2rem",
    textAlign: "center" as const,
    color: "#666",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#007bff",
    margin: "0.5rem 0 0 0",
  },
};
