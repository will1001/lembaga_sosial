import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Heart,
} from "lucide-react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo color="white" />
              <h2 className="text-xl font-semibold">Cahaya Untuk Negeri</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Menerangi jalan menuju Indonesia yang lebih baik melalui
              pendidikan, kesehatan, dan pengembangan masyarakat.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-500 pb-2 inline-block">
              Kontak Kami
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin
                  size={18}
                  className="text-yellow-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-300">
                  Jl. Harapan Baru No. 123, Jakarta Selatan, DKI Jakarta
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-yellow-500 flex-shrink-0" />
                <p className="text-gray-300">+62 812 3456 7890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-yellow-500 flex-shrink-0" />
                <p className="text-gray-300">info@cahayauntuknegeri.org</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-500 pb-2 inline-block">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/tentang-kami"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/program"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Program
                </Link>
              </li>
              <li>
                <Link
                  to="/galeri"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  to="/berita"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-yellow-500 pb-2 inline-block">
              Berlangganan
            </h3>
            <p className="text-gray-300 mb-4">
              Dapatkan informasi terbaru tentang program dan kegiatan kami.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                Langganan <Heart size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Cahaya Untuk Negeri. Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
