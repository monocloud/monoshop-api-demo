type Tone = "neutral" | "subtle" | "error";

const tones: Record<Tone, string> = {
  neutral: "bg-white text-gray-400 py-12",
  subtle: "bg-gray-50 text-gray-400 py-16",
  error: "bg-red-50/50 text-red-500 py-12",
};

interface EmptyStateProps {
  message: string;
  tone?: Tone;
}

export function EmptyState({ message, tone = "neutral" }: EmptyStateProps) {
  return (
    <div className={`text-center text-sm rounded-2xl ${tones[tone]}`}>
      {message}
    </div>
  );
}
