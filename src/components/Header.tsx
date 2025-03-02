
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <span className="text-xl font-medium tracking-tight">Language Placement Test</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
