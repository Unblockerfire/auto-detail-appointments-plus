
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PackagesSection = () => {
  const packages = [
    {
      id: "express",
      name: "Express Wash",
      emoji: "🧼",
      description: "A quick maintenance wash for regular upkeep.",
      features: [
        "Regular soap wash",
        "Hand wash & rinse", 
        "Wheels scrubbed",
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
      popular: true,
      includesCeramic: false
    },
    {
      id: "interior",
      name: "Interior Only", 
      emoji: "🧽",
      description: "For a deep clean inside only.",
      features: [
        "Full vacuum",
        "Stain removal",
        "Steam clean + plastics conditioning"
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
      mobilePrice: 95,
      includesCeramic: true
    }
  ];

  return (
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
  );
};

export default PackagesSection;
