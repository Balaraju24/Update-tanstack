import React, { forwardRef } from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  title?: string;
  className?: string;
};

/**
 * Red flag icon
 * Usage: <FlagRed size={24} title="Issue" />
 */
export const FlagRed = forwardRef<SVGSVGElement, IconProps>(function FlagRed(
  { size = 14, title = "Red flag", className, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
      {...props}
    >
      <title>{title}</title>
      {/* pole */}
      <path
        d="M4 2v20"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* waving flag */}
      <path
        d="M4 4c2.5 0 3.5-.5 6 0 2.5.5 3.5 1.5 6 1.5v8c-2.5 0-3.5-1-6-1.5-2.5-.5-3.5 0-6 0V4z"
        fill="#EF4444"
        stroke="#B91C1C"
        strokeWidth={0.5}
      />
    </svg>
  );
});

FlagRed.displayName = "FlagRed";

/**
 * Green flag icon
 * Usage: <FlagGreen size={24} title="OK" />
 */
export const FlagGreen = forwardRef<SVGSVGElement, IconProps>(function FlagGreen(
  { size = 14, title = "Green flag", className, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
      {...props}
    >
      <title>{title}</title>
      {/* pole */}
      <path
        d="M4 2v20"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* waving flag */}
      <path
        d="M4 4c2.5 0 3.5-.5 6 0 2.5.5 3.5 1.5 6 1.5v8c-2.5 0-3.5-1-6-1.5-2.5-.5-3.5 0-6 0V4z"
        fill="#10B981"
        stroke="#047857"
        strokeWidth={0.5}
      />
    </svg>
  );
});

FlagGreen.displayName = "FlagGreen";

/**
 * Default export: tiny demo wrapper that shows both icons and how to customize them
 */
export default function FlagIconsDemo() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <FlagRed size={28} title="Important / Problem" />
        <span>Red flag</span>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <FlagGreen size={28} title="Good / OK" />
        <span>Green flag</span>
      </div>
    </div>
  );
}
