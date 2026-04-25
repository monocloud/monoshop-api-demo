import type { Invoice } from "../actions/api";
import { StatusBadge } from "./status-badge";

export function InvoiceListItem({ id, total, status }: Invoice) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
      <div>
        <h3 className="font-bold text-black text-sm">{id}</h3>
        <p className="text-xs font-bold text-gray-400 mt-1">
          ${total.toLocaleString()}
        </p>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}
