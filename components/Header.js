// components/Header.js

import Link from 'next/link';
// components/Header.js

// import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
      <div className="text-2xl font-bold text-gray-800">
          Blog Gen AI
        </div>
        <nav className="flex space-x-4">
          <Link href="/"
             className="text-gray-800 hover:text-gray-600">Home
          </Link>
          <Link href="/about"
             className="text-gray-800 hover:text-gray-600">About
          </Link>
          <Link href="/contact"
             className="text-gray-800 hover:text-gray-600">Contact
          </Link>
        </nav>
       
      </div>
    </header>
  );
};

export default Header;
 