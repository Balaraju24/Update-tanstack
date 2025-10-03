export const UploadIcon = (
  ({ title = "Upload", size = 20, strokeWidth = 2, color = "black",}) => (
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
      aria-labelledby={title ? "upload-title" : undefined}
      role="img"
    >
      {title ? <title id="upload-title">{title}</title> : null}
      {/* box / tray */}
      <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" />
      {/* upward arrow */}
      <path d="M12 3v13" />
      <path d="M8 7l4-4 4 4" />
    </svg>
  )
);