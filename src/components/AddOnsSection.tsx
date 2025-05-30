
import { Card, CardContent } from "@/components/ui/card";

const AddOnsSection = () => {
  const addOns = [
    { name: "Pet Hair Removal", price: 20 },
    { name: "Engine Bay Detail", price: 30 },
    { name: "Ceramic Spray Sealant", price: 20 }
  ];

  return (
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
  );
};

export default AddOnsSection;
