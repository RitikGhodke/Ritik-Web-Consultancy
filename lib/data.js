export const services = [
  {
    id: "web",
    icon: "globe",
    title: "Business Websites",
    text: "Fast, SEO-ready websites that make your business look credible and bring in enquiries.",
    tags: ["Next.js", "SEO", "Responsive"],
  },
  {
    id: "ecom",
    icon: "cart",
    title: "E-commerce & Payments",
    text: "Online stores with secure checkout, Razorpay payments, order management and an admin panel.",
    tags: ["Razorpay", "MongoDB", "Admin"],
  },
  {
    id: "app",
    icon: "layout",
    title: "Custom Web Apps",
    text: "Dashboards, booking systems and internal tools built on the MERN stack, made around your workflow.",
    tags: ["MERN", "Auth", "Realtime"],
  },
  {
    id: "landing",
    icon: "rocket",
    title: "Landing Pages",
    text: "High-converting, animated pages for launches, campaigns and portfolios.",
    tags: ["Animation", "Conversion"],
  },
  {
    id: "perf",
    icon: "gauge",
    title: "Redesign & Speed",
    text: "Old site slow or outdated? I rebuild it modern, faster and easier to manage.",
    tags: ["Performance", "UI/UX"],
  },
  {
    id: "care",
    icon: "support",
    title: "Maintenance & Support",
    text: "Hosting, updates, bug fixes and content changes so your site keeps running smoothly.",
    tags: ["Hosting", "Updates"],
  },
];

export const techRow1 = [
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
];

export const techRow2 = [
  "Three.js",
  "Redis",
  "Socket.io",
  "Razorpay",
  "Cloudinary",
  "Vercel",
  "Render",
  "REST APIs",
];

// NOTE: ye details placeholder hain. Apne asli tech, link aur screenshots se badalna.
export const projects = [
  {
    id: "akhil-kala-film",
    category: "Photography Portfolio",
    title: "Akhil Kala Film's",
    initials: "AK",
    domain: "akhilkalafilms.com",
    text: "A cinematic portfolio website for a wedding photography studio, built to showcase galleries and turn visitors into bookings.",
    tech: ["Next.js", "Tailwind", "Cloudinary"],
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
    image: null, // baad me "/projects/akhil.png" jaisa path
    link: "", // live site ka URL
  },
  {
    id: "mr-group",
    category: "Multi-Business Platform",
    title: "MR Group",
    initials: "MR",
    domain: "mrgroup.business",
    text: "One platform for a group of businesses (spa, barber, café), with a separate presence and booking flow for each.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    gradient: "linear-gradient(135deg, #0e7490 0%, #1d4ed8 100%)",
    image: null,
    link: "",
  },
  {
    id: "apna-market",
    category: "Hyperlocal Marketplace",
    title: "Apna Market",
    initials: "AM",
    domain: "apnamarket.in",
    text: "A marketplace that connects kirana and local stores with customers nearby: local se door tak.",
    tech: ["MERN", "Razorpay", "Redis"],
    gradient: "linear-gradient(135deg, #be185d 0%, #4f46e5 100%)",
    image: null,
    link: "",
  },
];

export const process = [
  {
    title: "Discover",
    text: "We start with a call: your business, your customers and what you want the website to achieve.",
    points: ["Requirements & goals", "Competitor look", "Clear scope and timeline"],
  },
  {
    title: "Design",
    text: "I plan the structure and visual direction first, so you see where it is heading before any heavy code.",
    points: ["Page structure", "Look & feel", "Your feedback and approval"],
  },
  {
    title: "Develop",
    text: "Clean, fast code on Next.js, Node and MongoDB, with animations that feel premium but stay light.",
    points: ["Responsive build", "Admin panel if needed", "Regular progress updates"],
  },
  {
    title: "Launch & Support",
    text: "Deployment, domain, SEO basics, and support after launch so nothing breaks when you start growing.",
    points: ["Deploy & domain setup", "SEO basics", "Ongoing maintenance"],
  },
];

// NOTE: placeholder numbers. Sirf wahi likhna jo sach ho.
export const stats = [
  { value: 5, suffix: "+", label: "Projects built" },
  { value: 3, suffix: "", label: "Live client sites" },
  { value: 24, suffix: "h", label: "Reply time" },
  { value: 100, suffix: "%", label: "Custom code" },
];




// NOTE: placeholder posts. Admin panel banne ke baad blog yahan se nahi, database se aayega.
export const posts = [
  {
    slug: "why-fast-website-matters",
    category: "Performance",
    title: "Why a fast website brings you more customers",
    excerpt:
      "Visitors leave slow sites within seconds. Here is how speed affects trust, search ranking and enquiries.",
    dateLabel: "1 Oct 2026",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg, #0e7490 0%, #1d4ed8 100%)",
  },
  {
    slug: "nextjs-vs-wordpress",
    category: "Guides",
    title: "Next.js or WordPress: what should a small business choose?",
    excerpt:
      "A plain comparison of cost, speed, control and maintenance, without the jargon.",
    dateLabel: "24 Sep 2026",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
  },
  {
    slug: "website-cost-india",
    category: "Pricing",
    title: "How much does a business website cost in India?",
    excerpt:
      "What affects the price, what to ask before hiring a developer, and how to avoid hidden costs.",
    dateLabel: "15 Sep 2026",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #be185d 0%, #4f46e5 100%)",
  },
];

// Contact form ke budget options. Apne hisaab se badal sakte ho.
export const budgets = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹1,50,000",
  "₹1,50,000+",
  "Not sure yet",
];