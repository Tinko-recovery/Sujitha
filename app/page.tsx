"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, Share2, Search, Newspaper, Sparkles, DollarSign,
  BarChart3, Settings, Users, BrainCircuit, X, MessageCircle, Milestone, MapPin, GraduationCap, BookOpen, TrendingUp,
  Mail, Linkedin, Globe, Calendar, Send, Shield
} from "lucide-react";
import Image from "next/image";

// --- DATA REPOSITORY ---

const RESUME_DATA = {
  name: "Sujitha Sadish",
  role: "Emerging Lead – Loan Operations | Syndicated & Bilateral Lending | US/North America Clients",
  email: "vrsuji87@gmail.com",
  phone: "",
  location: "Bangalore, India",
  bio: "Loan operations professional with 6+ years of experience in syndicated and bilateral lending at State Street and Deutsche Bank. Recently promoted to Emerging Lead for process mastery and team impact, managing operations for US/North America clients with zero-tolerance accuracy.",
  experience: [
    {
      company: "State Street",
      role: "Emerging Lead – Loan Operations",
      period: "Mar 2024 – Present",
      location: "Bangalore, India",
      description: "Managing complex syndicated and bilateral loan operations for US and North America institutional clients. Recently promoted for consistent process excellence and team leadership.",
      achievements: [
        "Led process improvement initiatives reducing Nostro break resolution time by 30%.",
        "Managed a team of 5+ associates in daily operations and high-stakes financial reporting.",
        "Ensured 100% compliance with zero-tolerance accuracy for global financial institutions."
      ],
      velocity: 95,
      driver: "Process Mastery & Leadership"
    },
    {
      company: "State Street",
      role: "Senior Associate – Loan Operations",
      period: "Jul 2021 – Feb 2024",
      location: "Bangalore, India",
      description: "Specialized in Loan IQ and SWIFT messaging (MT103/202) for syndicated lending portfolios. Handled complex loan servicing and client queries.",
      achievements: [
        "Expert in Loan IQ for managing bilateral and syndicated loan life cycles.",
        "Reduced manual processing errors through automated reconciliation checks."
      ],
      velocity: 75,
      driver: "Technical Operations Specialist"
    },
    {
      company: "Tata Consultancy Services (TCS)",
      role: "Process Associate",
      period: "Jan 2020 – Jun 2021",
      location: "Bangalore, India",
      description: "Returned to the professional workforce post-career break. Managed back-office operations for global banking clients.",
      velocity: 50,
      driver: "Career Re-entry & Adaptability"
    },
    {
      company: "Career Break",
      role: "Planned Professional Sabbatical",
      period: "2012 – 2019",
      location: "Family Focus",
      description: "Strategic career break for family commitments, maintaining updated knowledge of banking trends and regulatory shifts.",
      velocity: 20,
      driver: "Personal Growth & Strategy"
    }
  ],
  education: [
    {
      degree: "MBA – Human Resources Management",
      institution: "Pondicherry University",
      period: "2009 – 2012"
    },
    {
      degree: "B.Com – Corporate Secretaryship",
      institution: "Bharathidasan Govt. College for Women",
      period: "2004 – 2007"
    }
  ],
  skills: {
    loanTypes: ["Syndicated Loans", "Bilateral Facilities", "Commercial Lending"],
    tools: ["Loan IQ (LIQ)", "LS2", "Hogan", "IBS", "Cash Manager", "ACREC"],
    payments: ["SWIFT MT103", "MT202", "MT210", "Cross-border Settlement"],
    operations: ["GL Maintenance", "Nostro Reconciliation", "Remittance Config", "Borrower Onboarding"]
  },
  aiExpertise: [
    {
      title: "Generative AI for Banking Operations",
      desc: "Leveraging Large Language Models to automate complex documentation summaries and operational SOPs.",
      details: "Applying prompt engineering to streamline the interpretation of loan credit agreements and facility documents, reducing manual review time.",
      tech: ["LLM Prompting", "Document Intelligence", "Process Automation"],
      icon: <BrainCircuit size={28} />
    },
    {
      title: "Intelligent Reconciliation Workflows",
      desc: "Exploring AI-driven anomaly detection for Nostro break resolution and GL maintenance.",
      details: "Utilizing advanced data patterning to predict and flag potential reconciliation discrepancies before they impact end-of-day cut-offs.",
      tech: ["Data Patterning", "Predictive Alerts", "Accuracy Governance"],
      icon: <Shield size={28} />
    }
  ]
};

const getAIResponse = (query: string) => {
  const q = query.toLowerCase();
  if (q.includes("hi") || q.includes("hello")) return "Hello! I am Sujitha's Digital Twin. I can share details about her 6+ years of expertise in Loan Operations, her promotion to Emerging Lead, and her work with US/North America clients. How can I assist you?";
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("reach") || q.includes("info") || q.includes("details") || q.includes("linkedin") || q.includes("mobile")) {
    return `Sujitha's professional contact details are: \n• Email: ${RESUME_DATA.email} \n• LinkedIn: linkedin.com/in/sujitha-sadish \n• Location: ${RESUME_DATA.location}. \nShe is available for immediate joining.`;
  }
  if (q.includes("experience") || q.includes("work") || q.includes("history") || q.includes("loan")) {
    return `Sujitha is an Emerging Lead at State Street, specializing in Syndicated and Bilateral lending. She has deep expertise in Loan IQ, SWIFT (MT103/202), and managing Nostro breaks for global clients.`;
  }
  if (q.includes("ai") || q.includes("gen ai") || q.includes("technology")) {
    return "While a loan operations expert, Sujitha proactively integrates Generative AI into her workflows—using LLMs for document intelligence, credit agreement analysis, and streamlining operational SOPs.";
  }
  if (q.includes("promotion") || q.includes("lead") || q.includes("emerging")) {
    return "Sujitha was recently promoted to Emerging Lead at State Street. She now serves as the primary SME and escalation point for a 15+ member team handling complex US/North America loan facilities.";
  }
  if (q.includes("education") || q.includes("mba") || q.includes("degree") || q.includes("qualification") || q.includes("study")) {
    return `Sujitha holds an MBA in Human Resources from Pondicherry University and a B.Com in Corporate Secretaryship.`;
  }
  if (q.includes("loan iq") || q.includes("liq") || q.includes("swift")) {
    return "She is an expert in Loan IQ (LIQ), LS2, Hogan, and SWIFT messaging (MT103/MT202/MT210), with a focus on zero-tolerance accuracy for Nostro and GL maintenance.";
  }
  if (q.includes("break") || q.includes("gap")) {
    return "Sujitha took a planned career break between 2012-2019 for family commitments. She successfully returned in 2020 and has since rapidly advanced to a leadership role in banking operations.";
  }
  return "I'm equipped with Sujitha's full professional trajectory. Ask about her 'Lead Role', 'Loan IQ expertise', 'Contact Info', or 'Gen AI integration'.";
};

const QUICK_QUESTIONS = [
  "Tell me about your Lead role.",
  "What are your skills in Loan IQ?",
  "How can I contact you?",
  "Tell me about your career break."
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"operations" | "ai" | "about">("operations");
  const [chatInput, setChatInput] = useState("");
  const [chatLogs, setChatLogs] = useState<{role: 'user' | 'ai', text: string}[]>([
    {role: 'ai', text: "Welcome. I am Sujitha's Digital Twin. Ask me anything about her leadership in Loan Operations, her technical stack, or her contact details."}
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (chatLogs.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLogs]);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatLogs(prev => [...prev, {role: 'user', text: userMsg}]);
    setChatInput("");
    
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setChatLogs(prev => [...prev, {role: 'ai', text: response}]);
      setIsTyping(false);
    }, 1200);
  };

  const sendQuickQuestion = (q: string) => {
    setChatLogs(prev => [...prev, {role: 'user', text: q}]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(q);
      setChatLogs(prev => [...prev, {role: 'ai', text: response}]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#10B981]/30">
      
      {/* CONTACT TOP BAR */}
      <div className="bg-[#059669] text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center overflow-hidden">
        <motion.div 
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex gap-12 items-center justify-center"
        >
          <span>{RESUME_DATA.email}</span>
          <div className="w-1 h-1 rounded-full bg-[#10B981]"></div>
          <span>{RESUME_DATA.location}</span>
          <div className="w-1 h-1 rounded-full bg-[#10B981]"></div>
          <span>Emerging Lead – US Loan Services</span>
          <div className="w-1 h-1 rounded-full bg-[#10B981]"></div>
          <span>{RESUME_DATA.email}</span>
          <div className="w-1 h-1 rounded-full bg-[#10B981]"></div>
          <span>{RESUME_DATA.location}</span>
        </motion.div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#059669] flex items-center justify-center font-bold text-white text-xl">SS</div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-none">{RESUME_DATA.name}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Emerging Lead | Loan Operations</span>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-500 border-r border-slate-200 pr-6">
              <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center gap-2 hover:text-[#059669] transition-colors"><Mail size={16} /> {RESUME_DATA.email}</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/in/sujitha-sadish" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#059669] hover:text-white transition-all"><Linkedin size={18} /></a>
              <button className="hidden sm:flex bg-[#059669] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-[#059669]/20 active:scale-95 transition-all">Get in Touch</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16 space-y-24">

        {/* INTRODUCTION & HERO */}
        <section className="flex flex-col items-center text-center space-y-12 py-8">
          <div className="relative group mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#059669] to-[#10B981] rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative w-48 h-48 rounded-[2.5rem] overflow-hidden border-8 border-white bg-slate-100 shadow-2xl mx-auto">
              <Image 
                src="/sujitha.jpg" 
                alt={RESUME_DATA.name} 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#059669] text-xs font-bold uppercase tracking-wider">
              <Shield size={14} className="text-[#059669]" /> Emerging Lead – US Loan Services
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
              Optimize with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#10B981]">
                Banking Intelligence.
              </span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
              {RESUME_DATA.bio}
            </p>
            
            <div className="flex flex-wrap justify-center gap-10 pt-4">
              <div className="space-y-1 group/stat cursor-default">
                <div className="text-3xl font-black text-[#059669] group-hover/stat:scale-110 transition-transform">6+ Yrs</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Expertise</div>
              </div>
              <div className="space-y-1 group/stat cursor-default">
                <div className="text-3xl font-black text-[#059669] group-hover/stat:scale-110 transition-transform">Lead</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Operations</div>
              </div>
              <div className="space-y-1 group/stat cursor-default">
                <div className="text-3xl font-black text-[#059669] group-hover/stat:scale-110 transition-transform">Gen AI</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Adopter</div>
              </div>
            </div>

            {/* TAB SWITCHER */}
            <div className="flex gap-1 p-1.5 bg-slate-200/50 rounded-2xl w-fit border border-slate-200 mt-8 overflow-x-auto max-w-full mx-auto">
              <button 
                onClick={() => setActiveTab("operations")}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === "operations" ? "bg-white text-[#059669] shadow-xl" : "text-slate-500 hover:text-slate-700"}`}
              >
                Loan Operations
              </button>
              <button 
                onClick={() => setActiveTab("ai")}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === "ai" ? "bg-white text-[#059669] shadow-xl" : "text-slate-500 hover:text-slate-700"}`}
              >
                AI Ops Excellence
              </button>
              <button 
                onClick={() => setActiveTab("about")}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === "about" ? "bg-white text-[#059669] shadow-xl" : "text-slate-500 hover:text-slate-700"}`}
              >
                Expert Profile
              </button>
            </div>
          </div>

        </section>

        {/* DYNAMIC CONTENT SECTION */}
        <AnimatePresence mode="wait">
          {activeTab === "operations" ? (
            <motion.div 
              key="operations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-8 space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <TrendingUp className="text-[#059669]" /> Career Growth & Team Impact
                  </h2>
                </div>

                {/* CAREER TIMELINE ROADMAP */}
                <div className="relative pb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
                    <Milestone className="text-[#059669]" /> Career Growth Roadmap
                  </h2>
                  
                  <div className="relative space-y-12 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#059669] before:via-[#10B981] before:to-slate-100">
                    {RESUME_DATA.experience.map((exp, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-12 group"
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                          <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#059669] animate-pulse" : "bg-slate-300 group-hover:bg-[#059669] transition-colors"}`}></div>
                        </div>

                        {/* Content Card */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#059669]/20 transition-all duration-500 relative overflow-hidden">
                          {/* Progress/Impact Indicator */}
                          <div className="absolute top-0 right-0 w-2 h-full bg-[#059669]/5 group-hover:bg-[#059669]/10 transition-colors"></div>
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black text-[#059669] uppercase tracking-[0.2em] bg-[#059669]/5 px-3 py-1 rounded-full">{exp.period}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><MapPin size={10} /> {exp.location}</span>
                              </div>
                              <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#059669] transition-colors">{exp.role}</h3>
                              <p className="text-lg font-bold text-slate-600">{exp.company}</p>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Impact Momentum</div>
                              <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${exp.velocity}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: i * 0.2 }}
                                  className="h-full bg-gradient-to-r from-[#059669] to-[#10B981]"
                                />
                              </div>
                            </div>
                          </div>

                          <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-3xl">{exp.description}</p>
                          
                          {exp.achievements && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {exp.achievements.map((a, j) => (
                                <div key={j} className="flex gap-3 text-[11px] font-medium text-slate-600 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 group-hover:bg-white transition-colors">
                                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#059669] flex items-center justify-center text-[10px] shrink-0 font-black">✓</div>
                                  {a}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                {/* Floating AI Agent will be rendered at the bottom of the body */}

                {/* COMPETENCIES */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 space-y-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <Settings className="text-[#059669]" /> Stack & Tools
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Systems</h4>
                      <div className="flex flex-wrap gap-2">
                        {RESUME_DATA.skills.tools.map((s, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Payments</h4>
                      <div className="flex flex-wrap gap-2">
                        {RESUME_DATA.skills.payments.map((s, i) => (
                          <span key={i} className="px-3 py-1.5 bg-[#10B981]/5 text-[#059669] text-[10px] font-bold rounded-lg border border-[#10B981]/10">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 space-y-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <GraduationCap className="text-[#059669]" /> Education
                  </h3>
                  <div className="space-y-6">
                    {RESUME_DATA.education.map((edu, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1"><BookOpen size={18} className="text-slate-300" /></div>
                        <div>
                          <p className="text-xs font-bold text-[#059669] uppercase tracking-widest">{edu.period}</p>
                          <h4 className="font-bold text-slate-900 leading-tight">{edu.degree}</h4>
                          <p className="text-sm text-slate-500">{edu.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === "ai" ? (
            <motion.div 
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {RESUME_DATA.aiExpertise.map((p, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#059669]/5 flex items-center justify-center mb-8 group-hover:bg-[#059669] group-hover:text-white transition-all">
                      {p.icon}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                    <p className="text-slate-400 text-xs leading-relaxed mb-8 italic border-l-2 border-[#10B981] pl-4">{p.details}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t, j) => (
                        <span key={j} className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-slate-100 text-slate-500 rounded-full">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="bg-white p-12 rounded-[3rem] border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                  <h3 className="text-3xl font-black text-slate-900">Professional Summary</h3>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    {RESUME_DATA.bio}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <DollarSign className="text-[#059669] mb-4" />
                      <h4 className="font-bold mb-2">Loan Lifecycle</h4>
                      <p className="text-xs text-slate-500">Mastery of drawdowns, rollovers, and rate resets across US facilities.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <Globe className="text-[#059669] mb-4" />
                      <h4 className="font-bold mb-2">Global Messaging</h4>
                      <p className="text-xs text-slate-500">Expert in SWIFT MT103/202/210 and cross-border settlement logic.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#059669]/5 p-8 rounded-[2rem] border border-[#059669]/10 space-y-6">
                  <h4 className="text-xs font-black text-[#059669] uppercase tracking-widest">Immediate Joining</h4>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    Open to roles in loan operations, trade finance, and banking middle/back-office across Bangalore and remote engagements.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><MapPin size={16} /> Bangalore, India</div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><Calendar size={16} /> Immediate Availability</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <footer className="bg-white border-t border-slate-200 py-16 mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#059669] flex items-center justify-center font-bold text-white text-xl">SS</div>
                <span className="font-bold text-xl text-slate-900 tracking-tight">{RESUME_DATA.name}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Subject Matter Expert in Loan Operations & Emerging Lead. 
                Focused on accuracy, process mastery, and Gen AI adoption.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/sujitha-sadish" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#059669] hover:text-white transition-all"><Linkedin size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#059669] hover:text-white transition-all"><Mail size={20} /></a>
              </div>
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">© 2026 {RESUME_DATA.name} • Professional Portfolio</p>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING AI AGENT */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-[95vw] sm:w-[400px] h-[80vh] sm:h-[600px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-[#059669] to-[#10B981] p-6 text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <BrainCircuit size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-base leading-tight tracking-tight">Digital Sujitha</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></div>
                      <span className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Online • AI Assistant</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-10 h-10 rounded-2xl bg-black/10 flex items-center justify-center hover:bg-black/20 transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50 flex flex-col custom-scrollbar">
                {chatLogs.map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: log.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] px-5 py-4 rounded-[1.5rem] text-[13px] font-medium leading-relaxed shadow-sm ${log.role === 'user' ? 'bg-[#059669] text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'}`}>
                      {log.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-slate-100 px-5 py-3 rounded-[1.5rem] rounded-tl-none shadow-sm flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sujitha is thinking...</span>
                    </div>
                  </motion.div>
                )}
                
                {!isTyping && chatLogs.length === 1 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {QUICK_QUESTIONS.map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => sendQuickQuestion(q)}
                        className="text-[11px] font-bold text-[#059669] bg-[#059669]/5 border border-[#059669]/10 px-4 py-2 rounded-xl hover:bg-[#059669] hover:text-white transition-all active:scale-95"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleChat} className="p-4 bg-white border-t border-slate-100 flex gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#059669]/10 transition-all"
                />
                <button type="submit" className="w-14 h-14 bg-[#059669] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[#059669]/20 active:scale-95 transition-all hover:bg-[#047857]">
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${isChatOpen ? "bg-slate-900 rotate-90" : "bg-[#059669] hover:scale-110"}`}
        >
          {isChatOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <>
              <div className="absolute inset-0 rounded-full bg-[#059669] animate-ping opacity-20"></div>
              <MessageCircle size={28} className="text-white" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}

// Final sync: 2026-05-11 21:55
