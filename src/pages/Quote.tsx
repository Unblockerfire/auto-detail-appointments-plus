import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Car, Calendar, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const Quote = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    dirtiness: "",
    location: "",
    useCustomerWater: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    selectedDate: null as Date | null,
    selectedTime: "",
    notes: "",
    addOns: [] as string[],
    wantsLittleTree: false
  });

  const packages = [
    { 
      id: "express", 
      name: "Express Wash", 
      emoji: "🧼", 
      dropOff: 30, 
      mobile: 40,
      includesCeramic: false
    },
    { 
      id: "full", 
      name: "Full Detail", 
      emoji: "💦", 
      dropOff: 120, 
      mobile: 140,
      includesCeramic: false
    },
    { 
      id: "interior", 
      name: "Interior Only", 
      emoji: "🧽", 
      dropOff: 70, 
      mobile: 85,
      includesCeramic: false
    },
    { 
      id: "exterior", 
      name: "Exterior Only", 
      emoji: "✨", 
      dropOff: 80, 
      mobile: 95,
      includesCeramic: true
    }
  ];

  const addOns = [
    { id: "pet-hair", name: "Pet Hair Removal", price: 20 },
    { id: "engine", name: "Engine Bay Detail", price: 30 },
    { id: "ceramic", name: "Ceramic Spray Sealant", price: 20 }
  ];

  const getAvailableAddOns = () => {
    const selectedPackage = packages.find(p => p.id === formData.service);
    if (selectedPackage?.includesCeramic) {
      return addOns.filter(addon => addon.id !== "ceramic");
    }
    return addOns;
  };

  const getAvailableTimeSlots = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    
    if (isWeekend) {
      return ["9:30 AM", "11:00 AM", "2:00 PM", "4:00 PM"];
    } else {
      return ["4:30 PM", "5:00 PM"];
    }
  };

  const calculateEstimate = () => {
    const selectedPackage = packages.find(p => p.id === formData.service);
    if (!selectedPackage) return { total: 0, breakdown: [] };

    let basePrice = formData.location === "mobile" ? selectedPackage.mobile : selectedPackage.dropOff;
    const breakdown = [
      { item: `${selectedPackage.name} (${formData.location === "mobile" ? "Mobile" : "Drop-off"})`, price: basePrice }
    ];
    
    if (formData.dirtiness === "moderate") {
      basePrice += 10;
      breakdown.push({ item: "Moderate dirt level", price: 10 });
    }
    if (formData.dirtiness === "heavy") {
      basePrice += 25;
      breakdown.push({ item: "Heavy dirt level", price: 25 });
    }
    
    if (formData.location === "mobile" && formData.useCustomerWater) {
      basePrice -= 10;
      breakdown.push({ item: "Customer water discount", price: -10 });
    }
    
    const addOnTotal = formData.addOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (addOn) {
        breakdown.push({ item: addOn.name, price: addOn.price });
        return total + addOn.price;
      }
      return total;
    }, 0);
    
    if (formData.wantsLittleTree) {
      breakdown.push({ item: "Little Tree Black Ice (FREE)", price: 0 });
    }
    
    return { total: basePrice + addOnTotal, breakdown };
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleAddOnToggle = (addOnId: string) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  const handleSubmitQuote = () => {
    const selectedPackage = packages.find(p => p.id === formData.service);
    if (!selectedPackage) return;

    const appointmentData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  service: selectedPackage.name,
  date: formData.selectedDate?.toLocaleDateString() || "",
  time: formData.selectedTime,
  location: formData.location === "mobile" ? "Mobile" : "Drop-off",
  address: formData.address,
  total: calculateEstimate().total,
  dirtiness: formData.dirtiness,
  useCustomerWater: formData.useCustomerWater,
  addOns: formData.addOns,
  wantsLittleTree: formData.wantsLittleTree,
  notes: formData.notes
};

// ✅ Send quote to admin view
(window as any).addAppointment(appointmentData);

    // Add appointment to admin system
    if (typeof window !== 'undefined' && (window as any).addAppointment) {
      (window as any).addAppointment(appointmentData);
      console.log("Quote submitted successfully:", appointmentData);
    }

    alert("Quote submitted! Your appointment request has been sent for approval. We'll contact you soon to confirm.");
    
    // Redirect to homepage after submission
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Foam Kings</h1>
                <p className="text-sm text-blue-600">Get Your Quote</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 6 && (
                  <div className={`w-12 h-1 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Step {currentStep} of 6</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {currentStep === 1 && <><Car className="h-5 w-5" /><span>What service do you need?</span></>}
              {currentStep === 2 && <><Car className="h-5 w-5" /><span>How dirty is your vehicle?</span></>}
              {currentStep === 3 && <><MapPin className="h-5 w-5" /><span>Where do you want the service?</span></>}
              {currentStep === 4 && <><Calendar className="h-5 w-5" /><span>Select Date & Time</span></>}
              {currentStep === 5 && <><User className="h-5 w-5" /><span>Your Information</span></>}
              {currentStep === 6 && <><Car className="h-5 w-5" /><span>Review & Add-Ons</span></>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <RadioGroup value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={pkg.id} id={pkg.id} />
                      <Label htmlFor={pkg.id} className="flex-1 cursor-pointer">
                        <Card className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{pkg.emoji}</span>
                            <div className="flex-1">
                              <h3 className="font-semibold">{pkg.name}</h3>
                              <div className="text-sm text-gray-600">
                                Drop-off: ${pkg.dropOff} | Mobile: ${pkg.mobile}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {/* Step 2: Dirtiness Level */}
            {currentStep === 2 && (
              <RadioGroup value={formData.dirtiness} onValueChange={(value) => setFormData({...formData, dirtiness: value})}>
                <div className="space-y-4">
                  {[
                    { value: "light", label: "Light", desc: "Dust, light crumbs, a quick cleanup" },
                    { value: "moderate", label: "Moderate", desc: "Food, spills, sand, basic stains (+$10)" },
                    { value: "heavy", label: "Heavy", desc: "Pet hair, mud, deep stains, major mess (+$25)" }
                  ].map((level) => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.value} id={level.value} />
                      <Label htmlFor={level.value} className="flex-1 cursor-pointer">
                        <Card className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{level.label}</h3>
                              <p className="text-sm text-gray-600">{level.desc}</p>
                            </div>
                          </div>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <RadioGroup value={formData.location} onValueChange={(value) => setFormData({...formData, location: value, useCustomerWater: false})}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dropoff" id="dropoff" />
                      <Label htmlFor="dropoff" className="flex-1 cursor-pointer">
                        <Card className="p-4 hover:bg-gray-50 transition-colors">
                          <h3 className="font-semibold">I'll Drop Off the vehicle</h3>
                          <p className="text-sm text-gray-600">Bring your car to our location</p>
                        </Card>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <Label htmlFor="mobile" className="flex-1 cursor-pointer">
                        <Card className="p-4 hover:bg-gray-50 transition-colors">
                          <h3 className="font-semibold">I want Mobile Service</h3>
                          <p className="text-sm text-gray-600">We come to you (additional cost)</p>
                        </Card>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {formData.location === "mobile" && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-3">Water Source Option</h3>
                    <RadioGroup 
                      value={formData.useCustomerWater ? "yes" : "no"} 
                      onValueChange={(value) => setFormData({...formData, useCustomerWater: value === "yes"})}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="water-yes" />
                          <Label htmlFor="water-yes" className="cursor-pointer">
                            <strong>Yes, use my water for $10 off</strong>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="water-no" />
                          <Label htmlFor="water-no" className="cursor-pointer">
                            <strong>No, bring your own setup</strong>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Date & Time */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Select a Date:</Label>
                  <div className="flex justify-center">
                    <CalendarComponent
                      mode="single"
                      selected={formData.selectedDate}
                      onSelect={(date) => setFormData({...formData, selectedDate: date, selectedTime: ""})}
                      disabled={(date) => !isDateAvailable(date)}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                {formData.selectedDate && (
                  <div>
                    <Label className="text-base font-medium mb-4 block">Available Time Slots:</Label>
                    <RadioGroup value={formData.selectedTime} onValueChange={(value) => setFormData({...formData, selectedTime: value})}>
                      <div className="grid grid-cols-2 gap-3">
                        {getAvailableTimeSlots(formData.selectedDate).map((time) => (
                          <div key={time} className="flex items-center space-x-2">
                            <RadioGroupItem value={time} id={time} />
                            <Label htmlFor={time} className="flex-1 cursor-pointer">
                              <Card className="p-3 text-center hover:bg-gray-50 transition-colors">
                                <span className="font-medium">{time}</span>
                              </Card>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Personal Info */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input 
                      id="phone" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>

                {formData.location === "mobile" && (
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea 
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Your full address for mobile service"
                      rows={3}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea 
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Any special requests or additional information..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 6: Review & Add-ons */}
            {currentStep === 6 && (
              <div className="space-y-6">
                {/* Add-ons Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">🔧 Add Optional Extras:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getAvailableAddOns().map((addOn) => (
                      <Label key={addOn.id} className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox 
                          checked={formData.addOns.includes(addOn.id)}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                        />
                        <Card className="flex-1 p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{addOn.name}</span>
                            <Badge variant="secondary">+${addOn.price}</Badge>
                          </div>
                        </Card>
                      </Label>
                    ))}
                    
                    {/* Little Tree Option */}
                    <Label className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox 
                        checked={formData.wantsLittleTree}
                        onCheckedChange={(checked) => setFormData({...formData, wantsLittleTree: !!checked})}
                      />
                      <Card className="flex-1 p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Little Tree Black Ice</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">FREE</Badge>
                        </div>
                      </Card>
                    </Label>
                  </div>
                </div>

                {/* Quote Summary */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Quote Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-medium">
                        {packages.find(p => p.id === formData.service)?.name || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">
                        {formData.location === "mobile" ? "Mobile Service" : "Drop-off"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dirt Level:</span>
                      <span className="font-medium capitalize">{formData.dirtiness}</span>
                    </div>
                    {formData.selectedDate && (
                      <div className="flex justify-between">
                        <span>Date & Time:</span>
                        <span className="font-medium">
                          {formData.selectedDate.toLocaleDateString()} at {formData.selectedTime}
                        </span>
                      </div>
                    )}
                    
                    <hr className="my-3" />
                    <h4 className="font-semibold mb-2">Cost Breakdown:</h4>
                    {calculateEstimate().breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.item}</span>
                        <span className={item.price === 0 ? "text-green-600" : item.price < 0 ? "text-green-600" : ""}>
                          {item.price === 0 ? "FREE" : `${item.price > 0 ? '+' : ''}$${item.price}`}
                        </span>
                      </div>
                    ))}
                    
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Estimated Total:</span>
                      <span className="text-blue-600">${calculateEstimate().total}</span>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleSubmitQuote}
                >
                  Submit Quote Request
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            onClick={handleBack} 
            disabled={currentStep === 1}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStep < 6 && (
            <Button 
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.service) ||
                (currentStep === 2 && !formData.dirtiness) ||
                (currentStep === 3 && (!formData.location || (formData.location === "mobile" && formData.useCustomerWater === null))) ||
                (currentStep === 4 && (!formData.selectedDate || !formData.selectedTime)) ||
                (currentStep === 5 && (!formData.name || !formData.email || !formData.phone || (formData.location === "mobile" && !formData.address)))
              }
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Current Estimate */}
        {formData.service && formData.dirtiness && formData.location && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Current Estimate</p>
                <p className="text-3xl font-bold text-green-600">${calculateEstimate().total}</p>
                <p className="text-xs text-gray-500 mt-1">*Final price may vary based on vehicle condition</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quote;
