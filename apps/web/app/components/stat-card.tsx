import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string;
  icon: ReactNode;
}

export function StatCard({ title, subtitle, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-sm text-black">{title}</h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{subtitle}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-black text-black">{value}</p>
    </div>
  );
}
