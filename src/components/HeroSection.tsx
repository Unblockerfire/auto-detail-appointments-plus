
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
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
        </div>
        <div className="mt-6 text-sm text-blue-100">
          <p><strong>Available Times:</strong></p>
          <p>Weekends: 9:30am, 11am, 2pm, 4pm • Weekdays: 4:30pm, 5pm</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
