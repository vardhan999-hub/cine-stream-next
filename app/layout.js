import './globals.css';
import Link from 'next/link';
import NavLinks from '../components/NavLinks';

export const metadata = {
  title: 'Cine·Stream — Discover Movies',
  description: 'Millions of movies. Zero excuses. Start exploring.',
};

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-inner">
      <Link href="/" className="logo">
        CINE<span>·</span>STREAM
      </Link>
      <NavLinks />
    </div>
  </nav>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
