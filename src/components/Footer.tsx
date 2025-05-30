
import { Car, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-blue-600 rounded-lg p-2">
            <Car className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold">Foam Kings by UrbanShine</h4>
          </div>
        </div>
        <p className="text-gray-400 mb-4">Professional car detailing services</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Phone className="h-4 w-4" />
            <span>(555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail className="h-4 w-4" />
            <span>info@foamkings.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
