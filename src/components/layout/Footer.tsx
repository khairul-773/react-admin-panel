const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
