import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Medikiosk
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Home
          </Link>

          <Link
            href="/#about"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            About
          </Link>

          <Link
            href="/#services"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Services
          </Link>

          <Link
            href="/#contact"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Contact
          </Link>
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="rounded-lg bg-[#0969da] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0757b5]"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
