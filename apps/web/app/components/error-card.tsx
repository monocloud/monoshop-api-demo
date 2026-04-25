interface ErrorCardProps {
  title: string;
  message: string;
}

export function ErrorCard({ title, message }: ErrorCardProps) {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-red-50 rounded-2xl text-center shadow-sm border border-red-100">
      <h1 className="text-2xl font-bold text-red-700 mb-2">{title}</h1>
      <p className="text-red-600">{message}</p>
    </div>
  );
}
