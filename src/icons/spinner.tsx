// Spinner.tsx
export default function Spinner({ size = 12, color = "blue-600" }: { size?: number; color?: string }) {
  return (
    <div
      className={`border-4 border-${color} border-t-transparent rounded-full animate-spin`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size / 6}px`,
      }}
    />
  );
}
