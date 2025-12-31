export default function Button({ children, variant = "solid", className = "", ...props }) {
  const base = "px-6 py-3 rounded-lg font-medium transition";

  const styles =
    variant === " outline"
      ? "border border-gray-700 text-white hover:bg-gray-800"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
