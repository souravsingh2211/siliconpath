import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  CircuitBoard,
  Clock3,
  Cpu,
  Layers3,
  LockKeyhole,
  Menu,
  Play,
  Radio,
  Search,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import chipLab from "@/assets/vlsi-chip-lab.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SiliconPath — VLSI Courses & Mock Interviews" },
      { name: "description", content: "Build VLSI interview confidence with practical courses and mock interviews led by semiconductor industry professionals." },
      { property: "og:title", content: "SiliconPath — VLSI Courses & Mock Interviews" },
      { property: "og:description", content: "Learn the skills and rehearse real interview questions for your next semiconductor role." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Interview = {
  company: string;
  role: string;
  focus: string;
  track: string;
  duration: string;
  level: string;
  demo?: boolean;
  initials: string;
  color: string;
};

const interviews: Interview[] = [
  { company: "Qualcomm", role: "Physical Design Engineer", focus: "STA · Floorplanning · CTS", track: "Physical design", duration: "45 min", level: "Advanced", demo: true, initials: "Q", color: "company-qualcomm" },
  { company: "Intel", role: "RTL Design Engineer", focus: "Verilog · FSM · Timing", track: "RTL design", duration: "60 min", level: "Intermediate", initials: "I", color: "company-intel" },
  { company: "NVIDIA", role: "Verification Engineer", focus: "SystemVerilog · UVM", track: "Verification", duration: "50 min", level: "Advanced", initials: "N", color: "company-nvidia" },
  { company: "AMD", role: "Design Verification", focus: "Assertions · Coverage", track: "Verification", duration: "45 min", level: "Intermediate", initials: "A", color: "company-amd" },
];

const courses = [
  { title: "RTL Design with SystemVerilog", category: "RTL DESIGN", lessons: 18, duration: "6.5 hrs", level: "Beginner", color: "course-blue", icon: CircuitBoard, progress: 62 },
  { title: "Static Timing Analysis", category: "PHYSICAL DESIGN", lessons: 14, duration: "5 hrs", level: "Intermediate", color: "course-teal", icon: Zap, progress: 0 },
  { title: "UVM Verification Essentials", category: "VERIFICATION", lessons: 22, duration: "8 hrs", level: "Intermediate", color: "course-violet", icon: Layers3, progress: 0 },
];

const filters = ["All tracks", "RTL design", "Physical design", "Verification"];

function Index() {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "interviews">("overview");
  const [filter, setFilter] = useState("All tracks");
  const [search, setSearch] = useState("");
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[number] | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const [demoStarted, setDemoStarted] = useState(false);
  const [startedCourses, setStartedCourses] = useState<string[]>([]);

  const visibleInterviews = useMemo(() => interviews.filter((interview) => {
    const matchesSearch = `${interview.company} ${interview.role} ${interview.focus}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All tracks" || interview.track === filter;
    return matchesSearch && matchesFilter;
  }), [filter, search]);

  const visibleCourses = useMemo(() => courses.filter((course) => {
    const matchesSearch = `${course.title} ${course.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All tracks" || course.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  }), [filter, search]);

  function selectTab(tab: "overview" | "courses" | "interviews") {
    setActiveTab(tab);
    setMobileNavOpen(false);
    if (tab === "courses") setFilter("All tracks");
  }

  function toggleSaved(company: string) {
    setSavedCompanies((saved) => saved.includes(company) ? saved.filter((item) => item !== company) : [...saved, company]);
  }

  function closeInterview() {
    setSelectedInterview(null);
    setDemoStarted(false);
  }

  const sectionTitle = activeTab === "courses" ? "Explore courses" : activeTab === "interviews" ? "Interview library" : "Your learning path";

  return (
    <div className="app-frame min-h-screen bg-background text-foreground">
      <aside className={`app-sidebar ${mobileNavOpen ? "is-open" : ""}`}>
        <div className="brand-lockup">
          <span className="brand-mark"><Cpu size={20} strokeWidth={2.1} /></span>
          <span className="brand-name">silicon<span>path</span></span>
          <Button variant="ghost" size="icon" className="mobile-close" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X /></Button>
        </div>
        <div className="nav-label">LEARN</div>
        <nav className="side-nav" aria-label="Main navigation">
          <NavItem icon={<Layers3 />} title="Overview" selected={activeTab === "overview"} onClick={() => selectTab("overview")} />
          <NavItem icon={<BookOpen />} title="Courses" selected={activeTab === "courses"} onClick={() => selectTab("courses")} />
          <NavItem icon={<Target />} title="Mock interviews" selected={activeTab === "interviews"} onClick={() => selectTab("interviews")} />
        </nav>
        <div className="sidebar-divider" />
        <div className="nav-label">YOUR FOCUS</div>
        <div className="focus-list">
          <Button variant="ghost" className={`focus-item ${filter === "RTL design" ? "focus-active" : ""}`} onClick={() => setFilter(filter === "RTL design" ? "All tracks" : "RTL design")}><span className="focus-dot dot-blue" />RTL design<span className="focus-count">02</span></Button>
          <Button variant="ghost" className={`focus-item ${filter === "Physical design" ? "focus-active" : ""}`} onClick={() => setFilter(filter === "Physical design" ? "All tracks" : "Physical design")}><span className="focus-dot dot-teal" />Physical design<span className="focus-count">02</span></Button>
          <Button variant="ghost" className={`focus-item ${filter === "Verification" ? "focus-active" : ""}`} onClick={() => setFilter(filter === "Verification" ? "All tracks" : "Verification")}><span className="focus-dot dot-violet" />Verification<span className="focus-count">03</span></Button>
        </div>
        <div className="sidebar-bottom">
          <div className="mentor-card">
            <div className="mentor-icon"><Sparkles size={17} /></div>
            <p>Learn from people building chips</p>
            <span>Practical guidance from industry engineers.</span>
            <Button variant="outline" size="sm" className="mentor-link" onClick={() => selectTab("interviews")}>Meet your mentors <ArrowUpRight size={14} /></Button>
          </div>
          <Button variant="ghost" className="profile-row" aria-label="Learner profile"><span className="profile-avatar">S</span><span className="profile-info"><strong>Sourav Singh</strong><small>VLSI learner</small></span><ChevronRight size={15} className="profile-chevron" /></Button>
        </div>
      </aside>

      {mobileNavOpen && <Button variant="ghost" className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            <Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu /></Button>
            <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activeTab === "overview" ? "Overview" : activeTab === "courses" ? "Courses" : "Mock interviews"}</strong></div>
          </div>
          <div className="topbar-right">
            <label className="search-box"><Search size={16} /><Input aria-label="Search courses and interviews" placeholder="Search anything..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
            <Button variant="ghost" size="icon" className="notification-button" aria-label="Notifications"><Bell size={18} /><span /></Button>
            <span className="topbar-avatar">S</span>
          </div>
        </header>

        <div className="page-content">
          <div className="welcome-row">
            <div><p className="eyebrow"><span className="eyebrow-line" />THE SILICON INTERVIEW STUDIO</p><h1>{activeTab === "overview" ? <>Good evening, Sourav<span className="wave">.</span></> : sectionTitle}</h1><p className="page-subtitle">{activeTab === "overview" ? "Build the skills. Practice the questions. Get closer to your next role." : activeTab === "courses" ? "Focused learning paths for the work chip teams do every day." : "Rehearse for real VLSI roles with working semiconductor professionals."}</p></div>
            <div className="welcome-date"><span className="date-dot" />YOUR NEXT STEP, AT YOUR PACE</div>
          </div>

          {activeTab === "overview" && <section className="hero-banner" aria-label="Featured VLSI learning experience">
            <img className="hero-image" src={chipLab} alt="Silicon chip and wafer on an electronics lab workbench" width={1600} height={1104} />
            <div className="hero-shade" />
            <div className="hero-copy"><div className="hero-kicker"><span className="live-spark" /><span>CAREER PREP, BUILT FOR VLSI</span></div><h2>Think like an engineer.<br /><span>Interview like one, too.</span></h2><p>Structured courses and realistic practice for the semiconductor roles you want.</p><Button className="hero-button" onClick={() => selectTab("courses")}>Explore learning paths <ArrowUpRight size={16} /></Button></div>
            <div className="hero-image-label"><span className="image-label-icon"><Cpu size={15} /></span><span>DESIGNED FOR THE SILICON INDUSTRY</span></div>
          </section>}

          {activeTab === "overview" && <section className="metrics-row" aria-label="Learning overview">
            <Metric icon={<BookOpen />} label="LEARNING PATHS" value={String(courses.length).padStart(2, "0")} note="Across key VLSI domains" tone="metric-blue" />
            <Metric icon={<Target />} label="MOCK INTERVIEWS" value={String(interviews.length).padStart(2, "0")} note="From leading chip teams" tone="metric-teal" />
            <Metric icon={<Radio />} label="FREE PREVIEWS" value={String(interviews.filter((interview) => interview.demo).length).padStart(2, "0")} note="Try a session before you commit" tone="metric-violet" />
            <div className="streak-stat"><div className="streak-icon"><Zap size={17} /></div><div><div className="streak-number">Keep your momentum</div><div className="streak-note">One focused session makes a difference.</div></div><ChevronRight size={16} /></div>
          </section>}

          <section className="content-section">
            <div className="section-head"><div><div className="section-overline">{activeTab === "interviews" ? "PRACTICE WITH PURPOSE" : "CURATED FOR YOUR NEXT STEP"}</div><h2>{activeTab === "overview" ? "Pick up where it matters" : sectionTitle}</h2></div>{activeTab === "overview" && <Button variant="ghost" className="view-all" onClick={() => selectTab("interviews")}>Browse all interviews <ArrowUpRight size={15} /></Button>}</div>

            {activeTab !== "courses" && <div className="interview-grid">{visibleInterviews.map((interview) => <InterviewCard key={interview.company} interview={interview} saved={savedCompanies.includes(interview.company)} onSave={() => toggleSaved(interview.company)} onOpen={() => { setSelectedInterview(interview); setDemoStarted(false); }} />)}{visibleInterviews.length === 0 && <EmptyState query={search} />}</div>}

            {activeTab === "courses" && <div className="filter-row" role="group" aria-label="Filter by learning focus">{filters.map((item) => <Button key={item} variant={filter === item ? "default" : "ghost"} size="sm" className="filter-chip" onClick={() => setFilter(item)}>{item}</Button>)}</div>}

            {activeTab !== "interviews" && <div className="course-section-head"><div><div className="section-overline">BUILD STRONG FOUNDATIONS</div><h2>{activeTab === "overview" ? "Courses to sharpen your edge" : "Courses to sharpen your edge"}</h2></div>{activeTab === "overview" && <Button variant="ghost" className="view-all" onClick={() => selectTab("courses")}>View all courses <ArrowUpRight size={15} /></Button>}</div>}

            {activeTab !== "interviews" && <div className="course-grid">{visibleCourses.map((course) => <CourseCard key={course.title} course={course} started={startedCourses.includes(course.title)} onOpen={() => setSelectedCourse(course)} />)}{visibleCourses.length === 0 && <EmptyState query={search} />}</div>}
          </section>

          {activeTab !== "interviews" && <section className="bottom-note"><div className="note-icon"><Users size={19} /></div><div><strong>Real work experience. Practical interview prep.</strong><p>Meet mentors who work across design, verification and physical implementation.</p></div><Button variant="outline" size="sm" onClick={() => selectTab("interviews")}>Explore mock interviews <ChevronRight size={15} /></Button></section>}
          <footer className="page-footer"><span>© 2026 SiliconPath</span><span>Built for the next generation of chipmakers <span className="footer-dot">·</span> <a href="mailto:hello@siliconpath.example">Get in touch</a></span></footer>
        </div>
      </main>

      <Dialog open={selectedInterview !== null} onOpenChange={(open) => { if (!open) closeInterview(); }}>
        <DialogContent className="session-dialog"><DialogHeader><div className="dialog-kicker">{selectedInterview?.demo ? <><span className="dialog-live-dot" /> FREE INTERVIEW PREVIEW</> : <><LockKeyhole size={13} /> PROFESSIONAL MOCK INTERVIEW</>}</div><DialogTitle>{selectedInterview?.company} · {selectedInterview?.role}</DialogTitle><DialogDescription>{selectedInterview?.focus} · {selectedInterview?.duration} · {selectedInterview?.level}</DialogDescription></DialogHeader>
          {selectedInterview?.demo ? <div className="demo-body">{!demoStarted ? <><div className="demo-intro"><div className="demo-icon"><Play size={21} fill="currentColor" /></div><div><strong>A first look at a real interview</strong><span>A guided preview with a sample question from this track.</span></div></div><div className="sample-question"><span>QUESTION 01 <span>·</span> PHYSICAL DESIGN</span><p>What is clock skew, and how can a clock tree synthesis flow help control it?</p><div className="question-meta"><span><Clock3 size={13} /> About 5 minutes</span><span>Sample question</span></div></div><Button className="dialog-primary" onClick={() => setDemoStarted(true)}><Play size={15} fill="currentColor" /> Start free preview</Button></> : <><div className="demo-running"><div className="running-label"><span className="dialog-live-dot" />PREVIEW QUESTION <span className="running-time">05:00</span></div><p>What is clock skew, and how can a clock tree synthesis flow help control it?</p><textarea aria-label="Your answer" placeholder="Think it through, then outline your answer here..." /><div className="demo-actions"><Button variant="outline" onClick={() => setDemoStarted(false)}>Back to preview</Button><Button className="dialog-primary" onClick={closeInterview}>Finish preview <Check size={15} /></Button></div></div></>}</div> : <div className="locked-body"><div className="locked-message"><div className="locked-icon"><LockKeyhole size={19} /></div><div><strong>Guided by a working professional</strong><p>Work through a structured role-specific session with industry questions, feedback, and time to discuss your approach.</p></div></div><div className="includes-list"><span><Check size={15} /> Role-focused technical questions</span><span><Check size={15} /> Live feedback from an industry professional</span><span><Check size={15} /> Session tailored to {selectedInterview?.company}</span></div><div className="unavailable-note">Full session access details coming soon.</div></div>}
        </DialogContent>
      </Dialog>

      <Dialog open={selectedCourse !== null} onOpenChange={(open) => { if (!open) setSelectedCourse(null); }}>
        <DialogContent className="session-dialog course-dialog"><DialogHeader><div className="dialog-kicker">{selectedCourse?.category}</div><DialogTitle>{selectedCourse?.title}</DialogTitle><DialogDescription>{selectedCourse?.lessons} lessons · {selectedCourse?.duration} · {selectedCourse?.level}</DialogDescription></DialogHeader><div className="course-dialog-body"><div className="course-outline-title">INSIDE THIS COURSE</div><div className="outline-row"><span>01</span><div><strong>Core concepts and mental models</strong><small>Start with the ideas behind the workflow</small></div><Clock3 size={15} /></div><div className="outline-row"><span>02</span><div><strong>Real-world design examples</strong><small>Connect theory to practical scenarios</small></div><Clock3 size={15} /></div><div className="outline-row"><span>03</span><div><strong>Interview questions and review</strong><small>Apply what you have learned</small></div><Clock3 size={15} /></div><Button className="dialog-primary" onClick={() => { const title = selectedCourse?.title; if (title && !startedCourses.includes(title)) setStartedCourses((current) => [...current, title]); setSelectedCourse(null); }}>Start learning <ArrowUpRight size={15} /></Button></div></DialogContent>
      </Dialog>
    </div>
  );
}

function NavItem({ icon, title, selected, onClick }: { icon: React.ReactNode; title: string; selected: boolean; onClick: () => void }) {
  return <Button variant="ghost" aria-current={selected ? "page" : undefined} className={`side-nav-item ${selected ? "nav-selected" : ""}`} onClick={onClick}>{icon}<span>{title}</span>{selected && <span className="nav-indicator" />}</Button>;
}

function Metric({ icon, label, value, note, tone }: { icon: React.ReactNode; label: string; value: string; note: string; tone: string }) {
  return <div className="metric-item"><span className={`metric-icon ${tone}`}>{icon}</span><div className="metric-details"><span className="metric-label">{label}</span><div className="metric-main"><strong>{value}</strong><span>{note}</span></div></div></div>;
}

function InterviewCard({ interview, saved, onSave, onOpen }: { interview: Interview; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return <article className="interview-card"><div className="interview-card-top"><div className={`company-avatar ${interview.color}`}>{interview.initials}</div><div className="company-heading"><strong>{interview.company}</strong><span>{interview.role}</span></div><Button variant="ghost" size="icon" className={`save-button ${saved ? "is-saved" : ""}`} aria-label={saved ? `Remove ${interview.company} from saved` : `Save ${interview.company} interview`} onClick={onSave}><Bookmark size={16} fill={saved ? "currentColor" : "none"} /></Button></div><div className="interview-focus">{interview.focus}</div><div className="interview-card-meta"><span><Clock3 size={14} />{interview.duration}</span><span className="meta-separator" /><span>{interview.level}</span></div><div className="interview-card-bottom"><span className={`access-badge ${interview.demo ? "access-demo" : "access-locked"}`}>{interview.demo ? <><Play size={11} fill="currentColor" /> FREE DEMO</> : <><LockKeyhole size={11} /> PAID SESSION</>}</span><Button variant={interview.demo ? "default" : "outline"} size="sm" className="interview-action" onClick={onOpen}>{interview.demo ? "Try demo" : "View details"}<ChevronRight size={14} /></Button></div></article>;
}

function CourseCard({ course, started, onOpen }: { course: (typeof courses)[number]; started: boolean; onOpen: () => void }) {
  const CourseIcon = course.icon;
  return <article className="course-card"><div className={`course-art ${course.color}`}><div className="circuit-decoration" /><span className="course-art-icon"><CourseIcon size={22} strokeWidth={1.8} /></span><span className="course-category">{course.category}</span><Button variant="ghost" size="icon" className="course-open-icon" aria-label={`Open ${course.title}`} onClick={onOpen}><ArrowUpRight size={16} /></Button></div><div className="course-card-content"><h3>{course.title}</h3><div className="course-meta"><span>{course.lessons} lessons</span><span>·</span><span>{course.duration}</span><span>·</span><span>{course.level}</span></div><div className="course-progress-label"><span>{started && !course.progress ? "Just started" : course.progress > 0 ? "IN PROGRESS" : "READY WHEN YOU ARE"}</span>{course.progress > 0 && !started && <span>{course.progress}%</span>}</div><div className="progress-track"><div className="progress-value" style={{ width: `${course.progress || (started ? 8 : 0)}%` }} /></div><Button variant="ghost" className="course-action" onClick={onOpen}>{started ? "Continue course" : course.progress ? "Continue learning" : "View course"}<ChevronRight size={14} /></Button></div></article>;
}

function EmptyState({ query }: { query: string }) {
  return <div className="empty-state"><Search size={19} /><span>{query ? `No results for “${query}”` : "No items in this focus yet."}</span><small>Try another search or browse all tracks.</small></div>;
}