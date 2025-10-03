import { UrlsIconProps } from "@/lib/interfaces/iconInterface";
export default function UrlsIcon({ className }: UrlsIconProps) {
  return (
    <>
      <svg
        width="26"
        height="26"
        className={className}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0003 23.8337C18.9834 23.8337 23.8337 18.9834 23.8337 13.0003C23.8337 7.01724 18.9834 2.16699 13.0003 2.16699C7.01724 2.16699 2.16699 7.01724 2.16699 13.0003C2.16699 18.9834 7.01724 23.8337 13.0003 23.8337Z"
          stroke="#16A249"
          strokeWidth="2.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.9998 2.16699C10.2181 5.08783 8.6665 8.96679 8.6665 13.0003C8.6665 17.0339 10.2181 20.9128 12.9998 23.8337C15.7816 20.9128 17.3332 17.0339 17.3332 13.0003C17.3332 8.96679 15.7816 5.08783 12.9998 2.16699Z"
          stroke="#16A249"
          strokeWidth="2.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.16699 13H23.8337"
          stroke="#16A249"
          strokeWidth="2.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
