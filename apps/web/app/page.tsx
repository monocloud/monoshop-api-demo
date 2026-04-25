import { isAuthenticated } from "@monocloud/auth-nextjs";
import {
  CheckCircle2,
  DollarSign,
  FileText,
  Package,
} from "lucide-react";
import { getInvoices, getProducts } from "./actions/api";
import { EmptyState } from "./components/empty-state";
import { InvoiceListItem } from "./components/invoice-list-item";
import { ProductCard } from "./components/product-card";
import { SectionHeader } from "./components/section-header";
import { StatCard } from "./components/stat-card";

const RECENT_PRODUCT_COUNT = 3;
const RECENT_INVOICE_COUNT = 4;

export default async function DashboardPage() {
  const authenticated = await isAuthenticated();

  const [productsRes, invoicesRes] = authenticated
    ? await Promise.all([getProducts(), getInvoices()])
    : [null, null];

  const products = productsRes?.success ? productsRes.result : [];
  const invoices = invoicesRes?.success ? invoicesRes.result : [];

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-1">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Overview of your MonoShop business.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Products"
          subtitle="Available in store"
          value={String(products.length)}
          icon={<Package className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          title="Total Invoices"
          subtitle="All generated"
          value={String(invoices.length)}
          icon={<FileText className="w-5 h-5 text-purple-500" />}
        />
        <StatCard
          title="Revenue"
          subtitle="Total earned"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5 text-green-500" />}
        />
        <StatCard
          title="Paid Invoices"
          subtitle="Successfully completed"
          value={String(paidInvoices)}
          icon={<CheckCircle2 className="w-5 h-5 text-orange-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-gray-50 rounded-2xl p-6 shadow-sm">
          <SectionHeader title="Recent Products" href="/products" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {!authenticated ? (
              <div className="col-span-full">
                <EmptyState message="Sign in to view products" />
              </div>
            ) : !productsRes?.success ? (
              <div className="col-span-full">
                <EmptyState message="Error loading products" tone="error" />
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full">
                <EmptyState message="No products found" />
              </div>
            ) : (
              products.slice(0, RECENT_PRODUCT_COUNT).map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              ))
            )}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-6 shadow-sm">
          <SectionHeader title="Recent Invoices" href="/invoices" />

          <div className="flex flex-col gap-3">
            {!authenticated ? (
              <EmptyState message="Sign in to view invoices" />
            ) : !invoicesRes?.success ? (
              <EmptyState message="Error loading invoices" tone="error" />
            ) : invoices.length === 0 ? (
              <EmptyState message="No invoices found" />
            ) : (
              invoices
                .slice(0, RECENT_INVOICE_COUNT)
                .map((invoice) => <InvoiceListItem key={invoice.id} {...invoice} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
