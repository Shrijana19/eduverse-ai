// Solar Learning Lab: asymmetric editorial layout, visible learning thread, warm intelligence.
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  FlaskConical,
  Gauge,
  Headphones,
  Lightbulb,
  Menu,
  MessageCircle,
  Mic2,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Upload,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type Stage = "setup" | "plan" | "teach" | "check" | "adapt" | "report";

const steps = ["Understand", "Plan", "Explain", "Question", "Adapt", "Continue"];

const conceptCards = [
  { title: "Force", note: "A push or a pull", label: "01 · NOTICE", icon: "↗", tone: "yellow" },
  { title: "Mass", note: "How much matter", label: "02 · CONNECT", icon: "◉", tone: "blue" },
  { title: "Acceleration", note: "Change in motion", label: "03 · APPLY", icon: "∆", tone: "coral" },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="logo-mark"><span /></div>
      <div className="leading-none"><div className="font-display text-[20px] tracking-[-0.03em]">EduVerse</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">AI teacher</div></div>
    </div>
  );
}

function Thread({ active }: { active: number }) {
  return <div className="learning-thread" aria-label="Lesson stages">{steps.map((step, i) => <div key={step} className={`thread-node ${i <= active ? "is-active" : ""} ${i === active ? "is-current" : ""}`}><span className="thread-dot">{i < active ? <Check size={12} strokeWidth={3} /> : i + 1}</span><span>{step}</span></div>)}</div>;
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("setup");
  const [level, setLevel] = useState("Beginner");
  const [language, setLanguage] = useState("Hinglish");
  const [time, setTime] = useState("5 minutes");
  const [answer, setAnswer] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const stageIndex = useMemo(() => ({ setup: 0, plan: 1, teach: 2, check: 3, adapt: 4, report: 5 }[stage]), [stage]);

  const startLesson = () => { setStage("plan"); toast.success("Your lesson is ready", { description: "Built for a beginner, in Hinglish, with a 5-minute focus." }); };
  const beginTeaching = () => setStage("teach");
  const askQuestion = () => setStage("check");
  const submitAnswer = () => { if (!answer.trim()) { toast.error("Write a quick answer first"); return; } setStage("adapt"); };
  const continueLesson = () => setStage("report");
  const reset = () => { setStage("setup"); setAnswer(""); };

  return <div className="min-h-screen bg-paper text-ink selection:bg-sun selection:text-ink">
    <header className="site-header">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 flex items-center justify-between h-[76px]">
        <Logo />
        <nav className={`${mobileNav ? "mobile-open" : ""} header-nav`}>
          {["Home", "Learn", "Progress", "Learning path"].map((item, i) => <button key={item} className={i === 0 ? "active" : ""} onClick={() => toast.info(i === 0 ? "You’re on the home briefing" : `${item} is coming into focus next`)}>{item}</button>)}
        </nav>
        <div className="flex items-center gap-3"><span className="hidden md:inline-flex status-pill"><span className="status-dot" /> Demo classroom</span><button className="icon-button md:hidden" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav ? <X size={20}/> : <Menu size={20}/>}</button><button className="profile-chip" onClick={() => toast.info("Demo learner profile", { description: "Beginner · Hinglish · Focused study" })}><span>AR</span><b>Alex Rao</b><ChevronRight size={15}/></button></div>
      </div>
    </header>

    <main className="max-w-[1440px] mx-auto px-5 lg:px-10 pb-20">
      <section className="hero-grid">
        <div className="hero-copy animate-in">
          <div className="eyebrow"><span className="eyebrow-line" /> PERSONALIZED LEARNING, RE-THOUGHT</div>
          <h1>Bring a topic.<br /><em>Leave with</em><br />a clearer mind.</h1>
          <p className="hero-sub">An AI teacher that doesn’t just answer. It notices where you’re stuck, changes how it explains, and keeps the lesson moving.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById("briefing")?.scrollIntoView({ behavior: "smooth" })}>Build my lesson <ArrowRight size={17}/></button><button className="text-button" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}><Play size={14} fill="currentColor"/> See how it teaches</button></div>
          <div className="hero-proof"><div className="proof-avatars"><span>R</span><span>M</span><span>S</span><span>+</span></div><span><b>Made for the moment before “I get it.”</b><br/><small>Adaptive by design · Grounded in your material</small></span></div>
        </div>
        <div className="hero-art-wrap"><div className="hero-art"><img src="/manus-storage/eduverse-hero_323a3bff.png" alt="Abstract learning desk with a physics diagram"/><div className="art-caption"><span className="caption-index">01</span><span>THE LEARNING DESK<br/><b>A calmer place to think</b></span></div></div><div className="yellow-stamp">TEACH<br/>WITH<br/>INTENT</div></div>
      </section>

      <section id="briefing" className="briefing-section">
        <aside className="section-rail"><div className="rail-label">START HERE</div><Thread active={stageIndex} /><div className="rail-note">Your lesson adapts<br/>as you go.</div></aside>
        <div className="briefing-content">
          {stage === "setup" && <Setup level={level} setLevel={setLevel} language={language} setLanguage={setLanguage} time={time} setTime={setTime} uploaded={uploaded} setUploaded={setUploaded} startLesson={startLesson} />}
          {stage === "plan" && <Plan beginTeaching={beginTeaching} />}
          {stage === "teach" && <Teach askQuestion={askQuestion} />}
          {stage === "check" && <CheckPoint answer={answer} setAnswer={setAnswer} submitAnswer={submitAnswer} />}
          {stage === "adapt" && <Adapt continueLesson={continueLesson} />}
          {stage === "report" && <Report reset={reset} />}
        </div>
      </section>

      <section id="how" className="how-section"><div className="section-kicker">THE DIFFERENCE</div><div className="how-heading"><h2>Not a chatbot.<br/><em>A teaching loop.</em></h2><p>EduVerse turns a static answer into a responsive lesson—one that understands, explains, checks, and tries again when the first explanation doesn’t land.</p></div><div className="concept-row">{conceptCards.map((card, i) => <div className={`concept-card tone-${card.tone}`} key={card.title}><div className="concept-index">{card.label}</div><div className="concept-icon">{card.icon}</div><h3>{card.title}</h3><p>{card.note}</p><div className="concept-progress"><span className="concept-progress-fill" style={{ width: `${42 + i * 25}%` }} /></div><div className="concept-arrow">{i < 2 ? "→" : "↗"}</div></div>)}</div></section>

      <section className="grounded-section"><div><div className="dark-thread"><span className="dark-thread-node active">01</span><span className="dark-thread-line"/><span className="dark-thread-node">02</span><span className="dark-thread-line"/><span className="dark-thread-node">03</span><span className="dark-thread-caption">GROUND → TEACH → ADAPT</span></div><div className="section-kicker">BUILT FOR REAL STUDY</div><h2>Every explanation<br/><em>has somewhere to point.</em></h2><p>Upload a PDF, share a note, or start with a topic. EduVerse uses your material as its grounding source, then makes the important parts easier to see.</p><button className="outline-button" onClick={() => { setUploaded(true); toast.success("Sample material attached", { description: "Newton's Laws · 3 relevant sections found" }); }}>Attach sample material <Upload size={16}/></button></div><div className="grounded-visual"><div className="scan-card"><div className="scan-top"><FileText size={18}/><span>newton-laws-notes.pdf</span><span className="scan-check"><Check size={13}/></span></div><div className="scan-line w-[82%]"/><div className="scan-line w-[64%]"/><div className="scan-line w-[74%]"/><div className="scan-tag">GROUNDED IN <b>3 sections</b></div></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-dot"/></div></section>
    </main>
    <footer className="site-footer"><div className="max-w-[1440px] mx-auto px-5 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"><Logo/><div className="footer-copy">A prototype for <b>AI Innovation Hackathon 2026</b><br/><span>Understand → Plan → Explain → Adapt</span></div><div className="footer-right">Open-source first <span>·</span> Built to demonstrate</div></div></footer>
  </div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }
function Setup({ level, setLevel, language, setLanguage, time, setTime, uploaded, setUploaded, startLesson }: any) { return <div className="stage-panel animate-in"><div className="stage-heading"><div><div className="section-kicker">LESSON BRIEFING</div><h2>What would you like<br/><em>to understand?</em></h2></div><div className="stage-number">01 <span>/ 06</span></div></div><div className="topic-input"><div className="topic-icon"><FlaskConical size={21}/></div><div><span className="input-label">TOPIC OR MATERIAL</span><input defaultValue="Newton’s Laws of Motion" aria-label="Topic"/><small>Try “photosynthesis”, “quadratic equations”, or attach your own notes.</small></div><button className={`material-button ${uploaded ? "attached" : ""}`} onClick={() => setUploaded(!uploaded)}>{uploaded ? <Check size={17}/> : <Upload size={17}/>} {uploaded ? "Attached" : "Attach PDF"}</button></div><div className="profile-grid"><Field label="I’m learning at"><select value={level} onChange={e => setLevel(e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field><Field label="Teach me in"><select value={language} onChange={e => setLanguage(e.target.value)}><option>Hinglish</option><option>English</option><option>Hindi</option><option>Nepali</option></select></Field><Field label="I have"><select value={time} onChange={e => setTime(e.target.value)}><option>5 minutes</option><option>20 minutes</option><option>60 minutes</option><option>Multiple days</option></select></Field></div><div className="goal-row"><Target size={17}/><span>Learning goal</span><button onClick={() => toast.info("Goal selected", { description: "Build a working intuition, then test it." })}>Build intuition, then test it <ChevronRight size={16}/></button></div><button className="start-button" onClick={startLesson}>Start the lesson <ArrowRight size={18}/></button><p className="privacy-note"><Zap size={13}/> Demo mode is fully local and works without paid APIs.</p></div> }
function Plan({ beginTeaching }: { beginTeaching: () => void }) { return <div className="stage-panel animate-in"><div className="stage-heading"><div><div className="section-kicker">YOUR LESSON PLAN</div><h2>Five minutes.<br/><em>One clear idea.</em></h2></div><div className="stage-number">02 <span>/ 06</span></div></div><div className="plan-banner"><div className="plan-icon"><Sparkles size={20}/></div><div><b>Newton’s Laws of Motion</b><p>Beginner · Hinglish · Focused study</p></div><span className="plan-time"><Clock3 size={15}/> 5 min</span></div><div className="plan-list">{["Set the scene: motion is a change in position", "Meet force, mass, and acceleration", "Use a simple push-and-pull analogy", "Check the relationship with one question"].map((item, i) => <div className="plan-step" key={item}><span>{String(i + 1).padStart(2, "0")}</span><p>{item}</p><Check size={16}/></div>)}</div><button className="start-button" onClick={beginTeaching}>Enter the classroom <ArrowRight size={18}/></button></div> }
function Teach({ askQuestion }: { askQuestion: () => void }) { return <div className="stage-panel animate-in"><div className="stage-heading"><div><div className="section-kicker">LIVE TEACHING · 03</div><h2>Let’s make it<br/><em>feel obvious.</em></h2></div><div className="stage-number">03 <span>/ 06</span></div></div><div className="lesson-layout"><div className="teacher-card"><div className="teacher-portrait"><div className="portrait-halo"/><div className="portrait-face">◌</div><div className="teacher-name"><span className="live-dot"/> Mira is teaching</div></div><div className="voice-bar"><button className="voice-play"><Volume2 size={16}/></button><div className="voice-wave">{Array.from({ length: 21 }).map((_, i) => <i key={i} style={{ height: `${8 + ((i * 13) % 18)}px` }}/>)}</div><span>0:42</span></div></div><div className="explanation"><div className="evidence-label">THE SHORT VERSION</div><p>Imagine pushing an empty shopping cart. It moves easily. Add bags, and you need a bigger push to get the same movement.</p><div className="equation">F = m × a</div><small>Force changes with mass and acceleration.</small></div></div><button className="question-button" onClick={askQuestion}>Pause for a question <CircleHelp size={17}/></button></div> }
function CheckPoint({ answer, setAnswer, submitAnswer }: any) { return <div className="stage-panel animate-in"><div className="stage-heading"><div><div className="section-kicker">YOUR TURN · 04</div><h2>Show me what<br/><em>you noticed.</em></h2></div><div className="stage-number">04 <span>/ 06</span></div></div><div className="question-card"><div className="question-meta"><span className="sun-dot"/> CONCEPT CHECK <span>·</span> ONE QUESTION</div><h3>If resistance increases while voltage stays constant, what happens to current?</h3><div className="hint-row"><Lightbulb size={15}/> Think about the relationship <b>I = V / R</b></div><textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Explain it in your own words…" rows={3}/><button className="start-button" onClick={submitAnswer}>Check my thinking <ArrowRight size={18}/></button></div></div> }
function Adapt({ continueLesson }: { continueLesson: () => void }) { return <div className="stage-panel animate-in"><div className="stage-heading"><div><div className="section-kicker coral-kicker">A USEFUL DETOUR · 05</div><h2>You’re close.<br/><em>Let’s turn it around.</em></h2></div><div className="stage-number">05 <span>/ 06</span></div></div><div className="misconception-card"><div className="misconception-top"><div className="coral-icon"><RotateCcw size={20}/></div><div><b>We found a misconception</b><p>You connected current with resistance in the same direction.</p></div></div><div className="analogy"><span>NEW ANALOGY</span><p>Think of current like water through a pipe. If the pipe gets narrower, less water gets through—even if the pressure stays the same.</p></div><div className="recheck"><MessageCircle size={16}/><span>Re-explaining with a concrete analogy</span><span className="recheck-time">0:38 added</span></div></div><div className="feedback-quote">“The important relationship is <b>I = V/R</b>. Since voltage stays constant, increasing resistance actually decreases current.”</div><button className="start-button" onClick={continueLesson}>Try one more <ArrowRight size={18}/></button></div> }
function Report({ reset }: { reset: () => void }) { return <div className="stage-panel animate-in"><div className="stage-heading"><div><div className="section-kicker">LEARNING REPORT · 06</div><h2>That’s a lesson<br/><em>worth keeping.</em></h2></div><div className="stage-number">06 <span>/ 06</span></div></div><div className="report-grid"><div className="score-card"><span>SESSION SCORE</span><strong>80<small>%</small></strong><div className="score-bar"><i/></div><p>Strong start. You corrected the relationship after one reframe.</p></div><div className="report-details"><div><span className="report-label">STRONG AREAS</span><b>Force · Newton’s First Law</b></div><div><span className="report-label coral-kicker">KEEP AN EYE ON</span><b>Force, mass & acceleration</b></div><div><span className="report-label">NEXT RECOMMENDED</span><b>Momentum <ChevronRight size={15}/></b></div></div></div><div className="report-footer"><span><Check size={16}/> Learner profile updated</span><button className="outline-button" onClick={reset}>Start another lesson <RotateCcw size={15}/></button></div></div> }
