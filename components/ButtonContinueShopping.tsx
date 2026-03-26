import Link from "next/link";

export function ButtonContinueShopping({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex border border-neutral-900 px-4 py-2 text-sm uppercase text-neutral-900 transition-colors hover:bg-neutral-900 hover:!text-white ${className}`.trim()}
    >
      <span className="transition-colors group-hover:!text-white">Continue shopping</span>
    </Link>
  );
}
