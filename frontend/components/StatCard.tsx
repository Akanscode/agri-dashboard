// components/StatCard.tsx

interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
}

export default function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="bg-cream border border-border rounded-sm shadow-classic p-5 flex-1">
      <p className="text-xs uppercase tracking-wide text-muted font-medium">{label}</p>
      <p className="font-serif text-3xl font-bold text-navy mt-2">{value}</p>
      {sublabel && <p className="text-xs text-muted mt-1">{sublabel}</p>}
    </div>
  );
}