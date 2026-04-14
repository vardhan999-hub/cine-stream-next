'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="nav-links">
      <Link
        href="/"
        className={`nav-link${pathname === '/' ? ' active' : ''}`}
      >
        Discover
      </Link>
      <Link
        href="/favorites"
        className={`nav-link${pathname === '/favorites' ? ' active' : ''}`}
      >
        ❤ Favorites
      </Link>
    </div>
  );
};

export default NavLinks;