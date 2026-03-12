import { getInvoices } from "../actions/api";

export default async function InvoicesPage() {
  const res = await getInvoices();

  if (!res.success) {
    return (
      <div style={styles.status}>
        <h1>Invoices</h1>
        <p style={{ marginTop: 8, maxWidth: 600 }}>{res.errorMessage}</p>
      </div>
    );
  }

  const invoices = res.result;

  return (
    <div>
      <h1>Invoices</h1>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td style={styles.td}>{invoice.id}</td>
              <td style={styles.td}>${invoice.total}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      invoice.status === "paid" ? "#4caf50" : "#ff9800",
                  }}
                >
                  {invoice.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  status: {
    padding: "2rem",
    textAlign: "center" as const,
    color: "#666",
  },
  statusBadge: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    color: "white",
    textAlign: "center" as const,
    minWidth: "7rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  headerRow: {
    backgroundColor: "#f5f5f5",
    borderBottom: "2px solid #ddd",
  },
  th: {
    padding: "1rem",
    textAlign: "left" as const,
    fontWeight: "bold",
    color: "#333",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #eee",
    color: "#666",
  },
};
