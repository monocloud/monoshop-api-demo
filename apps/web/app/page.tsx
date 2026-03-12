import { getInvoices, getProducts } from "./actions/api";

export default async function DashboardPage() {
  const [productsRes, invoicesRes] = 
    await Promise.all([
        getProducts(),
        getInvoices(),
      ]);

  const products = productsRes?.success ? productsRes.result : [];
  const invoices = invoicesRes?.success ? invoicesRes.result : [];

  const productCount = products.length;
  const invoiceCount = invoices.length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>Total Products</h3>
          <p style={styles.statValue}>{productCount}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Invoices</h3>
          <p style={styles.statValue}>{invoiceCount}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Revenue</h3>
          <p style={styles.statValue}>${totalRevenue}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Paid Invoices</h3>
          <p style={styles.statValue}>{paidInvoices}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Recent Products</h2>
        <div style={styles.itemList}>
          {!productsRes?.success ? (
            <div style={styles.status}>Error loading products</div>
          ) : products.length === 0 ? (
            <div style={styles.status}>No products found</div>
          ) : (
            products.slice(0, 3).map((product) => (
              <div key={product.id} style={styles.item}>
                <span>{product.name}</span>
                <span style={styles.price}>${product.price}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h2>Recent Invoices</h2>
        <div style={styles.itemList}>
          {!invoicesRes?.success ? (
            <div style={styles.status}>Error loading invoices</div>
          ) : invoices.length === 0 ? (
            <div style={styles.status}>No invoices found</div>
          ) : (
            invoices.slice(0, 3).map((invoice) => (
              <div key={invoice.id} style={styles.item}>
                <span>{invoice.id}</span>
                <span style={styles.price}>${invoice.total}</span>
              </div>
            ))
          )}
        </div>
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  statCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#007bff",
    margin: "0.5rem 0 0 0",
  },
  section: {
    marginTop: "2rem",
  },
  itemList: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    color: "#007bff",
  },
};
