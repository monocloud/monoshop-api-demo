import type { Invoice } from "../actions/api";
import { StatusBadge } from "./status-badge";

const columns = ["Invoice ID", "Total", "Status"];

const headerClass =
  "px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-200";
const cellClass = "px-6 py-5 border-b border-gray-100";

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} className={headerClass}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-white transition-colors">
              <td className={`${cellClass} text-sm font-bold text-black`}>
                {invoice.id}
              </td>
              <td className={`${cellClass} text-sm font-black text-black`}>
                ${invoice.total.toLocaleString()}
              </td>
              <td className={cellClass}>
                <StatusBadge status={invoice.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
