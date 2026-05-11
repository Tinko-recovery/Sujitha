"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Briefcase, Code, Database, Cpu, Zap, 
  Download, Award, BookOpen, Send, User, 
  ChevronRight, ExternalLink, Mail, Linkedin, Github,
  TrendingUp, Milestone, GraduationCap, MapPin, Calendar,
  Globe, Server, Layout, MessageSquare, FileText, ArrowUpRight,
  Phone, Share2, Search, Newspaper, Sparkles, DollarSign,
  BarChart3, Settings, Users, BrainCircuit
} from "lucide-react";
import Image from "next/image";

// --- DATA REPOSITORY ---

const RESUME_DATA = {
  name: "Sujitha Sadish",
  role: "Emerging Lead – Loan Operations | Syndicated & Bilateral Lending | US/North America Clients",
  email: "vrsuji87@gmail.com",
  phone: "+91 99723 75843",
  location: "Bangalore, India",
  bio: "Loan operations professional with 4+ years of experience in syndicated and bilateral lending at State Street and Deutsche Bank. Recently promoted to Emerging Lead for process mastery and team impact, managing operations for US/North America clients with zero-tolerance accuracy.",
  experience: [
    {
      company: "State Street",
      role: "Emerging Lead – Loan Services",
      period: "Mar 2026 – Present",
      location: "Bangalore, KA",
      description: "Promoted to Emerging Lead for a 15+ member operations team. Primary SME and escalation point for complex syndicated loan transactions.",
      achievements: [
        "Mastered all team processes across syndicated/bilateral loan lifecycle.",
        "Serve as primary escalation point for US/North America client queries.",
        "Train and onboard new joiners on Loan IQ and SWIFT standards."
      ],
      velocity: 98,
      driver: "Team Leadership & Process Mastery",
      labelOffset: 0
    },
    {
      company: "State Street",
      role: "Senior Associate – Loan Services",
      period: "Jul 2023 – Feb 2026",
      location: "Bangalore, KA",
      description: "Managed end-to-end processing for major US financial facilities. Specialized in Loan IQ deal setup and cross-border settlement.",
      achievements: [
        "Owned complex deal setup in LIQ: borrower onboarding and remittance configuration.",
        "Processed SWIFT MT103, MT202, and MT210 messages with zero error rate.",
        "Performed daily reconciliation across LS2, Hogan, and IBS before cut-offs."
      ],
      velocity: 80,
      driver: "High-Volume Transaction Operations",
      labelOffset: 40
    },
    {
      company: "Tata Consultancy Services (TCS)",
      role: "Operations Analyst – Commercial Lending",
      period: "Feb 2022 – Jun 2023",
      location: "Bangalore, KA",
      description: "Managed rate settings and commitment changes for syndicated loan lifecycles in Loan IQ.",
      achievements: [
        "Resolved critical Nostro account breaks under tight client deadlines.",
        "Delivered accurate Past Due (PD) and WIP reports daily."
      ],
      velocity: 55,
      driver: "Analytical Banking Operations",
      labelOffset: 0
    },
    {
      company: "Adecco (Deutsche Bank)",
      role: "Transaction Operations Analyst",
      period: "Oct 2020 – Jun 2021",
      location: "Bangalore, KA",
      description: "Delivered syndicated loan servicing within a Deutsche Bank operational environment.",
      achievements: [
        "Managed paper clip payments and interest capitalization in LIQ.",
        "Maintained high accuracy in manual cash flow reconciliation."
      ],
      velocity: 35,
      driver: "Core Banking Foundations",
      labelOffset: 40
    },
    {
      company: "Career Break",
      role: "Planned Career Break",
      period: "2012 – 2020",
      location: "Personal Commitments",
      description: "Planned break for family. Successfully transitioned back into high-stakes banking operations in 2020.",
      velocity: 15,
      driver: "Resilience & Career Pivot",
      labelOffset: 0
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
  if (q.includes("hi") || q.includes("hello")) return "Hello! I am Sujitha's Digital Twin. I can share details about her 4+ years of expertise in Loan Operations, her promotion to Emerging Lead, and her work with US/North America clients. How can I assist you?";
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("reach")) {
    return `You can reach Sujitha at ${RESUME_DATA.email} or call her at ${RESUME_DATA.phone}. She is based in ${RESUME_DATA.location} and available for immediate joining.`;
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
  if (q.includes("education") || q.includes("mba") || q.includes("degree")) {
    return `Sujitha holds an MBA in Human Resources from Pondicherry University and a B.Com in Corporate Secretaryship.`;
  }
  if (q.includes("loan iq") || q.includes("liq") || q.includes("swift")) {
    return "She is an expert in Loan IQ (LIQ), LS2, Hogan, and SWIFT messaging (MT103/MT202/MT210), with a focus on zero-tolerance accuracy for Nostro and GL maintenance.";
  }
  if (q.includes("break") || q.includes("gap")) {
    return "Sujitha took a planned career break between 2012-2020 for family commitments. She successfully returned in 2020 and has since rapidly advanced to a leadership role in banking operations.";
  }
  return "I'm equipped with Sujitha's full professional trajectory. Ask about her 'Lead Role', 'Loan IQ expertise', 'Contact Info', or 'Gen AI integration'.";
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"operations" | "ai" | "about">("operations");
  const [chatInput, setChatInput] = useState("");
  const [chatLogs, setChatLogs] = useState<{role: 'user' | 'ai', text: string}[]>([
    {role: 'ai', text: "Welcome. I am Sujitha's Digital Twin. Ask me anything about her leadership in Loan Operations, her technical stack, or her contact details."}
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLogs]);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatLogs(prev => [...prev, {role: 'user', text: userMsg}]);
    setChatInput("");
    
    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setChatLogs(prev => [...prev, {role: 'ai', text: response}]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#10B981]/30">
      
      {/* CONTACT TOP BAR */}
      <div className="bg-[#059669] text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center overflow-hidden">
        <motion.div 
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap"
        >
          {RESUME_DATA.email} • {RESUME_DATA.phone} • {RESUME_DATA.location} • {RESUME_DATA.email} • {RESUME_DATA.phone}
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
              <a href={`tel:${RESUME_DATA.phone}`} className="flex items-center gap-2 hover:text-[#059669] transition-colors"><Phone size={16} /> {RESUME_DATA.phone}</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/in/sujitha-sadish" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#059669] hover:text-white transition-all"><Linkedin size={18} /></a>
              <button className="hidden sm:flex bg-[#059669] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-[#059669]/20 active:scale-95 transition-all">Get in Touch</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16 space-y-24">

        {/* INTRODUCTION & HERO */}
        <section className="flex flex-col items-center text-center space-y-12 py-8">
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
              <div className="space-y-1">
                <div className="text-3xl font-black text-[#059669]">4+ Yrs</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Expertise</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-[#059669]">Lead</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Operations</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-[#059669]">Gen AI</div>
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

                {/* CAREER CHART */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-visible h-[500px] flex flex-col relative">
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Process Mastery Mapping</h4>
                      <p className="text-[10px] text-slate-400 font-medium italic">Tracking advancement from analyst to designated team SME.</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-end gap-3 px-2 relative">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 px-2 pb-16">
                      {[100, 75, 50, 25, 0].map((level) => (
                        <div key={level} className="border-t border-slate-900 w-full relative">
                          <span className="absolute -left-8 -top-2 text-[8px] font-bold text-slate-400">{level}%</span>
                        </div>
                      ))}
                    </div>

                    {RESUME_DATA.experience.slice().reverse().map((exp, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: isClient ? 1 : 0, y: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          className="absolute w-full text-center z-30"
                          style={{ bottom: `calc(${exp.velocity}% + 10px + ${exp.labelOffset}px)` }}
                        >
                          <div className="inline-block px-3 py-2 rounded-xl bg-white border border-[#059669]/20 shadow-xl">
                            <p className="text-[8px] font-black text-[#059669] uppercase tracking-tighter leading-tight whitespace-nowrap">
                              {exp.driver}
                            </p>
                          </div>
                          <div className="w-[1px] bg-gradient-to-b from-[#059669]/30 to-transparent mx-auto mt-1" style={{ height: `${exp.labelOffset + 10}px` }}></div>
                        </motion.div>

                        <div className="w-full relative h-full flex flex-col justify-end">
                          <div 
                            className="w-full rounded-t-2xl bg-gradient-to-t from-[#059669] to-[#10B981] relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom group-hover:scale-x-105"
                            style={{ 
                              height: isClient ? `${exp.velocity}%` : '0%',
                              transitionDelay: `${i * 100}ms`
                            }}
                          >
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[10px] font-bold px-4 py-3 rounded-2xl whitespace-nowrap z-40">
                              <div className="text-[#10B981]">{exp.period}</div>
                              <div>{exp.company}</div>
                            </div>
                          </div>
                        </div>

                        <div className="text-[10px] font-black text-slate-400 mt-6 rotate-45 origin-left tracking-tighter whitespace-nowrap">
                          {exp.period.split(' ')[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trajectory List */}
                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-0 before:w-1 before:bg-slate-100">
                  {RESUME_DATA.experience.map((exp, i) => (
                    <div key={i} className="relative pl-12 group">
                      <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center z-10">
                        <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#059669] animate-pulse" : "bg-slate-300"}`}></div>
                      </div>
                      <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#059669]/30 transition-all shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <span className="text-xs font-bold text-[#059669] uppercase tracking-widest">{exp.period}</span>
                            <h3 className="text-2xl font-black text-slate-900">{exp.role}</h3>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                              <MapPin size={14} /> {exp.company} • {exp.location}
                            </div>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-[#059669]/5 border border-[#059669]/10 text-[10px] font-black text-[#059669] uppercase tracking-widest">
                            {exp.driver}
                          </div>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{exp.description}</p>
                        {exp.achievements && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {exp.achievements.map((a, j) => (
                              <div key={j} className="flex gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="text-[#10B981] font-bold">✓</div>
                                {a}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                {/* AI DIGITAL TWIN */}
                <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      <BrainCircuit size={24} className="text-[#10B981]" /> Digital Sujitha
                    </h3>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 h-96 overflow-y-auto space-y-4 font-medium text-[13px]">
                    {chatLogs.map((log, idx) => (
                      <div key={idx} className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${log.role === 'user' ? 'bg-[#059669] text-white rounded-tr-none' : 'bg-white/10 border border-white/10 rounded-tl-none'}`}>
                          {log.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleChat} className="relative">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about Loan IQ or Lead role..."
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-sm outline-none focus:bg-white/20 transition-all placeholder:text-white/40 pr-14"
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 w-10 bg-[#10B981] text-white rounded-xl flex items-center justify-center">
                      <Send size={18} />
                    </button>
                  </form>
                </div>

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
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#059669] hover:text-white transition-all"><Linkedin size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#059669] hover:text-white transition-all"><Mail size={20} /></a>
              </div>
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">© 2026 {RESUME_DATA.name} • Professional Portfolio</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Final sync: 2026-05-11 03:20
