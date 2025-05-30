
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Sparkles, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const packages = [
    {
      id: "express",
      name: "Express Wash",
      emoji: "🧼",
      description: "A quick maintenance wash for regular upkeep.",
      features: [
        "Foam cannon pre-wash",
        "Hand wash & rinse", 
        "Wheels cleaned",
        "Windows wiped",
        "Light vacuum"
      ],
      dropOffPrice: 30,
      mobilePrice: 40
    },
    {
      id: "full", 
      name: "Full Detail (Interior + Exterior)",
      emoji: "💦",
      description: "Best for full cleaning and protection inside and out.",
      features: [
        "Foam cannon wash & hand dry",
        "Wax applied",
        "Deep vacuum + shampoo seats/floors", 
        "Dashboard, panels cleaned + protected",
        "Tires, windows, mirrors polished"
      ],
      dropOffPrice: 120,
      mobilePrice: 140,
      popular: true
    },
    {
      id: "interior",
      name: "Interior Only", 
      emoji: "🧽",
      description: "For a deep clean inside only.",
      features: [
        "Full vacuum",
        "Stain removal",
        "Steam clean + plastics conditioning",
        "Odor neutralizer"
      ],
      dropOffPrice: 70,
      mobilePrice: 85
    },
    {
      id: "exterior",
      name: "Exterior Only",
      emoji: "✨", 
      description: "For a spotless exterior shine.",
      features: [
        "Foam wash",
        "Hand-dry, wax or ceramic seal",
        "Clay bar (on request)",
        "Tire shine + trim protect"
      ],
      dropOffPrice: 80,
      mobilePrice: 95
    }
  ];

  const addOns = [
    { name: "Pet Hair Removal", price: 20 },
    { name: "Headlight Restoration", price: 25 },
    { name: "Engine Bay Detail", price: 30 },
    { name: "Ceramic Spray Sealant", price: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
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
              <Link to="/quote">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Professional Car Detailing</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Premium car detailing services that bring back that showroom shine. 
            Drop-off or mobile service available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Your Quote
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
              <Clock className="mr-2 h-5 w-5" />
              View Availability
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Detailing Packages</h3>
            <p className="text-lg text-gray-600">Choose the perfect package for your vehicle's needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative transition-all duration-300 hover:shadow-lg hover:scale-105 ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{pkg.emoji}</div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Drop-Off:</span>
                      <span className="font-bold text-lg">${pkg.dropOffPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mobile:</span>
                      <span className="font-bold text-lg">${pkg.mobilePrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">🔧 Add-Ons</h3>
            <p className="text-lg text-gray-600">Optional extras to enhance your service</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">{addon.name}</h4>
                  <p className="text-2xl font-bold text-blue-600">+${addon.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8">Get a personalized quote in just a few minutes</p>
          <Link to="/quote">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <MapPin className="mr-2 h-5 w-5" />
              Get Your Custom Quote
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;
