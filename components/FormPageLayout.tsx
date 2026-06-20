import Link from "next/link";
import { ReactNode } from "react";

const BRAND = "HomeSewa";

export function FormPageTitle({ title }: { title: string }) {
  const suffix = ` ${BRAND}`;

  if (title.endsWith(suffix)) {
    const prefix = title.slice(0, -suffix.length);
    return (
      <h1 className="mt-2 text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
        {prefix}
        <br />
        {BRAND}
      </h1>
    );
  }

  return (
    <h1 className="mt-2 text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
      {title}
    </h1>
  );
}

type FormPageLayoutProps = {
  breadcrumb: string;
  title: string;
  children: ReactNode;
};

export default function FormPageLayout({
  breadcrumb,
  title,
  children,
}: FormPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-24 md:pb-10">
      <div className="shrink-0 border-b border-gray-100 px-4 py-3 text-center">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-1 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="font-semibold text-gray-800">{breadcrumb}</span>
        </div>

        <FormPageTitle title={title} />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="rounded-lg shadow-md">{children}</div>
      </div>
    </div>
  );
}
