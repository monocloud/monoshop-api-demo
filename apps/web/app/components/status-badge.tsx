interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isPaid = status === "paid";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
        isPaid ? "bg-accent text-black" : "bg-black text-white"
      }`}
    >
      {status}
    </span>
  );
}
