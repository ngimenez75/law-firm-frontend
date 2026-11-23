import React from "react";
import type { BadgeVariant } from "@/types";

interface PastelBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  showDot?: boolean;
  className?: string;
  size?: "sm" | "md";
}

const VARIANT_STYLES: Record<
  BadgeVariant,
  {
    bg: string;
    border: string;
    text: string;
    dot: string;
  }
> = {
  rose: {
    bg: "bg-[#F9EBEB]",
    border: "border-[#EBCACA]",
    text: "text-[#7F2929]",
    dot: "bg-[#C85A5A]",
  },
  amber: {
    bg: "bg-[#FAF1E2]",
    border: "border-[#EBD5B3]",
    text: "text-[#78521A]",
    dot: "bg-[#D49B4B]",
  },
  sage: {
    bg: "bg-[#EAF2EC]",
    border: "border-[#C5DEC9]",
    text: "text-[#265438]",
    dot: "bg-[#53946B]",
  },
  mist: {
    bg: "bg-[#EBF0F5]",
    border: "border-[#C9D8E6]",
    text: "text-[#274868]",
    dot: "bg-[#527CA6]",
  },
  lavender: {
    bg: "bg-[#F1EEF7]",
    border: "border-[#D7CFE8]",
    text: "text-[#49386B]",
    dot: "bg-[#7C65A8]",
  },
};

export function PastelBadge({
  variant = "mist",
  children,
  showDot = false,
  className = "",
  size = "sm",
}: PastelBadgeProps) {
  const styles = VARIANT_STYLES[variant];
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5"
      : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border ${styles.bg} ${styles.border} ${styles.text} ${sizeClasses} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
