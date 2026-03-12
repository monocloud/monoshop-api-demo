import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            <h1 style={styles.logo}>MonoShop</h1>
            <ul style={styles.navList}>
              <li>
                <a href="/" style={styles.navLink}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/products" style={styles.navLink}>
                  Products
                </a>
              </li>
              <li>
                <a href="/invoices" style={styles.navLink}>
                  Invoices
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main style={styles.main}>{children}</main>
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "system-ui, -apple-system, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  nav: {
    backgroundColor: "#1a1a1a",
    color: "white",
    padding: "1rem 0",
    borderBottom: "1px solid #333",
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    gap: "2rem",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "opacity 0.2s",
  },
  main: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "0 2rem",
  },
};
