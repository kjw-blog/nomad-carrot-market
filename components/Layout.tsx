import React from 'react';
import { cls } from '../libs/utils';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  return (
    <div>
      <div className="bg-orange-500 w-full text-lg font-semibold py-3 fixed text-white border-b top-0 flex items-center justify-center">
        {title ? <span>{title}</span> : null}
      </div>
      <div className={cls('pt-16', hasTabBar ? ' pb-16' : '')}>{children}</div>
      {hasTabBar ? (
        <nav className="bg-orange-500 text-white font-semibold w-full border-t fixed bottom-0 pb-10 pt-3 flex justify-between items-center"></nav>
      ) : null}
    </div>
  );
}
