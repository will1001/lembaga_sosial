import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    const isCurrentPath = location.pathname === path;
    if (isCurrentPath) return "text-yellow-500 font-medium";
    if (isHomePage && !scrolled && isMenuOpen) return "text-black hover:text-yellow-500";
    if (isHomePage && !scrolled) return "text-white hover:text-yellow-500";
    return "text-gray-800 hover:text-yellow-500";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <Logo
              color={
                scrolled
                  ? "black"
                  : location.pathname !== "/"
                  ? "black"
                  : "white"
              }
            />
            <span
              className={`text-lg md:text-xl font-semibold ${
                isHomePage && !scrolled ? "text-white" : "text-gray-800"
              }`}
            >
              Cahaya Untuk Negeri
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive("/")} transition-colors duration-300`}
            >
              Beranda
            </Link>
            <Link
              to="/tentang-kami"
              className={`${isActive(
                "/tentang-kami"
              )} transition-colors duration-300`}
            >
              Tentang Kami
            </Link>
            <Link
              to="/program"
              className={`${isActive(
                "/program"
              )} transition-colors duration-300`}
            >
              Program
            </Link>
            <Link
              to="/galeri"
              className={`${isActive(
                "/galeri"
              )} transition-colors duration-300`}
            >
              Galeri
            </Link>
            <Link
              to="/berita"
              className={`${isActive(
                "/berita"
              )} transition-colors duration-300`}
            >
              Berita
            </Link>
            <Link
              to="/kontak"
              className={`${isActive(
                "/kontak"
              )} transition-colors duration-300`}
            >
              Kontak
            </Link>
            <Link
              to="/donasi"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
            >
              <Heart size={16} className="mr-2" /> Donasi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden focus:outline-none ${
              isHomePage && !scrolled ? "text-white" : "text-gray-800"
            }`}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white text-black mt-4 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col text-black py-4">
              <Link
                to="/"
                className={`px-4 py-3 ${isActive("/")}`}
                onClick={closeMenu}
              >
                Beranda
              </Link>
              <Link
                to="/tentang-kami"
                className={`px-4 py-3  ${isActive("/tentang-kami")}`}
                onClick={closeMenu}
              >
                Tentang Kami
              </Link>
              <Link
                to="/program"
                className={`px-4 py-3 ${isActive("/program")}`}
                onClick={closeMenu}
              >
                Program
              </Link>
              <Link
                to="/galeri"
                className={`px-4 py-3 ${isActive("/galeri")}`}
                onClick={closeMenu}
              >
                Galeri
              </Link>
              <Link
                to="/berita"
                className={`px-4 py-3 ${isActive("/berita")}`}
                onClick={closeMenu}
              >
                Berita
              </Link>
              <Link
                to="/kontak"
                className={`px-4 py-3 ${isActive("/kontak")}`}
                onClick={closeMenu}
              >
                Kontak
              </Link>
              <Link
                to="/donasi"
                className="mx-4 mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-center transition-colors duration-300 flex items-center justify-center"
                onClick={closeMenu}
              >
                <Heart size={16} className="mr-2" /> Donasi
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
