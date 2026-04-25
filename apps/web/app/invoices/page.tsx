import { getInvoices } from "../actions/api";
import { ErrorCard } from "../components/error-card";
import { InvoiceTable } from "../components/invoice-table";

export default async function InvoicesPage() {
  const res = await getInvoices();

  if (!res.success) {
    return <ErrorCard title="Error Loading Invoices" message={res.errorMessage} />;
  }

  const invoices = res.result;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-1">
          Invoices
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          {invoices.length} transactions
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 md:p-6 shadow-sm overflow-hidden">
        <InvoiceTable invoices={invoices} />
      </div>
    </div>
  );
}
