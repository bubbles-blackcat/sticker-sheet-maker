import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-pink-100 shadow-sm fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif text-purple-600 hover:text-purple-800 transition duration-300">
              StickerBloom
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              to="/create"
              className="text-purple-700 hover:text-pink-500 font-medium text-sm uppercase tracking-wide transition duration-300"
            >
              Create
            </Link>
            <Link
              to="/gallery"
              className="text-purple-700 hover:text-pink-500 font-medium text-sm uppercase tracking-wide transition duration-300"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-purple-700 hover:text-pink-500 font-medium text-sm uppercase tracking-wide transition duration-300"
            >
              About
            </Link>
          </div>
          {/* User Action */}
          <div>
            <Link
              to="/login"
              className="bg-pink-300 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-400 transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};