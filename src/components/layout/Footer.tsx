import Link from "next/link";
import { Compass, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-shamaal-navy text-shamaal-cream pt-16 pb-8 border-t border-shamaal-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-shamaal-gold" />
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none tracking-wider text-white">
                  SHAMAAL<span className="text-shamaal-gold">®</span>
                </span>
                <span className="text-[10px] tracking-widest text-gray-300">THE GREAT NORTH</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium travel experiences across the breathtaking landscapes of Northern Pakistan. 
              Discover Hunza, Skardu, Fairy Meadows, and beyond with our expert guides.
            </p>
            <div className="flex space-x-4">
              {/* Social icons removed temporarily */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold tracking-wider mb-6 text-sm uppercase">Destinations</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/destinations/hunza" className="hover:text-shamaal-gold transition-colors">Hunza Valley</Link></li>
              <li><Link href="/destinations/skardu" className="hover:text-shamaal-gold transition-colors">Skardu & K2 Basecamp</Link></li>
              <li><Link href="/destinations/fairy-meadows" className="hover:text-shamaal-gold transition-colors">Fairy Meadows</Link></li>
              <li><Link href="/destinations/swat" className="hover:text-shamaal-gold transition-colors">Swat Valley</Link></li>
              <li><Link href="/destinations/chitral" className="hover:text-shamaal-gold transition-colors">Chitral & Kalash</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold tracking-wider mb-6 text-sm uppercase">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-shamaal-gold transition-colors">About Us</Link></li>
              <li><Link href="/tours" className="hover:text-shamaal-gold transition-colors">All Tours</Link></li>
              <li><Link href="/custom-tours" className="hover:text-shamaal-gold transition-colors">Custom Itineraries</Link></li>
              <li><Link href="/blog" className="hover:text-shamaal-gold transition-colors">Travel Blog</Link></li>
              <li><Link href="/contact" className="hover:text-shamaal-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold tracking-wider mb-6 text-sm uppercase">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-shamaal-gold shrink-0 mt-0.5" />
                <span>124 Blue Area, Jinnah Avenue<br />Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-shamaal-gold shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-shamaal-gold shrink-0" />
                <span>info@shamaaltourism.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shamaal Tourism. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
