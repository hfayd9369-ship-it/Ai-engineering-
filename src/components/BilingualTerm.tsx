interface BilingualTermProps {
  children: string;
  mono?: boolean;
  className?: string;
}

export function BilingualTerm({ children, mono = false, className = '' }: BilingualTermProps) {
  return (
    <span
      dir="ltr"
      className={`inline-block ${mono ? 'font-mono text-[0.92em]' : ''} ${className}`}
    >
      {children}
    </span>
  );
}
