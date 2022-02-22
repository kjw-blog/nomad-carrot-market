import React from 'react';
import Link from 'next/link';
import { cls } from '../libs/utils';
import { useRouter } from 'next/router';

interface NavLinkProps {
  children: React.ReactNode;
  text: string;
  href: string;
}

export default function NavLink({ children, text, href }: NavLinkProps) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={cls(
          'flex flex-col items-center space-y-2 ',
          router.pathname === href ? 'text-orange-500' : 'hover:text-gray-500'
        )}
      >
        {children}
        <span>{text}</span>
      </a>
    </Link>
  );
}
