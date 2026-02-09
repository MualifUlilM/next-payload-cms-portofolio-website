import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#F5F5F5] text-[#666666]",
  accent: "bg-blue-50 text-[#2563EB]",
  success: "bg-green-50 text-[#16A34A]",
  outline: "bg-transparent border border-[#E5E5E5] text-[#666666]",
};

export function Badge({
  variant = "default",
  children,
  className,
  interactive,
  onClick,
}: BadgeProps) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-widest uppercase";
  const interactiveStyles = interactive
    ? "cursor-pointer hover:border-[#2563EB] transition-colors duration-150"
    : "";

  return (
    <span
      className={cn(base, variantStyles[variant], interactiveStyles, className)}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </span>
  );
}
