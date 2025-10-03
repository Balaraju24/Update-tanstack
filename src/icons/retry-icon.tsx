import React from "react";

type RetryIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
  title?: string;
};

const RetryIcon = React.forwardRef<SVGSVGElement, RetryIconProps>(
  ({ size = 14, strokeWidth = 2, title = "Retry", className, ...rest }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title}
      role="img"
      className={className}
      {...rest}
    >
      <title>{title}</title>
      <path
        d="M21 12a9 9 0 10-3.2 6.6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M21 3v6h-6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
);

RetryIcon.displayName = "RetryIcon";
export default RetryIcon;
