
import { Button } from "@/components/ui/button";
import { Car, Phone, Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Foam Kings</h1>
              <p className="text-sm text-blue-600 font-medium">by UrbanShine</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@foamkings.com</span>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="mr-2">
                <Settings className="h-4 w-4 mr-1" />
                Admin
              </Button>
            </Link>
            <Link to="/quote">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
