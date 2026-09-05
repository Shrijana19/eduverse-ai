// Solar Learning Lab / Premium 3D AI Teacher Experience
// This page keeps the teacher as the center of attention: immersive stage, cinematic lighting,
// expressive state changes, teacher-to-board interaction, and an adaptive question loop.
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  CircleHelp,
  Heart,
  Lightbulb,
  MessageCircle,
  Mic2,
  Pause,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { toast } from "sonner";

type LessonState = "welcome" | "formula" | "cart" | "question" | "correct" | "incorrect";

const stateCopy: Record<LessonState, { eyebrow: string; title: string; body: string }> = {
  welcome: { eyebrow: "WARM-UP · 01", title: "Let’s make force feel obvious.", body: "Hi, I’m Mira. We’re going to turn Newton’s Second Law into something you can see, test, and remember." },
  formula: { eyebrow: "EXPLAINING · 02", title: "Force, mass, and motion.", body: "When we push harder, acceleration increases. When an object gets heavier, that same push has more work to do." },
  cart: { eyebrow: "DEMONSTRATION · 03", title: "Imagine a shopping cart.", body: "An empty cart responds quickly. Add heavy bags and you need a bigger push to create the same acceleration." },
  question: { eyebrow: "YOUR TURN · 04", title: "What happens next?", body: "If the force stays the same but the mass doubles, what happens to acceleration? Take a moment to think." },
  correct: { eyebrow: "NICE WORK · 05", title: "Exactly. You got it.", body: "Acceleration decreases because the same force is now spread across twice the mass. That is the relationship we wanted to notice." },
  incorrect: { eyebrow: "LET’S REFRAME · 05", title: "Not quite — let’s look again.", body: "Think of pushing an empty cart versus a loaded cart. The same push creates less acceleration when the cart has more mass." },
};

function Logo() {
  return <div className="teacher-brand"><div className="teacher-brand-mark"><span className="book-arc arc-left" /><span className="book-arc arc-right" /><i /></div><div><strong>EduVerse</strong><small>AI TEACHER LAB</small></div></div>;
}

function ProgressRail({ state }: { state: LessonState }) {
  const active = state === "welcome" ? 0 : state === "formula" ? 1 : state === "cart" ? 2 : state === "question" ? 3 : 4;
  return <div className="teacher-rail"><div className="rail-caption">LIVE LESSON</div>{["Welcome", "F = ma", "Cart analogy", "Your turn", "Adapt"].map((item, i) => <div className={`rail-step ${i <= active ? "active" : ""} ${i === active ? "current" : ""}`} key={item}><span>{i < active ? <Check size={12} /> : String(i + 1).padStart(2, "0")}</span>{item}</div>)}</div>;
}

function Board({ state }: { state: LessonState }) {
  const cartLoaded = state === "cart" || state === "question" || state === "correct" || state === "incorrect";
  return <div className="lesson-board" aria-label="Interactive Newton's Second Law board">
    <div className="board-top"><span className="board-live" /><span>INTERACTIVE BOARD</span><span className="board-status">MIRA IS PRESENTING</span></div>
    <div className="board-title">Newton’s Second Law</div>
    <div className="board-equation"><span>F</span><i>=</i><span>m</span><i>×</i><span>a</span></div>
    <div className="board-labels"><span className="force">FORCE</span><span className="mass">MASS</span><span className="accel">ACCELERATION</span></div>
    <div className={`cart-scene ${cartLoaded ? "loaded" : ""}`}><div className="cart-track" /><div className="cart"><div className="cart-basket">{cartLoaded && <><span /><span /><span /></>}</div><div className="cart-wheel one" /><div className="cart-wheel two" /></div><div className="push-arrow">PUSH</div></div>
    <div className="board-note">{state === "question" ? "Same force · double the mass" : state === "correct" ? "Same force → less acceleration" : state === "incorrect" ? "Let’s compare the carts" : "Watch the variables respond"}</div>
  </div>;
}

function Teacher({ state }: { state: LessonState }) {
  return <div className={`teacher-stage-character state-${state}`}><div className="teacher-aura" /><div className="teacher-shadow" /><div className="teacher-image-wrap"><img src="/manus-storage/eduverse-female-teacher_1cd1ee2c.png" alt="Mira, the EduVerse AI teacher" /></div><div className="gesture-orb"><Sparkles size={14} /></div><div className="teacher-badge"><span className="badge-live" /> Mira · AI Teacher</div></div>;
}

export default function Home() {
  const [state, setState] = useState<LessonState>("welcome");
  const [answer, setAnswer] = useState("");
  const [playing, setPlaying] = useState(true);
  const copy = stateCopy[state];
  const progress = useMemo(() => ({ welcome: 16, formula: 34, cart: 52, question: 70, correct: 88, incorrect: 88 }[state]), [state]);

  const advance = () => {
    const next: Record<LessonState, LessonState> = { welcome: "formula", formula: "cart", cart: "question", question: "question", correct: "formula", incorrect: "question" };
    setState(next[state]);
  };
  const submitAnswer = () => {
    if (!answer.trim()) { toast.error("Give Mira a quick answer first"); return; }
    const looksCorrect = /decreas|half|less|lower/i.test(answer);
    setState(looksCorrect ? "correct" : "incorrect");
    setAnswer("");
  };
  const reset = () => { setState("welcome"); setAnswer(""); setPlaying(true); };

  return <div className="teacher-lab-shell">
    <header className="teacher-topbar"><Logo /><div className="topbar-center"><span className="signal-dot" /> ADAPTIVE TEACHING SESSION <span className="topbar-divider" /> NEWTON’S SECOND LAW <span className="learning-tag">UNDERSTAND → EXPLAIN → ADAPT</span></div><div className="topbar-actions"><button className="top-icon" onClick={() => toast.info("Teacher voice is active in demo mode")} aria-label="Voice settings"><Volume2 size={17} /></button><button className="exit-button" onClick={() => toast.info("The lesson stays saved in this prototype")}>Exit lesson <X size={15} /></button></div></header>
    <main className="teacher-lab-main">
      <aside className="teacher-sidebar"><ProgressRail state={state} /><div className="sidebar-quote"><Heart size={16} /><p>“A good explanation changes when the learner needs something different.”</p><small>— Mira’s teaching principle</small></div><div className="sidebar-footer"><div className="learner-orb">AR</div><div><strong>Alex Rao</strong><small>Beginner learner</small></div></div></aside>
      <section className="teacher-content">
        <div className="lesson-header"><div><span className="lesson-eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.body}</p></div><div className="lesson-timer"><span>SESSION</span><strong>04:20</strong><small>of 05:00</small></div></div>
        <div className="lesson-stage">
          <div className="stage-lights" /><div className="teacher-floor-grid" /><Teacher state={state} /><Board state={state} /><div className="stage-caption"><span className="caption-line" /> <span>{state === "question" ? "Mira is waiting for your reasoning" : "Teacher-to-visual interaction active"}</span></div>
        </div>
        <div className="lesson-controls"><button className="control-play" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause lesson" : "Play lesson"}>{playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}</button><div className="control-progress"><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="control-meta"><span>{playing ? "Mira is teaching" : "Lesson paused"}</span><span>{progress}% complete</span></div></div><button className="control-voice" onClick={() => toast.info("Mira’s explanation is playing")}><Mic2 size={16} /> Voice on</button></div>
        {state === "question" ? <div className="answer-panel"><div className="answer-prompt"><div className="prompt-icon"><CircleHelp size={18} /></div><div><strong>Your turn</strong><p>If the force stays the same but mass doubles, what happens to acceleration?</p></div></div><div className="answer-input"><input value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && submitAnswer()} placeholder="Explain it in your own words…" /><button onClick={submitAnswer}><Send size={16} /> Send answer</button></div><div className="answer-hint"><Lightbulb size={14} /> Hint: think about how the equation divides force by mass.</div></div> : <div className="teaching-actions"><div className="next-note"><Brain size={17} /><span>{state === "correct" ? "Understanding confirmed — Mira is ready to continue." : state === "incorrect" ? "Mira changed the analogy to meet you where you are." : "The lesson adapts as your understanding becomes visible."}</span></div><div className="action-row"><button className="secondary-action" onClick={reset}><RotateCcw size={15} /> Restart</button>{state === "correct" || state === "incorrect" ? <button className="primary-action" onClick={advance}>Continue teaching <ArrowRight size={16} /></button> : <button className="primary-action" onClick={advance}>{state === "cart" ? "Ask me a question" : "Continue explanation"} <ArrowRight size={16} /></button>}</div></div>}
      </section>
    </main>
    <footer className="teacher-footer"><span>EDUVERSE AI TEACHER LAB</span><span>·</span><span>Grounded · Adaptive · Human-centered</span><span className="footer-right">Demo experience <span className="signal-dot" /></span></footer>
  </div>;
}
