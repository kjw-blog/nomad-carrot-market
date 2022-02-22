import React from 'react';
import Link from 'next/link';

interface CreateButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function CreateButton({ children, href }: CreateButtonProps) {
  return (
    <div>
      <Link href={href}>
        <a className="fixed bottom-24 border-transparent right-5 hover:bg-orange-500 cursor-pointer transition-colors bg-orange-400 rounded-full p-5 text-white shadow-xl">
          {children}
        </a>
      </Link>
    </div>
  );
}
