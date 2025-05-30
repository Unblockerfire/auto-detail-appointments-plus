
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;
