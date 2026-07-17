"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, MapPin, Calendar, Users, User, CreditCard, ChevronRight, Loader2, Copy, CheckCheck, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const STEPS = [
  { id: 1, title: "Your Details", icon: User },
  { id: 2, title: "Select Tour", icon: MapPin },
  { id: 3, title: "Choose Dates", icon: Calendar },
  { id: 4, title: "Travelers", icon: Users },
  { id: 5, title: "Payment", icon: CreditCard },
];

const FALLBACK_TOUR = {
  id: "fallback",
  title: "Kashmir • Neelum Valley Tour",
  duration: 3,
  location: "Kashmir",
  price: 18000,
  image: "/images/destinations/saiful-malook.jpeg",
};

function BookingContent() {
  const searchParams = useSearchParams();
  const tourIdFromUrl = searchParams.get("tourId");
  const dateFromUrl = searchParams.get("date");
  const travelersFromUrl = searchParams.get("travelers");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTour, setSelectedTour] = useState(FALLBACK_TOUR);
  const [fetchingTour, setFetchingTour] = useState(!!tourIdFromUrl);
  
  const [form, setForm] = useState({
    tourId: tourIdFromUrl || "",
    startDate: dateFromUrl || "",
    travelers: travelersFromUrl ? parseInt(travelersFromUrl) : 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "stripe",
  });

  // Fetch tour details dynamically if tourId is provided in URL
  useEffect(() => {
    async function fetchTourDetails() {
      if (!tourIdFromUrl) return;
      
      try {
        const response = await fetch(`/api/bookings/tour-details?id=${tourIdFromUrl}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedTour({
            id: data.id,
            title: data.title,
            duration: data.duration,
            location: data.location,
            price: data.price,
            image: data.images.split(",")[0]
          });
          setForm(prev => ({ ...prev, tourId: data.id }));
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
      } finally {
        setFetchingTour(false);
      }
    }
    
    fetchTourDetails();
  }, [tourIdFromUrl]);

  const totalPrice = selectedTour.price * form.travelers;
  const [loading, setLoading] = useState(false);

  // Auto-save lead data to Excel
  useEffect(() => {
    const saveLead = async () => {
      if (!form.email || form.email.length < 5) return; // Only save if email is partially valid
      
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            timestamp: new Date().toLocaleString()
          })
        });
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    };

    const debounceTimer = setTimeout(saveLead, 2000); // Save after 2 seconds of inactivity
    return () => clearTimeout(debounceTimer);
  }, [form]);

  const nextStep = () => {
    // Validation for Step 1: Your Details
    if (currentStep === 1) {
      if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim()) {
        alert("Please fill in all required fields (First Name, Last Name, Email, and Phone) to continue.");
        return;
      }
      
      // Basic Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Basic Phone Validation (at least 10 digits)
      const phoneDigits = form.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        alert("Please enter a valid phone number.");
        return;
      }
    }
    // Validation for Step 3: Dates
    if (currentStep === 3) {
      if (!form.startDate) {
        alert("Please select a travel date to continue.");
        return;
      }
    }
    setCurrentStep((s) => Math.min(s + 1, 5));
  };
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleBookingSubmit = async () => {
    if (!form.tourId || !form.startDate || !form.email) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Final Excel Update
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Completed", timestamp: new Date().toLocaleString() })
      });

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: form.tourId,
          startDate: form.startDate,
          travelers: form.travelers,
          totalPrice: totalPrice,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone
        })
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.error || "Please try again."}`);
      }
    } catch (error) {
      console.error("Booking submission failed:", error);
      alert("An error occurred during booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingTour) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-shamaal-gold animate-spin mb-4" />
        <p className="text-gray-500">Loading tour details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-shamaal-navy dark:text-white mb-10">
        Complete Your <span className="text-shamaal-gold">Booking</span>
      </h1>

      {/* Step Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-white/10 z-0">
            <div
              className="h-full bg-shamaal-gold transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <button
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                  step.id < currentStep
                    ? "bg-shamaal-gold border-shamaal-gold text-shamaal-navy cursor-pointer"
                    : step.id === currentStep
                    ? "bg-shamaal-navy border-shamaal-gold text-white dark:bg-shamaal-gold dark:text-shamaal-navy"
                    : "bg-white dark:bg-shamaal-navy/50 border-gray-200 dark:border-white/20 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                {step.id < currentStep ? <Check className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
              </button>
              <span className={`mt-2 text-xs font-semibold hidden sm:block ${step.id === currentStep ? "text-shamaal-navy dark:text-shamaal-gold" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Area */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-shamaal-navy/30 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-white/10">

            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">Your Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Ali" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Khan" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ali@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 0000000" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Special Requests (optional)</label>
                    <textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} rows={3} placeholder="Dietary requirements, accessibility needs, anniversary setup..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tour Confirmation */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">Selected Tour</h2>
                <div className="flex items-start space-x-4 p-4 border-2 border-shamaal-gold/50 rounded-xl bg-shamaal-gold/5">
                  <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 relative">
                    <Image src={selectedTour.image} alt={selectedTour.title} fill className="object-cover" sizes="96px" />
                  </div>
                  <div>
                    <h3 className="font-bold text-shamaal-navy dark:text-white mb-1">{selectedTour.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{selectedTour.location} · {selectedTour.duration} Days</p>
                    <p className="text-shamaal-gold font-bold">PKR {selectedTour.price.toLocaleString()} <span className="text-gray-400 font-normal text-xs">/ person</span></p>
                  </div>
                  <Check className="text-shamaal-gold w-6 h-6 ml-auto shrink-0" />
                </div>
                {!tourIdFromUrl && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
                      Want a different tour?{" "}
                      <Link href="/tours" className="text-shamaal-sky hover:text-shamaal-gold font-semibold underline">Browse all tours</Link>
                    </p>
                )}
              </div>
            )}

            {/* Step 3: Dates */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">Choose Your Dates</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Start Date</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-shamaal-gold"
                    />
                  </div>
                  {form.startDate && (
                    <div className="p-4 bg-shamaal-gold/10 rounded-xl border border-shamaal-gold/30">
                      <p className="text-sm font-medium text-shamaal-navy dark:text-white">
                        Your tour will run from <strong>{form.startDate}</strong> for <strong>{selectedTour.duration} days</strong>.
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    {["2026-07-05", "2026-08-02", "2026-09-06", "2026-10-04", "2026-10-18", "2026-11-01"].map((date) => (
                      <button
                        key={date}
                        onClick={() => setForm({ ...form, startDate: date })}
                        className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${form.startDate === date ? "border-shamaal-gold bg-shamaal-gold text-shamaal-navy" : "border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-shamaal-gold"}`}
                      >
                        {new Date(date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Travelers */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-6">Number of Travelers</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 border border-gray-200 dark:border-white/20 rounded-xl">
                    <div>
                      <p className="font-bold text-shamaal-navy dark:text-white">Adults</p>
                      <p className="text-sm text-gray-500">PKR {selectedTour.price.toLocaleString()} per person</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => setForm({ ...form, travelers: Math.max(1, form.travelers - 1) })} className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-white/20 flex items-center justify-center font-bold text-lg hover:border-shamaal-gold hover:text-shamaal-gold transition-colors text-gray-600 dark:text-gray-300">−</button>
                      <span className="text-2xl font-bold text-shamaal-navy dark:text-white w-8 text-center">{form.travelers}</span>
                      <button onClick={() => setForm({ ...form, travelers: Math.min(15, form.travelers + 1) })} className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-white/20 flex items-center justify-center font-bold text-lg hover:border-shamaal-gold hover:text-shamaal-gold transition-colors text-gray-600 dark:text-gray-300">+</button>
                    </div>
                  </div>
                  <div className="p-4 bg-shamaal-gold/10 rounded-xl border border-shamaal-gold/30">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Groups of 10+ receive a <strong className="text-shamaal-gold">10% group discount</strong>. Contact us for corporate rates.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-bold text-shamaal-navy dark:text-white mb-2">Payment Method</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Choose your preferred way to pay. Bank transfer is the most popular option in Pakistan.</p>
                <div className="space-y-4 mb-6">
                  {[
                    { id: "bank", label: "Bank Transfer", sub: "Direct transfer to Faisal Bank — most popular & secure", badge: "Recommended" },
                    { id: "jazzcash", label: "JazzCash", sub: "Pay via JazzCash mobile wallet or MPIN" },
                    { id: "easypaisa", label: "Easypaisa", sub: "Pay via Easypaisa mobile account" },
                    { id: "stripe", label: "Credit / Debit Card", sub: "Visa, Mastercard, AMEX — Powered by Stripe" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setForm({ ...form, paymentMethod: method.id })}
                      className={`w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all text-left ${form.paymentMethod === method.id ? "border-shamaal-gold bg-shamaal-gold/10" : "border-gray-200 dark:border-white/20 hover:border-shamaal-gold/50"}`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-shamaal-navy dark:text-white">{method.label}</p>
                          {method.badge && (
                            <span className="text-[10px] font-black bg-shamaal-gold text-shamaal-navy px-2 py-0.5 rounded-full tracking-wider uppercase">{method.badge}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{method.sub}</p>
                      </div>
                      {form.paymentMethod === method.id && <Check className="text-shamaal-gold w-6 h-6 shrink-0" />}
                    </button>
                  ))}
                </div>

                {/* Bank Transfer Details Card */}
                {form.paymentMethod === "bank" && (
                  <BankDetailsCard />
                )}

                {form.paymentMethod === "stripe" && (
                  <div className="space-y-4 p-6 bg-gray-50 dark:bg-shamaal-navy/50 rounded-xl border border-gray-200 dark:border-white/10">
                    <div>
                      <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-shamaal-navy dark:text-white mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-shamaal-navy/50 text-shamaal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shamaal-gold" />
                      </div>
                    </div>
                  </div>
                )}

                {(form.paymentMethod === "jazzcash" || form.paymentMethod === "easypaisa") && (
                  <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-500/20">
                    <p className="text-blue-700 dark:text-blue-300 font-semibold text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      After submitting, we will send you the {form.paymentMethod === "jazzcash" ? "JazzCash" : "Easypaisa"} payment number via WhatsApp or email within a few minutes.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between">
              {currentStep > 1 ? (
                <button onClick={prevStep} className="px-6 py-3 border-2 border-gray-200 dark:border-white/20 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:border-shamaal-navy dark:hover:border-white transition-colors">
                  ← Back
                </button>
              ) : <div />}

              {currentStep < 5 ? (
                <button onClick={nextStep} className="px-8 py-3 bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-xl transition-all flex items-center space-x-2">
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleBookingSubmit}
                  disabled={loading}
                  className="px-8 py-3 bg-shamaal-gold hover:bg-yellow-500 text-shamaal-navy font-bold rounded-xl transition-all flex items-center space-x-2 shadow-md shadow-shamaal-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{loading ? "Processing..." : `Confirm & Pay PKR ${totalPrice.toLocaleString()}`}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Booking Summary Sidebar */}
        <div>
          <div className="sticky top-28 bg-white dark:bg-shamaal-navy/30 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-white/10">
            <h3 className="text-lg font-bold text-shamaal-navy dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-white/10">Booking Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tour</span>
                <span className="font-semibold text-shamaal-navy dark:text-white text-right max-w-[60%]">{selectedTour.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Duration</span>
                <span className="font-semibold text-shamaal-navy dark:text-white">{selectedTour.duration} Days</span>
              </div>
              {form.startDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Start Date</span>
                  <span className="font-semibold text-shamaal-navy dark:text-white">{form.startDate}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Travelers</span>
                <span className="font-semibold text-shamaal-navy dark:text-white">{form.travelers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Price/person</span>
                <span className="font-semibold text-shamaal-navy dark:text-white">PKR {selectedTour.price.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between text-base">
                <span className="font-bold text-shamaal-navy dark:text-white">Total</span>
                <span className="font-bold text-shamaal-gold text-lg">PKR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-500/20">
              <p className="text-green-700 dark:text-green-400 text-xs font-semibold flex items-center">
                <Check className="w-4 h-4 mr-2" /> Free cancellation up to 14 days before departure
              </p>
            </div>
            {/* Bank info always visible in sidebar */}
            <div className="mt-4 p-4 bg-shamaal-navy rounded-xl border border-shamaal-gold/20">
              <p className="text-shamaal-gold text-[10px] font-black tracking-widest uppercase mb-2 flex items-center gap-1.5">
                <Building2 className="w-3 h-3" /> Bank Transfer
              </p>
              <p className="text-white text-xs font-bold">Faisal Bank</p>
              <p className="text-gray-300 text-xs">Shamaal Tourism Pakistan (Pvt) Ltd</p>
              <p className="text-shamaal-gold font-black text-sm tracking-wider mt-1">3300499000007541</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Bank Details Card Component ────────────────────────────────────────────
function BankDetailsCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("3300499000007541");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-shamaal-gold/40 bg-gradient-to-br from-shamaal-navy via-[#1a3663] to-shamaal-navy p-6">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-shamaal-gold/15 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-shamaal-gold/60 to-transparent" />

      <div className="relative z-10">
        {/* Bank Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-shamaal-gold/20 border border-shamaal-gold/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-shamaal-gold" />
            </div>
            <div>
              <p className="text-[10px] text-shamaal-gold font-black tracking-[0.2em] uppercase">Bank Transfer</p>
              <p className="text-white font-bold text-sm">Faisal Bank Ltd</p>
            </div>
          </div>
          <span className="text-[10px] bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full font-bold tracking-wide">✓ Verified</span>
        </div>

        {/* Account Details */}
        <div className="space-y-3 mb-5">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Account Title</p>
            <p className="text-white font-bold text-base">Shamaal Tourism Pakistan (Pvt) Ltd</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Account Number</p>
            <div className="flex items-center justify-between">
              <p className="text-shamaal-gold font-black text-xl tracking-[0.12em]">3300499000007541</p>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  copied
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-shamaal-gold/20 hover:bg-shamaal-gold/30 text-shamaal-gold border border-shamaal-gold/30"
                }`}
              >
                {copied ? <><CheckCheck className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">IBAN</p>
              <p className="text-white font-bold text-sm">PK95FAYS3300499000007541</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Bank</p>
              <p className="text-white font-bold text-sm">Faisal Bank</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-shamaal-gold/10 border border-shamaal-gold/20 rounded-xl p-4">
          <p className="text-shamaal-gold text-xs font-black tracking-wider uppercase mb-2">📋 After Transfer:</p>
          <ul className="space-y-1.5 text-white/70 text-xs">
            <li className="flex items-start gap-2"><span className="text-shamaal-gold font-bold mt-0.5">1.</span> Transfer the total amount to the account above</li>
            <li className="flex items-start gap-2"><span className="text-shamaal-gold font-bold mt-0.5">2.</span> Send your transaction receipt via WhatsApp to <span className="text-shamaal-gold font-bold">0318-0425044</span></li>
            <li className="flex items-start gap-2"><span className="text-shamaal-gold font-bold mt-0.5">3.</span> We will confirm your booking within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 md:pt-40 pb-20 bg-shamaal-cream dark:bg-[var(--background)]">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 text-shamaal-gold animate-spin mb-4" />
            <p className="text-gray-500">Initializing booking engine...</p>
          </div>
        }>
          <BookingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
