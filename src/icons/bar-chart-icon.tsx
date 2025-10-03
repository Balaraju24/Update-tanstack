export const BarChartIcon = (
  ({
    title = "Bar chart",
    size = 24,
    strokeWidth = 1,
    color = "dodgerblue",
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-labelledby={title ? "bar-chart-title" : undefined}
      role="img"
    >
      {title ? <title id="bar-chart-title">{title}</title> : null}
      {/* base / axis line */}
      <path d="M3 21h18" />
      {/* bars */}
      <rect x="6" y="11" width="2.5" height="10" rx="0.4" fill={color} />
      <rect x="11" y="7" width="2.5" height="14" rx="0.4" fill={color} />
      <rect x="16" y="4" width="2.5" height="17" rx="0.4" fill={color} />
    </svg>
  )
);
