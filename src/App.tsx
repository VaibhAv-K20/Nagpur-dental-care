import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Activity,
  ShieldCheck,
  Heart,
  Stethoscope,
  ShieldAlert,
  Award,
  Layers,
  Languages,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Calendar,
  Check,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Star,
  CalendarDays,
  ExternalLink,
  HelpCircle
} from "lucide-react";

import {
  CLINIC_CONTACT,
  DOCTORS,
  SERVICES,
  TESTIMONIALS,
  FAQS,
  Service,
  Doctor
} from "./data";

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Booking Form States
  const [patientName, setPatientName] = useState("");
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0].id);
  const [selectedDay, setSelectedDay] = useState("Tomorrow");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("11:30 AM");
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState(false);

  // FAQ accordion state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Service details card state
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Handle transparent header transition and Section detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "services", "doctors", "testimonials", "booking", "faq"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // WhatsApp link action
  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert("Please enter your name to customize your WhatsApp booking request.");
      return;
    }

    const serviceObj = SERVICES.find(s => s.id === selectedService);
    const doctorObj = DOCTORS.find(d => d.id === selectedDoctor);

    const messageText = `Hi Nagpur Dental Care! 🦷 I would like to book a dental consultation.

*Patient Name:* ${patientName}
*Service Requested:* ${serviceObj?.title || selectedService}
*Preferred Dentist:* ${doctorObj?.name || selectedDoctor}
*Preferred Date:* ${selectedDay}
*Preferred Time Slot:* ${selectedTimeSlot}

Please confirm if this slot is available at your Dharampeth, Nagpur clinic. Thank you!`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${CLINIC_CONTACT.whatsapp}&text=${encodedText}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setBookingSuccessMsg(true);
    setTimeout(() => setBookingSuccessMsg(false), 5000);
  };

  // Helper to preset form fields and scroll
  const quickBook = (serviceId?: string, doctorId?: string) => {
    if (serviceId) setSelectedService(serviceId);
    if (doctorId) setSelectedDoctor(doctorId);
    
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const daysList = ["Today", "Tomorrow", "Next Monday", "Next Tuesday"];
  const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "5:30 PM", "6:45 PM", "8:00 PM"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900 antialiased" id="home">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 text-teal-100 px-4 py-2 text-center text-xs font-semibold tracking-wider relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>✨ Special Offer: Free Oral Hygiene Consultation for first-time Nagpur patients.</span>
          <button 
            onClick={() => quickBook("preventive")} 
            className="underline text-teal-300 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 font-bold"
          >
            Claim Consultation <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. HEADER NAVIGATION */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-100" 
            : "bg-transparent py-5"
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:bg-teal-700 transition-colors duration-200 font-display font-extrabold text-xl">
              N
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 block leading-tight">
                Nagpur Dental Studio
              </span>
              <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase block -mt-0.5">
                Dharampeth Main Road
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#services" 
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeSection === "services" ? "text-teal-600 underline underline-offset-4" : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Services
            </a>
            <a 
              href="#doctors" 
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeSection === "doctors" ? "text-teal-600 underline underline-offset-4" : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Specialists
            </a>
            <a 
              href="#testimonials" 
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeSection === "testimonials" ? "text-teal-600 underline underline-offset-4" : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Reviews
            </a>
            <a 
              href="#booking" 
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeSection === "booking" ? "text-teal-600 underline underline-offset-4" : "text-slate-600 hover:text-teal-600"
              }`}
            >
              Book Appointment
            </a>
            <a 
              href="#faq" 
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeSection === "faq" ? "text-teal-600 underline underline-offset-4" : "text-slate-600 hover:text-teal-600"
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Desktop Contact CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href={`tel:${CLINIC_CONTACT.phone}`} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors border-r border-slate-200 pr-4"
              id="header-phone-link"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>{CLINIC_CONTACT.phone}</span>
            </a>
            
            <a 
              href={`https://api.whatsapp.com/send?phone=${CLINIC_CONTACT.whatsapp}&text=Hi%20Nagpur%20Dental%20Care%2C%20I'd%20like%20to%20inquire%20about%20booking%20an%20appointment.`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="px-4 py-2 text-xs font-extrabold tracking-wider uppercase bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:bg-emerald-800 shadow-sm shadow-emerald-500/10 flex items-center gap-1.5 transition-all duration-200"
              id="header-whatsapp-cta"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[110px] bg-white z-30 shadow-xl border-b border-slate-100 flex flex-col px-6 py-6 gap-4 md:hidden"
            id="mobile-nav-panel"
          >
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-slate-50 text-slate-700 hover:text-teal-600"
            >
              Our Dental Services
            </a>
            <a 
              href="#doctors" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-slate-50 text-slate-700 hover:text-teal-600"
            >
              Meet Our Specialists
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-slate-50 text-slate-700 hover:text-teal-600"
            >
              Patient Reviews
            </a>
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-slate-50 text-slate-700 hover:text-teal-600"
            >
              Appointment Desk
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-slate-50 text-slate-700 hover:text-teal-600"
            >
              FAQs
            </a>
            
            <div className="flex flex-col gap-3 mt-4 pt-2">
              <a 
                href={`tel:${CLINIC_CONTACT.phone}`} 
                className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl text-slate-700 font-semibold text-sm"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call Clinic: {CLINIC_CONTACT.phone}</span>
              </a>
              <a 
                href={`https://api.whatsapp.com/send?phone=${CLINIC_CONTACT.whatsapp}&text=Hi%20Nagpur%20Dental%20Care%2C%20I'd%20like%20to%20inquire%20about%20booking%20an%20appointment.`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-2xl font-extrabold text-sm"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO BENTO GRID SECTION */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="hero">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Main Hero Pitch Card (2x2 span equivalent) */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-sm border border-slate-100 min-h-[420px]">
            <div>
              <span className="px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider mb-6 inline-block">
                Established 2012 in Nagpur
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
                Painless <span className="text-teal-600">Care</span> for your Smile.
              </h2>
              <p className="text-slate-500 text-base sm:text-lg max-w-md leading-relaxed mb-6">
                Advanced cosmetic, restorative, and guided implant dentistry using high-precision laser systems right in the heart of Nagpur.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-50">
              <a 
                href="#booking"
                className="px-5 py-3.5 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-slate-800 active:bg-slate-950 transition-all flex items-center justify-center gap-2"
              >
                <CalendarDays className="w-4.5 h-4.5" />
                <span>Book Appointment Desk</span>
              </a>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <div className="w-full h-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">RK</div>
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <div className="w-full h-full bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white">SD</div>
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <div className="w-full h-full bg-slate-500 flex items-center justify-center text-[10px] font-bold text-white">AJ</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-tight">
                  Trusted by <br /><span className="font-bold text-slate-950">12,000+ residents</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Hero Visual Lobby Frame Card */}
          <div className="lg:col-span-2 bg-slate-900 rounded-[2rem] p-2 relative overflow-hidden shadow-sm min-h-[350px] lg:min-h-auto group">
            <img 
              src="/src/assets/images/clinic_interior_1782905178200.jpg" 
              alt="Nagpur Dental Care modern patient lobby lounge" 
              className="w-full h-full object-cover rounded-[1.8rem] brightness-90 group-hover:scale-101 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            {/* Absolute badge overlay */}
            <div className="absolute top-4 left-4 bg-teal-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-md">
              🏥 Modern Digital Studio
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinical Standards</span>
                  <span className="block text-xs font-bold text-white">Class-B German Sterilization Autoclaves</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: WhatsApp Instant CTA */}
          <a 
            href={`https://api.whatsapp.com/send?phone=${CLINIC_CONTACT.whatsapp}&text=Hi%20Nagpur%20Dental%20Care%2C%20I'd%20like%20to%20book%20an%20appointment%20or%20ask%20a%20question.`}
            target="_blank"
            referrerPolicy="no-referrer"
            className="lg:col-span-2 bg-[#25D366] rounded-[2rem] p-8 flex items-center justify-between text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all group"
            id="hero-whatsapp-btn"
          >
            <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                <MessageCircle className="w-9 h-9 fill-current" />
              </div>
              <div>
                <h4 className="font-display text-2xl font-extrabold tracking-tight">Message on WhatsApp</h4>
                <p className="text-sm opacity-90 font-medium">Quick consultation and direct slot booking</p>
              </div>
            </div>
            <span className="text-4xl font-light opacity-60 group-hover:translate-x-1.5 transition-transform">→</span>
          </a>

          {/* Card 4: Direct Telephone Contact */}
          <div className="lg:col-span-1 bg-white rounded-[2rem] p-8 flex flex-col justify-center border border-slate-100 shadow-sm min-h-[160px]">
            <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider mb-1">Call Us Directly</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight font-display">
              {CLINIC_CONTACT.phone}
            </p>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Mon - Sat: 9:00 AM - 8:30 PM
            </p>
          </div>

          {/* Card 5: Opening Status & Location */}
          <div className="lg:col-span-1 bg-slate-100 rounded-[2rem] p-8 flex flex-col justify-center border border-transparent min-h-[160px]">
            <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider mb-1">Clinic Location</p>
            <p className="text-sm font-bold leading-snug text-slate-800">
              Dharampeth Main Road, Opposite Traffic Park, Nagpur
            </p>
            <div className="mt-3.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Open Now</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CLINICAL REASSURANCE RIBBON */}
      <div className="bg-slate-900 text-slate-400 py-6 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around items-center gap-6 text-xs font-semibold uppercase tracking-widest text-center">
          <span className="flex items-center gap-2 text-slate-300">
            <Check className="w-4 h-4 text-teal-500" /> FDA-Approved Dental Implants
          </span>
          <span className="flex items-center gap-2 text-slate-300">
            <Check className="w-4 h-4 text-teal-500" /> Smile Designing Laminates
          </span>
          <span className="flex items-center gap-2 text-slate-300">
            <Check className="w-4 h-4 text-teal-500" /> painless single-sitting rct
          </span>
          <span className="flex items-center gap-2 text-slate-300">
            <Check className="w-4 h-4 text-teal-500" /> iso 9001:2015 certified clinic
          </span>
        </div>
      </div>

      {/* 5. SERVICES BENTO GRID SECTION */}
      <section className="py-20 bg-slate-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Block inside Bento Grid container */}
          <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-slate-100 shadow-sm mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full w-fit mb-3">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-xs font-extrabold text-teal-700 tracking-wider uppercase">
                  Our Specialities
                </span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Advanced Treatment Specializations
              </h3>
            </div>
            <p className="text-slate-500 text-sm sm:text-base max-w-md">
              Each clinical sector utilizes computerized diagnosis and 3D imaging, ensuring absolute visual accuracy, minimum dental chair time, and zero post-treatment complications.
            </p>
          </div>

          {/* Bento grid of service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const isExpanded = expandedService === service.id;
              
              return (
                <motion.div
                  layout
                  key={service.id}
                  className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  id={`service-card-${service.id}`}
                >
                  <div>
                    {/* Top Row: Icon & Cost badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                        {service.iconName === "Activity" && <Activity className="w-6 h-6" />}
                        {service.iconName === "Sparkles" && <Sparkles className="w-6 h-6" />}
                        {service.iconName === "Layers" && <Layers className="w-6 h-6" />}
                        {service.iconName === "ShieldAlert" && <ShieldAlert className="w-6 h-6" />}
                        {service.iconName === "Heart" && <Heart className="w-6 h-6" />}
                        {service.iconName === "Stethoscope" && <Stethoscope className="w-6 h-6" />}
                      </div>
                      
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100/40">
                        {service.priceEstimate}
                      </span>
                    </div>

                    <h4 className="font-display font-extrabold text-xl text-slate-900 mt-6 mb-3">
                      {service.title}
                    </h4>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Expandable info block */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pt-4 border-t border-slate-100 overflow-hidden"
                          id={`service-expanded-${service.id}`}
                        >
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Treatment Advantages:
                          </p>
                          <ul className="flex flex-col gap-2">
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500 bg-emerald-50 rounded-full p-0.5 shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions area */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                      className="text-xs font-bold text-slate-500 hover:text-teal-600 flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? "Hide detail" : "Learn more"}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <button
                      onClick={() => quickBook(service.id)}
                      className="text-xs font-extrabold text-teal-600 bg-teal-50/80 px-4 py-2 rounded-xl hover:bg-teal-100 hover:text-teal-700 transition-colors flex items-center gap-1"
                    >
                      <span>Request Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. SPECIALIST DOCTOR PROFILES BENTO CARDS */}
      <section className="py-20 bg-white" id="doctors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full w-fit">
              <Award className="w-3.5 h-3.5 text-slate-700" />
              <span className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
                Expert MDS Consultants
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Meet Our Dental Specialists
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Consult with registered postgraduate surgeons who hold state university credentials and advanced surgical specialities from premium international campuses.
            </p>
          </div>

          {/* Doctors Bento Grid: Left Dr. Amit (Slate-900 background), Right Dr. Priya (Teal-600 background) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5.5xl mx-auto">
            
            {/* Doctor 1: Dr. Amit Sharma (MDS Oral Implantology) */}
            <div 
              className="bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 text-white flex flex-col sm:flex-row shadow-lg hover:shadow-xl transition-all duration-300"
              id="doctor-card-amit"
            >
              {/* Photo component */}
              <div className="w-full sm:w-2/5 relative min-h-[280px] sm:min-h-auto bg-slate-950">
                <img 
                  src={DOCTORS[0].image} 
                  alt={DOCTORS[0].name}
                  className="absolute inset-0 w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500 brightness-95"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 bg-teal-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider">
                  {DOCTORS[0].experience}
                </div>
              </div>

              {/* Info Block */}
              <div className="p-8 flex-1 flex flex-col justify-between gap-5 text-left">
                <div>
                  <span className="text-[10px] font-extrabold text-teal-400 tracking-widest uppercase block">
                    {DOCTORS[0].specialty}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white mt-1.5">
                    {DOCTORS[0].name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400">
                    {DOCTORS[0].role}
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-4">
                    {DOCTORS[0].bio}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="font-bold text-slate-400 shrink-0">Campus:</span>
                      <span className="text-slate-300">{DOCTORS[0].education}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <Languages className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="font-bold text-slate-400">Languages:</span>
                      <span className="text-slate-300">{DOCTORS[0].languages.join(", ")}</span>
                    </div>
                  </div>
                </div>

                {/* Consulting hours box */}
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="font-semibold">{DOCTORS[0].schedule}</span>
                  </div>
                  
                  <button
                    onClick={() => quickBook(undefined, DOCTORS[0].id)}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Consult Dr. Amit</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Doctor 2: Dr. Priya Deshmukh (MDS Cosmetic & Ortho) */}
            <div 
              className="bg-teal-600 rounded-[2.5rem] overflow-hidden border border-teal-500 text-white flex flex-col sm:flex-row shadow-lg hover:shadow-xl transition-all duration-300"
              id="doctor-card-priya"
            >
              {/* Photo component */}
              <div className="w-full sm:w-2/5 relative min-h-[280px] sm:min-h-auto bg-teal-700">
                <img 
                  src={DOCTORS[1].image} 
                  alt={DOCTORS[1].name}
                  className="absolute inset-0 w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider">
                  {DOCTORS[1].experience}
                </div>
              </div>

              {/* Info Block */}
              <div className="p-8 flex-1 flex flex-col justify-between gap-5 text-left">
                <div>
                  <span className="text-[10px] font-extrabold text-teal-100 tracking-widest uppercase block">
                    {DOCTORS[1].specialty}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white mt-1.5">
                    {DOCTORS[1].name}
                  </h3>
                  <p className="text-xs font-bold text-teal-100/90">
                    {DOCTORS[1].role}
                  </p>

                  <p className="text-teal-50 text-xs sm:text-sm leading-relaxed mt-4">
                    {DOCTORS[1].bio}
                  </p>

                  <div className="mt-4 pt-4 border-t border-teal-500/60 flex flex-col gap-2">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="font-bold text-teal-100 shrink-0">Campus:</span>
                      <span className="text-teal-50">{DOCTORS[1].education}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <Languages className="w-4 h-4 text-teal-200 shrink-0" />
                      <span className="font-bold text-teal-100">Languages:</span>
                      <span className="text-teal-50">{DOCTORS[1].languages.join(", ")}</span>
                    </div>
                  </div>
                </div>

                {/* Consulting hours box */}
                <div className="bg-teal-700/80 rounded-2xl p-4 border border-teal-500 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-teal-50">
                    <Clock className="w-4 h-4 text-teal-200 shrink-0" />
                    <span className="font-semibold">{DOCTORS[1].schedule}</span>
                  </div>
                  
                  <button
                    onClick={() => quickBook(undefined, DOCTORS[1].id)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 active:bg-slate-950 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Consult Dr. Priya</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. SMILE CLINIC TESTIMONIALS SECTION */}
      <section className="py-20 bg-slate-100/60" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Tall bento highlight card (left 5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/50 shadow-sm flex flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full w-fit mb-4">
                  <Heart className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-xs font-bold text-teal-700 tracking-wide uppercase">
                    Nagpur Transformations
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight leading-tight mb-4">
                  Smiles Curated with Dental Artistry
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Nothing represents clinical excellence better than a beautiful healthy smile. We orchestrate elite visual corrections, cosmetic laminates, and laser whitening sessions custom fit to your oral structure.
                </p>
              </div>

              {/* Patient visual framework */}
              <div className="relative rounded-2xl overflow-hidden shadow-md bg-white border border-slate-100 p-2 group">
                <img 
                  src="/src/assets/images/happy_patient_1782905223882.jpg" 
                  alt="Happy client smiling displaying perfect clean white teeth" 
                  className="rounded-xl w-full object-cover aspect-[4/3] group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-4 bottom-4 bg-slate-900/90 text-white p-4 rounded-xl border border-slate-800">
                  <span className="block text-[10px] font-extrabold text-teal-400 uppercase tracking-wide">Actual Clinical Result</span>
                  <p className="text-xs text-slate-200 mt-1 italic">
                    "Dr. Priya Deshmukh helped me rediscover absolute teeth alignment confidence!"
                  </p>
                </div>
              </div>

            </div>

            {/* Testimonials bento blocks (right 7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              
              <div className="flex flex-col gap-5">
                {TESTIMONIALS.map((testimonial) => {
                  return (
                    <div 
                      key={testimonial.id}
                      className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                      id={`testimonial-${testimonial.id}`}
                    >
                      <div>
                        {/* Rating row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4.5 h-4.5 fill-current" />
                            ))}
                          </div>
                          
                          <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100/30">
                            {testimonial.treatment}
                          </span>
                        </div>

                        {/* Comment */}
                        <p className="text-slate-700 text-sm italic mt-5 leading-relaxed font-medium">
                          "{testimonial.comment}"
                        </p>
                      </div>

                      {/* Author */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">
                            {testimonial.name}
                          </span>
                          <span className="text-slate-400 block mt-0.5 font-medium">
                            {testimonial.location}
                          </span>
                        </div>

                        <span className="text-slate-400 font-bold uppercase tracking-wider">
                          {testimonial.date}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Read on Google reviews map connection */}
              <a 
                href="https://maps.google.com/?q=Dharampeth+Nagpur"
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-xs font-bold text-slate-600 hover:text-teal-600 flex items-center gap-1 transition-colors self-end mr-4"
                id="all-google-reviews-link"
              >
                <span>Read all 480+ Google Reviews</span>
                <ExternalLink className="w-4 h-4" />
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* 8. INTERACTIVE APPOINTMENT DESK */}
      <section className="py-20 bg-white" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-900 rounded-[2.5rem] text-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-800">
            
            {/* Form side (7 cols) */}
            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 flex flex-col gap-6 text-left">
              
              <div>
                <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-widest block">
                  DIGITAL SCHEDULING DESK
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl mt-1.5 leading-tight">
                  Reserve Your Clinic Visit
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl">
                  Select your treatment and choice surgeon below. Clicking "Send Request on WhatsApp" will pre-fill a customized reservation text and instantly route you to our scheduling desk.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleWhatsAppBooking} className="flex flex-col gap-5 mt-2">
                
                {/* Patient name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="patient-name-input" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Patient Full Name
                  </label>
                  <input 
                    id="patient-name-input"
                    type="text" 
                    required
                    placeholder="Enter your name (e.g. Vaibhav K.)"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-teal-500 focus:bg-slate-950 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition-all font-medium"
                  />
                </div>

                {/* Treatment Grid selection */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="treatment-select" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Select Clinical Service
                  </label>
                  <select
                    id="treatment-select"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-teal-500 focus:bg-slate-950 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all cursor-pointer font-semibold"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id} className="bg-slate-950 text-white">
                        {s.title} ({s.priceEstimate})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor selection */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="doctor-select" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Choose Specialist Surgeon
                  </label>
                  <select
                    id="doctor-select"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-teal-500 focus:bg-slate-950 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all cursor-pointer font-semibold"
                  >
                    {DOCTORS.map(d => (
                      <option key={d.id} value={d.id} className="bg-slate-950 text-white">
                        {d.name} — {d.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Day pills */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Preferred Day
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {daysList.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedDay === day 
                            ? "bg-teal-500 text-white shadow-md shadow-teal-500/20" 
                            : "bg-slate-950/80 hover:bg-slate-850 text-slate-300 border border-slate-800"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Time pills */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Preferred Hours Slot
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`px-3 py-1.5 text-xs font-bold transition-all rounded-lg ${
                          selectedTimeSlot === time 
                            ? "bg-teal-500 text-white shadow-sm" 
                            : "bg-slate-950/40 hover:bg-slate-850 text-slate-400 border border-slate-800/40"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp booking generator */}
                <button
                  type="submit"
                  className="mt-4 px-6 py-4 bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 rounded-xl font-extrabold tracking-wider uppercase shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
                  id="submit-booking-form"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Request on WhatsApp</span>
                </button>

                <AnimatePresence>
                  {bookingSuccessMsg && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-emerald-400 font-bold text-center mt-2"
                    >
                      ✓ Pre-filled message prepared! Directing you to WhatsApp support...
                    </motion.p>
                  )}
                </AnimatePresence>

              </form>

            </div>

            {/* Receipt Preview column (5 cols) */}
            <div className="bg-slate-950/70 p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 text-left">
              
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                    VIRTUAL PREVIEW
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-1">
                    Your Booking Slip Summary
                  </h3>
                </div>

                {/* Stylized receipt */}
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col gap-4 text-xs font-semibold">
                  
                  <div className="flex justify-between border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Nagpur Center:</span>
                    <span className="text-white font-bold">Dharampeth Clinic</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Patient:</span>
                    <span className="text-teal-400 font-bold">{patientName || "Waiting for input..."}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Service:</span>
                    <span className="text-white font-bold text-right">
                      {SERVICES.find(s => s.id === selectedService)?.title}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Consultant:</span>
                    <span className="text-white font-bold">
                      {DOCTORS.find(d => d.id === selectedDoctor)?.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Slot:</span>
                    <span className="text-white font-bold">
                      {selectedDay}, {selectedTimeSlot}
                    </span>
                  </div>

                </div>

                {/* Timing reassure */}
                <div className="flex gap-3 mt-2">
                  <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Need to reschedule?</strong> It's completely free. Just chat with our support manager on WhatsApp or call our clinical desk.
                  </p>
                </div>
              </div>

              {/* Clinic alternative phone call */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col gap-3">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Prefer a Direct Phone Call?
                </span>
                
                <a 
                  href={`tel:${CLINIC_CONTACT.phone}`}
                  className="flex items-center gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-teal-500 transition-all text-left"
                  id="booking-phone-alternate"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center text-teal-400 shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Desk Hotline</span>
                    <span className="block text-sm font-black text-white mt-0.5">{CLINIC_CONTACT.phone}</span>
                  </div>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 bg-slate-50" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full w-fit">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-bold text-teal-700 tracking-wide uppercase">
                Patient Guidance
              </span>
            </div>
            <h2 className="font-display font-black text-3xl text-slate-900 tracking-tight">
              Frequently Answered Questions
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Understand our sterilization guidelines, payment options, and dental alignment procedures in Nagpur.
            </p>
          </div>

          {/* Bento wrapper for Accordion */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = expandedFAQ === index;
              return (
                <div 
                  key={index}
                  className="border border-slate-50 rounded-2xl overflow-hidden transition-all duration-200"
                  id={`faq-item-${index}`}
                >
                  <button
                    onClick={() => setExpandedFAQ(isOpen ? null : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none bg-slate-50/40 hover:bg-slate-50 transition-colors"
                    id={`faq-trigger-${index}`}
                  >
                    <span className="font-display font-extrabold text-sm sm:text-base text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        id={`faq-answer-${index}`}
                      >
                        <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. TIMINGS, DIRECTIONS & BENTO FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
            
            {/* Column 1: Brand description (4 cols) */}
            <div className="md:col-span-4 flex flex-col gap-4 text-left">
              <a href="#home" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-display font-extrabold text-xl">
                  N
                </div>
                <div>
                  <span className="font-display font-bold text-lg tracking-tight text-white block">
                    Nagpur Dental Studio
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase block -mt-0.5">
                    MDS Specialities Center
                  </span>
                </div>
              </a>

              <p className="text-xs text-slate-400 leading-relaxed mt-2 max-w-sm">
                Centrally serving Nagpur residents in Dharampeth. Focused on premium computer-guided oral implantology, cosmetic veneer design, and gentle dental procedures.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4 mt-2">
                <a 
                  href={`https://api.whatsapp.com/send?phone=${CLINIC_CONTACT.whatsapp}`}
                  className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                  aria-label="Connect on WhatsApp"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                </a>
                <a 
                  href={`tel:${CLINIC_CONTACT.phone}`}
                  className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"
                  aria-label="Call clinic desk"
                >
                  <Phone className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Clock & Timings (4 cols) */}
            <div className="md:col-span-4 text-left">
              <h3 className="font-display font-bold text-sm text-white tracking-widest uppercase mb-5">
                Clinical Hours
              </h3>
              <ul className="flex flex-col gap-3 text-xs">
                <li className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Monday - Friday:</span>
                  <span className="text-slate-200 font-bold">{CLINIC_CONTACT.hours.weekdays}</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400">Saturday:</span>
                  <span className="text-slate-200 font-bold">{CLINIC_CONTACT.hours.saturday}</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-slate-500 font-bold">Sunday:</span>
                  <span className="text-slate-500 font-medium">{CLINIC_CONTACT.hours.sunday}</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Location / Map link (4 cols) */}
            <div className="md:col-span-4 text-left flex flex-col gap-5">
              <div>
                <h3 className="font-display font-bold text-sm text-white tracking-widest uppercase mb-5">
                  Clinic Location
                </h3>
                <div className="flex items-start gap-2.5 text-xs text-slate-400">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {CLINIC_CONTACT.address}
                  </p>
                </div>
              </div>

              {/* Map redirection links */}
              <a 
                href={CLINIC_CONTACT.mapUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-fit text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors mt-1 uppercase tracking-wider"
                id="footer-maps-link"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Footer bottom */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 uppercase font-bold tracking-widest">
            <p>
              © {new Date().getFullYear()} Nagpur Dental Studio - Modern Dentistry Specialists
            </p>
            <p>
              ISO 9001:2015 Certified Clinic
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
