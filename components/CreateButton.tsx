import React from 'react';
import Link from 'next/link';

interface CreateButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function CreateButton({ children, href }: CreateButtonProps) {
  return (
    <Link href={href}>
      <a className="bottom-24 right-5 hover:bg-orange-500 fixed p-5 text-white transition-colors bg-orange-400 border-transparent rounded-full shadow-xl cursor-pointer">
        {children}
      </a>
    </Link>
  );
}
