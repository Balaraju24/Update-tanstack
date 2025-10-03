export default function GreenTick({ size = 20, className = "", title = "Uploaded" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? "false" : "true"}
      role="img"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="10" fill="#ECFDF5" />
      <path
        d="M7 13.5L10 16.5L17 9.5"
        stroke="#059669"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}