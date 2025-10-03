export const LinkIcon = (
  ({ title = "Link", size = 24, strokeWidth = 2, color = "black" }) => (
    <svg

      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      color={color}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-labelledby={title ? "link-title" : undefined}
      role="img"

    >
      {title ? <title id="link-title">{title}</title> : null}
      <path d="M10 14a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L10 6.93" />
      <path d="M14 10a5 5 0 0 0-7.07 0L4.1 12.93a5 5 0 0 0 7.07 7.07L14 17.07" />
    </svg>
  )
);