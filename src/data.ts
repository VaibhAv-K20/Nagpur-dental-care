import DrMaleImg from "./assets/images/dentist_male_1782905191847.jpg";
import DrFemaleImg from "./assets/images/dentist_female_1782905206342.jpg";
export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  education: string;
  experience: string;
  bio: string;
  image: string;
  languages: string[];
  schedule: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceEstimate: string;
  iconName: string; // Lucide icon mapping
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  treatment: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const CLINIC_CONTACT = {
  phone: "+91 98765 43210",
  whatsapp: "+919876543210", // for direct API link
  whatsappDisplay: "+91 98765 43210",
  email: "hello@nagpurdentalcare.com",
  address: "102, Silver Arcade, Dharampeth Main Road, Opposite Traffic Park, Dharampeth, Nagpur, Maharashtra 440010",
  hours: {
    weekdays: "9:00 AM - 8:30 PM",
    saturday: "9:00 AM - 5:00 PM",
    sunday: "Closed (Emergency Call Only)"
  },
  mapUrl: "https://maps.google.com/?q=Dharampeth+Nagpur"
};

export const DOCTORS: Doctor[] = [
  {
    id: "dr-amit-sharma",
    name: "Dr. Amit Sharma",
    role: "Clinical Director & Chief Implantologist",
    specialty: "Dental Implants & Oral Maxillofacial Surgery",
    education: "MDS (Oral Surgery) - Government Dental College, Nagpur",
    experience: "14+ Years Experience",
    bio: "Dr. Amit is a pioneer in immediate-load dental implants and computer-guided keyhole surgery. He has successfully placed over 3,000 dental implants and is a frequent speaker at national dental congresses.",
    image: DrMaleImg,
    languages: ["English", "Hindi", "Marathi"],
    schedule: "Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 8:30 PM"
  },
  {
    id: "dr-priya-deshmukh",
    name: "Dr. Priya Deshmukh",
    role: "Senior Consultant Dentist",
    specialty: "Cosmetic & Restorative Dentistry, Orthodontics",
    education: "BDS, MDS (Orthodontics) - MUHS University",
    experience: "9+ Years Experience",
    bio: "Dr. Priya specializes in designing beautiful smiles. She is certified in Invisalign Invisible Braces and takes pride in providing gentle, pain-free dental treatments with an artistic touch.",
    image: DrFemaleImg,
    languages: ["English", "Hindi", "Marathi"],
    schedule: "Mon - Sat: 9:00 AM - 12:30 PM & 4:30 PM - 7:30 PM"
  }
];

export const SERVICES: Service[] = [
  {
    id: "implants",
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements. Restore your smile's function, strength, and structural integrity with Nagpur's leading implantologist.",
    priceEstimate: "Starts from ₹18,000",
    iconName: "Activity",
    benefits: ["Life-long durability", "Prevents bone loss", "No damage to adjacent teeth", "Looks & feels natural"]
  },
  {
    id: "cosmetic",
    title: "Smile Makeovers & Veneers",
    description: "Transform your appearance with composite veneers, custom porcelain laminate laminas, professional laser teeth whitening, and complete digital smile design.",
    priceEstimate: "Starts from ₹4,500",
    iconName: "Sparkles",
    benefits: ["Stain removal", "Corrects chips and spacing", "Custom shade matching", "Boosts self-confidence"]
  },
  {
    id: "ortho",
    title: "Invisalign & Clear Aligners",
    description: "Straighten your teeth discretely and comfortably without traditional metal braces. Advanced custom clear orthodontic plates designed for teens and adults.",
    priceEstimate: "Starts from ₹45,000",
    iconName: "Layers",
    benefits: ["Virtually invisible", "Removable for meals", "Easier to clean", "Fewer dental visits"]
  },
  {
    id: "root-canal",
    title: "Single-Visit Root Canal",
    description: "Save damaged or infected teeth painlessly in a single sitting using advanced state-of-the-art micro-endodontic rotary systems with absolute precision.",
    priceEstimate: "Starts from ₹3,500",
    iconName: "ShieldAlert",
    benefits: ["100% pain-free technology", "Single 45-minute session", "Stops progressive infection", "Preserves natural tooth"]
  },
  {
    id: "pediatric",
    title: "Pediatric Dentistry",
    description: "A warm, playful environment designed to help children develop healthy dental habits early. Gentle fluoride applications, sealing, and painless decay treatments.",
    priceEstimate: "Starts from ₹1,200",
    iconName: "Heart",
    benefits: ["Child-friendly environment", "Prevents dental anxiety", "Fluoride decay protection", "Habit breaking advice"]
  },
  {
    id: "preventive",
    title: "Deep Cleaning & Preventive Care",
    description: "Ultrasonic scaling, polishing, oral cancer screenings, and diagnostic digital X-rays. Maintain excellent hygiene and stop gum problems before they begin.",
    priceEstimate: "Starts from ₹1,500",
    iconName: "Stethoscope",
    benefits: ["Prevents gum bleeding", "Eliminates bad breath", "Removes stubborn plaque", "Twice-yearly recommended"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Kulkarni",
    location: "Ramdaspeth, Nagpur",
    rating: 5,
    date: "2 weeks ago",
    comment: "I was extremely scared of root canal treatments. Dr. Amit Sharma made the entire process absolutely painless! He explained everything before starting. Truly the best dental clinic in Nagpur.",
    treatment: "Single-sitting Root Canal"
  },
  {
    id: "test-2",
    name: "Sneha Deshpande",
    location: "Dharampeth, Nagpur",
    rating: 5,
    date: "1 month ago",
    comment: "Got my smile makeover done with veneers from Dr. Priya. I am amazed by the results! It looks extremely natural and I can't stop smiling. The clinic is ultra-modern and very hygienic.",
    treatment: "Cosmetic Veneers"
  },
  {
    id: "test-3",
    name: "Aniket Joshi",
    location: "Pratap Nagar, Nagpur",
    rating: 5,
    date: "3 weeks ago",
    comment: "Very professional and friendly staff. I got Invisalign aligners here and the treatment is going great. Weekly tracking and reminder system makes things super easy.",
    treatment: "Invisalign Clear Aligners"
  }
];

export const FAQS: FAQ[] = [
  {
    question: "Do you offer emergency dental treatments in Nagpur?",
    answer: "Yes! We offer same-day priority emergency services for dental situations like severe toothaches, broken teeth, dislodged crowns, or oral injuries. Please call us directly on our contact number."
  },
  {
    question: "How long does a typical Dental Implant procedure take?",
    answer: "The implant placement itself takes only about 30 to 45 minutes under local anesthesia. The complete fusion (osseointegration) of the implant with the jawbone takes about 3 months, after which we place the final high-strength ceramic crown."
  },
  {
    question: "What makes Nagpur Dental Care different from other clinics?",
    answer: "We stand out because of our dual-specialty expert doctors (MDS specialists), 100% clean sterilization protocols following international standards, state-of-the-art equipment (like 3D CBCT imaging), pain-free laser dental systems, and our commitment to absolute transparent billing."
  },
  {
    question: "Are clear aligners (Invisalign) painful compared to metal braces?",
    answer: "Not at all. Clear aligners use a series of gentle, custom-engineered plastic trays to smoothly guide teeth into position. You might feel a slight pressure for the first day or two of a new tray, which is a sign your teeth are moving correctly, but it is far more comfortable than metal wires and brackets."
  }
];
