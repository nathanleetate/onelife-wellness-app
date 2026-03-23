import { useState, useEffect, useRef } from "react";

const COLORS = {
  forest: "#2D5016",
  sage: "#6B8F47",
  moss: "#4A7C2F",
  cream: "#F8F4EE",
  warm: "#EDE8DF",
  bark: "#8B6F4E",
  clay: "#C4956A",
  charcoal: "#2C2C2C",
  mist: "#D4E4C8",
  deepGreen: "#1A3A0A",
  softWhite: "#FDFAF6",
  accent: "#C17A3C",
};

const FOCUS_AREAS = [
  { id: "anxiety", label: "Anxiety & Worry", emoji: "🌬️", color: "#6B8F47" },
  { id: "depression", label: "Depression & Mood", emoji: "🌤️", color: "#8B6F4E" },
  { id: "trauma", label: "Trauma & Healing", emoji: "🌱", color: "#4A7C2F" },
  { id: "relationships", label: "Relationships & Family", emoji: "🤝", color: "#C4956A" },
  { id: "stress", label: "Stress & Burnout", emoji: "⚖️", color: "#2D5016" },
  { id: "grief", label: "Grief & Loss", emoji: "🕊️", color: "#6B7B8F" },
];

const TOOLS = {
  anxiety: [
    {
      id: "box-breathing",
      type: "exercise",
      title: "Box Breathing",
      subtitle: "4-4-4-4 Regulation Technique",
      description: "Activates your parasympathetic nervous system to calm the stress response. Used by therapists, first responders, and athletes.",
      duration: "3–5 min",
      tag: "CBT-Based",
      icon: "🫁",
    },
    {
      id: "54321",
      type: "exercise",
      title: "5-4-3-2-1 Grounding",
      subtitle: "Sensory Anchoring Exercise",
      description: "Interrupt anxiety spirals by engaging all five senses. Clinically proven to reduce acute anxiety and panic symptoms.",
      duration: "2–3 min",
      tag: "DBT-Based",
      icon: "🖐️",
    },
    {
      id: "thought-record",
      type: "tool",
      title: "Thought Record",
      subtitle: "Cognitive Restructuring",
      description: "Identify and challenge unhelpful thinking patterns — a cornerstone of Cognitive Behavioral Therapy (CBT).",
      duration: "5–10 min",
      tag: "CBT Core",
      icon: "📝",
    },
    {
      id: "worry-time",
      type: "tool",
      title: "Scheduled Worry Time",
      subtitle: "Cognitive Containment",
      description: "Rather than suppressing worries, contain them to a specific window. Research shows this reduces overall anxiety.",
      duration: "10–15 min/day",
      tag: "CBT-Based",
      icon: "⏰",
    },
  ],
  depression: [
    {
      id: "behavioral-activation",
      type: "tool",
      title: "Behavioral Activation",
      subtitle: "Activity Scheduling",
      description: "Break the depression-inactivity cycle by intentionally scheduling small, meaningful activities. One of the most evidence-based depression interventions.",
      duration: "10 min",
      tag: "CBT Core",
      icon: "📅",
    },
    {
      id: "values-reflection",
      type: "tool",
      title: "Values Reflection",
      subtitle: "ACT-Based Journaling",
      description: "Reconnect with what matters most to you. Acceptance & Commitment Therapy (ACT) uses values clarification to restore motivation.",
      duration: "10–15 min",
      tag: "ACT-Based",
      icon: "🧭",
    },
    {
      id: "gratitude",
      type: "exercise",
      title: "Three Good Things",
      subtitle: "Positive Psychology Practice",
      description: "Write three specific good things from today — no matter how small. Martin Seligman's research shows this significantly reduces depressive symptoms.",
      duration: "5 min",
      tag: "Evidence-Based",
      icon: "✨",
    },
    {
      id: "self-compassion",
      type: "exercise",
      title: "Self-Compassion Break",
      subtitle: "Kristin Neff Protocol",
      description: "When suffering arises, offer yourself the same care you'd give a close friend. Research shows self-compassion dramatically reduces depression and shame.",
      duration: "5 min",
      tag: "CFT-Based",
      icon: "💚",
    },
  ],
  trauma: [
    {
      id: "safe-place",
      type: "exercise",
      title: "Safe Place Visualization",
      subtitle: "EMDR Resource Installation",
      description: "Create and strengthen an internal resource — a mental sanctuary you can return to when triggered. Used in EMDR and trauma-focused therapies.",
      duration: "5–8 min",
      tag: "EMDR-Based",
      icon: "🏡",
    },
    {
      id: "window-of-tolerance",
      type: "tool",
      title: "Window of Tolerance Check",
      subtitle: "Nervous System Awareness",
      description: "Assess whether you're in hyper- or hypo-arousal, and use targeted skills to return to your optimal zone of functioning.",
      duration: "5 min",
      tag: "Somatic",
      icon: "🌡️",
    },
    {
      id: "tapping",
      type: "exercise",
      title: "Butterfly Hug Tapping",
      subtitle: "Bilateral Stimulation",
      description: "A simple self-administered bilateral stimulation technique proven to reduce trauma symptoms and emotional distress.",
      duration: "3–5 min",
      tag: "EMDR-Based",
      icon: "🦋",
    },
    {
      id: "body-scan",
      type: "exercise",
      title: "Gentle Body Scan",
      subtitle: "Somatic Awareness",
      description: "Slowly bring attention through the body to release stored tension. Adapted from somatic therapy and mindfulness-based stress reduction (MBSR).",
      duration: "8–10 min",
      tag: "MBSR-Based",
      icon: "🧘",
    },
  ],
  relationships: [
    {
      id: "i-statements",
      type: "tool",
      title: "I-Statement Builder",
      subtitle: "Nonviolent Communication",
      description: "Transform reactive communication into connection. Marshall Rosenberg's NVC framework reduces conflict and builds empathy.",
      duration: "5–10 min",
      tag: "NVC-Based",
      icon: "💬",
    },
    {
      id: "gottman-repair",
      type: "tool",
      title: "Repair Attempt Toolkit",
      subtitle: "Gottman Method",
      description: "Use evidence-based phrases to de-escalate conflict and reconnect. Based on Dr. John Gottman's 40+ years of relationship research.",
      duration: "5 min",
      tag: "Gottman Method",
      icon: "🔧",
    },
    {
      id: "active-listening",
      type: "exercise",
      title: "Active Listening Practice",
      subtitle: "Reflective Listening Guide",
      description: "Structured practice for listening to understand — not just to respond. A fundamental skill for all healthy relationships.",
      duration: "10–15 min",
      tag: "EFT-Based",
      icon: "👂",
    },
    {
      id: "family-meeting",
      type: "tool",
      title: "Family Meeting Template",
      subtitle: "Structured Communication",
      description: "A guided format for regular family check-ins that builds connection, addresses problems, and creates shared routines.",
      duration: "20–30 min",
      tag: "Structural",
      icon: "🏠",
    },
  ],
  stress: [
    {
      id: "stress-inventory",
      type: "tool",
      title: "Stress Inventory",
      subtitle: "Identify Your Sources",
      description: "Map your stressors across life domains — work, relationships, health, finances — and identify where your energy is going.",
      duration: "10 min",
      tag: "CBT-Based",
      icon: "🗺️",
    },
    {
      id: "progressive-relaxation",
      type: "exercise",
      title: "Progressive Muscle Relaxation",
      subtitle: "PMR Technique",
      description: "Systematically tense and release muscle groups to release physical stress. One of the most studied relaxation interventions.",
      duration: "10–15 min",
      tag: "Evidence-Based",
      icon: "💪",
    },
    {
      id: "energy-audit",
      type: "tool",
      title: "Energy Audit",
      subtitle: "Restore vs. Drain Analysis",
      description: "Identify which people, activities, and habits restore vs. deplete your energy — and make intentional choices.",
      duration: "10 min",
      tag: "Coaching-Based",
      icon: "🔋",
    },
    {
      id: "diaphragmatic",
      type: "exercise",
      title: "Diaphragmatic Breathing",
      subtitle: "Belly Breathing for Calm",
      description: "Slow, deep breathing that activates the vagus nerve and lowers cortisol. The single most accessible stress reduction tool.",
      duration: "3–5 min",
      tag: "Somatic",
      icon: "🌊",
    },
  ],
  grief: [
    {
      id: "continuing-bonds",
      type: "tool",
      title: "Continuing Bonds Letter",
      subtitle: "Narrative Grief Therapy",
      description: "Write a letter to your loved one or lost relationship. Modern grief research shows maintaining bonds (not 'letting go') supports healthy mourning.",
      duration: "15–20 min",
      tag: "Narrative Therapy",
      icon: "✉️",
    },
    {
      id: "dual-process",
      type: "tool",
      title: "Dual Process Check-In",
      subtitle: "Oscillation Model",
      description: "Grief involves both loss-oriented and restoration-oriented coping. This check-in helps you honor both and avoid getting stuck.",
      duration: "5–10 min",
      tag: "Evidence-Based",
      icon: "⚖️",
    },
    {
      id: "memory-box",
      type: "exercise",
      title: "Memory & Meaning Exercise",
      subtitle: "Legacy Work",
      description: "Explore the gifts, lessons, and meaning your loss has brought to your life — without minimizing the pain.",
      duration: "15 min",
      tag: "ACT-Based",
      icon: "🕯️",
    },
    {
      id: "grief-waves",
      type: "exercise",
      title: "Riding the Grief Wave",
      subtitle: "Somatic Tolerance",
      description: "Rather than avoiding grief waves, learn to observe and move through them. Based on mindfulness-based grief interventions.",
      duration: "5–8 min",
      tag: "MBSR-Based",
      icon: "🌊",
    },
  ],
};

const CRISIS = [
  { name: "988 Suicide & Crisis Lifeline", contact: "Call or Text 988", color: "#C4443A" },
  { name: "Crisis Text Line", contact: "Text HOME to 741741", color: "#C4443A" },
  { name: "One|Life Wellness", contact: "864.505.9198", color: "#2D5016" },
];

// ── Box Breathing Interactive Component ──
function BoxBreathing({ onClose }) {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const phases = ["Inhale", "Hold", "Exhale", "Hold"];
  const phaseIdx = useRef(0);

  const startBreathing = () => {
    setRunning(true);
    setPhase("Inhale");
    setCount(4);
    phaseIdx.current = 0;
  };

  useEffect(() => {
    if (!running) return;
    if (count > 1) {
      timerRef.current = setTimeout(() => setCount(c => c - 1), 1000);
    } else {
      timerRef.current = setTimeout(() => {
        phaseIdx.current = (phaseIdx.current + 1) % 4;
        if (phaseIdx.current === 0) setCycle(c => c + 1);
        setPhase(phases[phaseIdx.current]);
        setCount(4);
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [running, count]);

  const stop = () => { setRunning(false); setPhase("ready"); setCount(4); setCycle(0); clearTimeout(timerRef.current); };

  const phaseColors = { Inhale: "#6B8F47", Hold: "#C4956A", Exhale: "#2D5016" };
  const ringSize = phase === "Inhale" ? 140 : phase === "Exhale" ? 80 : 110;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,40,10,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: COLORS.softWhite, borderRadius: 24, padding: "40px 32px", maxWidth: 380, width: "90%", textAlign: "center", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: COLORS.charcoal }}>×</button>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: COLORS.forest, marginBottom: 4 }}>Box Breathing</div>
        <div style={{ fontSize: 13, color: COLORS.bark, marginBottom: 32 }}>4 · 4 · 4 · 4 Technique</div>

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: 180, marginBottom: 28 }}>
          <div style={{
            width: ringSize, height: ringSize,
            borderRadius: "50%",
            background: running ? `${phaseColors[phase]}22` : `${COLORS.mist}`,
            border: `3px solid ${running ? phaseColors[phase] : COLORS.sage}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
            transition: "all 1s ease",
          }}>
            {running ? (
              <>
                <div style={{ fontSize: 28, fontWeight: 700, color: phaseColors[phase] }}>{count}</div>
                <div style={{ fontSize: 13, color: phaseColors[phase], fontWeight: 600 }}>{phase}</div>
              </>
            ) : (
              <div style={{ fontSize: 13, color: COLORS.sage }}>Ready</div>
            )}
          </div>
        </div>

        {cycle > 0 && <div style={{ fontSize: 13, color: COLORS.moss, marginBottom: 16 }}>Cycles completed: {cycle}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 28 }}>
          {phases.map((p, i) => (
            <div key={p + i} style={{ background: running && phase === p ? `${phaseColors[p]}22` : COLORS.warm, border: `1px solid ${running && phase === p ? phaseColors[p] : COLORS.mist}`, borderRadius: 8, padding: "8px 4px", fontSize: 11, color: running && phase === p ? phaseColors[p] : COLORS.bark, fontWeight: running && phase === p ? 700 : 400, textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>4</div>
              {p}
            </div>
          ))}
        </div>

        {!running ? (
          <button onClick={startBreathing} style={{ background: COLORS.forest, color: "white", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", width: "100%" }}>
            Begin
          </button>
        ) : (
          <button onClick={stop} style={{ background: "none", color: COLORS.bark, border: `1px solid ${COLORS.mist}`, borderRadius: 12, padding: "12px 32px", fontSize: 14, cursor: "pointer", width: "100%" }}>
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

// ── 5-4-3-2-1 Grounding Component ──
function Grounding({ onClose }) {
  const steps = [
    { n: 5, sense: "See", prompt: "Name 5 things you can see right now", icon: "👁️" },
    { n: 4, sense: "Touch", prompt: "Name 4 things you can physically feel", icon: "🤚" },
    { n: 3, sense: "Hear", prompt: "Name 3 things you can hear right now", icon: "👂" },
    { n: 2, sense: "Smell", prompt: "Name 2 things you can smell (or like to smell)", icon: "👃" },
    { n: 1, sense: "Taste", prompt: "Name 1 thing you can taste right now", icon: "👅" },
  ];
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState(steps.map(s => Array(s.n).fill("")));
  const [done, setDone] = useState(false);

  const updateInput = (stepIdx, itemIdx, val) => {
    setInputs(prev => prev.map((arr, si) => si === stepIdx ? arr.map((v, ii) => ii === itemIdx ? val : v) : arr));
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,40,10,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div style={{ background: COLORS.softWhite, borderRadius: 24, padding: "36px 28px", maxWidth: 420, width: "100%", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>×</button>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: COLORS.forest, marginBottom: 4 }}>5-4-3-2-1 Grounding</div>
        <div style={{ fontSize: 13, color: COLORS.bark, marginBottom: 28 }}>Sensory anchoring to return to the present moment</div>

        {!done ? (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
              {steps.map((s, i) => (
                <div key={i} onClick={() => setStep(i)} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? COLORS.forest : COLORS.mist, cursor: "pointer", transition: "background 0.3s" }} />
              ))}
            </div>

            <div style={{ background: COLORS.warm, borderRadius: 16, padding: "20px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{steps[step].icon}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.forest, marginBottom: 4 }}>{steps[step].n}</div>
              <div style={{ fontSize: 15, color: COLORS.charcoal, fontWeight: 600 }}>{steps[step].prompt}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {inputs[step].map((val, i) => (
                <input key={i} value={val} onChange={e => updateInput(step, i, e.target.value)}
                  placeholder={`${steps[step].sense} #${i + 1}...`}
                  style={{ padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.mist}`, fontSize: 14, outline: "none", background: "white", color: COLORS.charcoal }} />
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, background: "none", border: `1.5px solid ${COLORS.mist}`, borderRadius: 10, padding: 12, cursor: "pointer", color: COLORS.bark, fontSize: 14 }}>Back</button>}
              <button onClick={() => step < 4 ? setStep(s => s + 1) : setDone(true)}
                style={{ flex: 2, background: COLORS.forest, color: "white", border: "none", borderRadius: 10, padding: 12, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                {step < 4 ? "Next Sense →" : "Complete ✓"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: COLORS.forest, marginBottom: 12 }}>Well done.</div>
            <div style={{ fontSize: 14, color: COLORS.bark, lineHeight: 1.6, marginBottom: 28 }}>You've completed the grounding exercise. Notice how you feel now compared to when you started.</div>
            <button onClick={onClose} style={{ background: COLORS.forest, color: "white", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 14, cursor: "pointer" }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tool Detail Modal ──
function ToolModal({ tool, onClose }) {
  const [activeEx, setActiveEx] = useState(null);

  if (activeEx === "box-breathing") return <BoxBreathing onClose={() => setActiveEx(null)} />;
  if (activeEx === "54321") return <Grounding onClose={() => setActiveEx(null)} />;

  const isInteractive = tool.id === "box-breathing" || tool.id === "54321";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,40,10,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
      <div style={{ background: COLORS.softWhite, borderRadius: 24, padding: "36px 32px", maxWidth: 480, width: "100%", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>×</button>

        <div style={{ fontSize: 40, marginBottom: 12 }}>{tool.icon}</div>
        <div style={{ display: "inline-block", background: `${COLORS.moss}22`, color: COLORS.moss, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5, marginBottom: 12 }}>{tool.tag}</div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: COLORS.forest, lineHeight: 1.3, marginBottom: 6 }}>{tool.title}</div>
        <div style={{ fontSize: 14, color: COLORS.clay, fontWeight: 600, marginBottom: 16 }}>{tool.subtitle}</div>
        <div style={{ fontSize: 15, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: 24 }}>{tool.description}</div>

        <div style={{ background: COLORS.warm, borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>⏱️</span>
          <span style={{ fontSize: 13, color: COLORS.bark }}><strong>Time needed:</strong> {tool.duration}</span>
        </div>

        <div style={{ background: COLORS.mist + "55", borderRadius: 12, padding: "16px 16px", marginBottom: 28, fontSize: 14, color: COLORS.forest, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>How to use between sessions:</div>
          {tool.id === "box-breathing" && <p>Practice once in the morning and again when you notice anxiety rising. Your therapist may review your progress in your next session.</p>}
          {tool.id === "54321" && <p>Use when you feel overwhelmed, dissociated, or flooded with emotion. It works quickly and can be done anywhere.</p>}
          {tool.id === "thought-record" && <><p>When you notice a strong negative emotion, pause and ask: <em>What thought just went through my mind?</em> Write it down along with the evidence for and against it. Bring your completed records to session.</p></>}
          {tool.id === "behavioral-activation" && <p>Schedule 1–3 small activities this week that connect to your values. Focus on engagement, not enjoyment — action comes before motivation in depression.</p>}
          {tool.id === "values-reflection" && <p>Spend 10 minutes journaling on: "What kind of person do I want to be?" and "What matters most to me right now?" Share insights with your therapist.</p>}
          {tool.id === "gratitude" && <p>Each night before bed, write three specific things that went well today. Be as detailed as possible — specificity matters more than scale.</p>}
          {tool.id === "self-compassion" && <p>When you're struggling, place your hands on your heart and say: "This is a moment of suffering. Suffering is part of life. May I be kind to myself." Repeat 3 times.</p>}
          {tool.id === "safe-place" && <p>Visualize a real or imaginary place where you feel completely safe. Notice the sights, sounds, smells. Install the image by tapping alternately on your knees 6–8 times while holding the image. Practice daily.</p>}
          {tool.id === "window-of-tolerance" && <p>Rate yourself: Am I in hyper-arousal (panic, rage, overwhelm) or hypo-arousal (numb, checked out, frozen)? Then use movement for hypo, or breathing for hyper, to return to your window.</p>}
          {tool.id === "tapping" && <p>Cross your arms over your chest, hands touching your shoulders. Alternately tap left-right, left-right, while breathing slowly. Think of something calming. Use for 2–5 minutes when activated.</p>}
          {tool.id === "body-scan" && <p>Lie down or sit comfortably. Slowly bring awareness from your feet to the top of your head, noticing without judgment. If tension arises, breathe into it. Don't try to change anything — just notice.</p>}
          {tool.id === "i-statements" && <p>Format: "I feel [emotion] when [behavior] because [need/value]. I would like [request]." Practice this before a difficult conversation. Bring examples to your next session.</p>}
          {tool.id === "gottman-repair" && <p>Repair phrases include: "I'm sorry, I need to slow down." / "I hear what you're saying." / "Can we take a break and come back to this?" Use freely during conflict — it takes courage, but it works.</p>}
          {tool.id === "active-listening" && <p>After your partner speaks, reflect back: "What I hear you saying is..." Don't problem-solve. Just reflect and ask: "Did I get that right?" Practice for 10 minutes 3x this week.</p>}
          {tool.id === "family-meeting" && <p>Hold weekly: (1) Appreciation round — each person shares one thing they appreciate about each family member. (2) Problem-solving — one issue per meeting. (3) Planning — schedule something fun together.</p>}
          {tool.id === "stress-inventory" && <p>List every stressor in your life right now across 5 domains: work, relationships, health, finances, environment. Rate each 1–10. Identify which are controllable vs. uncontrollable. Focus energy on the former.</p>}
          {tool.id === "progressive-relaxation" && <p>Starting with your feet, tense each muscle group for 5 seconds, then release for 30 seconds. Work your way up to your face. Notice the contrast between tension and release.</p>}
          {tool.id === "energy-audit" && <p>Make two lists: "Things that restore me" and "Things that drain me." Look at your past week — which list dominated? Make one small change to tip the balance toward restoration.</p>}
          {tool.id === "diaphragmatic" && <p>Place one hand on your chest, one on your belly. Breathe so that only your belly rises. Inhale for 4 counts, exhale for 6. Longer exhales activate the calming response.</p>}
          {tool.id === "continuing-bonds" && <p>Write as if your loved one can read it. Share memories, what you miss, what you wish you'd said, and what you carry forward. You don't have to say goodbye — just talk.</p>}
          {tool.id === "dual-process" && <p>Today, which are you doing more of — focusing on the loss, or focusing on rebuilding? Both are healthy and necessary. If you're stuck in only one, gently invite the other in.</p>}
          {tool.id === "memory-box" && <p>Write about: What this person/relationship taught you. A quality of theirs you now carry. How this loss has changed what you value. This is meaning-making, not moving on.</p>}
          {tool.id === "grief-waves" && <p>When a wave hits, instead of running, sit down. Breathe. Say: "This is grief. It will peak and pass." Observe it like a wave — it rises, crests, and falls. You don't have to do anything but stay present.</p>}
          {!["box-breathing","54321","thought-record","behavioral-activation","values-reflection","gratitude","self-compassion","safe-place","window-of-tolerance","tapping","body-scan","i-statements","gottman-repair","active-listening","family-meeting","stress-inventory","progressive-relaxation","energy-audit","diaphragmatic","continuing-bonds","dual-process","memory-box","grief-waves"].includes(tool.id) && <p>Use this tool between sessions as directed by your One|Life therapist. Bring any notes or reflections to your next appointment.</p>}
        </div>

        {isInteractive ? (
          <button onClick={() => setActiveEx(tool.id)} style={{ background: COLORS.forest, color: "white", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%" }}>
            Start Interactive Exercise →
          </button>
        ) : (
          <button onClick={onClose} style={{ background: COLORS.forest, color: "white", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", width: "100%" }}>
            Got It — I'll Try This
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main App ──
export default function OneLifeApp() {
  const [screen, setScreen] = useState("onboard"); // onboard | home | tools | crisis
  const [focusAreas, setFocusAreas] = useState([]);
  const [name, setName] = useState("");
  const [activeTool, setActiveTool] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const toggleFocus = (id) => {
    setFocusAreas(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const allTools = focusAreas.flatMap(f => (TOOLS[f] || []).map(t => ({ ...t, focusArea: f })));

  const tabs = focusAreas.map(id => FOCUS_AREAS.find(f => f.id === id)).filter(Boolean);

  const displayedTools = activeTab ? (TOOLS[activeTab] || []) : allTools;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: COLORS.cream, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #c4d4b0; border-radius: 4px; }
        input:focus { border-color: #2D5016 !important; box-shadow: 0 0 0 3px rgba(45,80,22,0.1); }
      `}</style>

      {activeTool && <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />}

      {/* ── ONBOARDING ── */}
      {screen === "onboard" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ background: `linear-gradient(160deg, ${COLORS.forest} 0%, ${COLORS.moss} 60%, ${COLORS.sage} 100%)`, padding: "56px 28px 44px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", bottom: -20, left: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <img src="https://onelifeservices.org/images/logo.png" alt="One|Life" style={{ height: 40, marginBottom: 24, filter: "brightness(0) invert(1)", opacity: 0.9 }} onError={e => e.target.style.display = "none"} />
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 700, color: "white", lineHeight: 1.25, marginBottom: 10 }}>
              Your Between-Session<br />Wellness Companion
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
              Evidence-based tools curated by your One|Life therapist — available whenever you need them.
            </div>
          </div>

          <div style={{ flex: 1, padding: "32px 24px 40px" }}>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.forest, display: "block", marginBottom: 8, letterSpacing: 0.3 }}>YOUR FIRST NAME</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name..."
                style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${COLORS.mist}`, fontSize: 15, outline: "none", background: "white", color: COLORS.charcoal, transition: "border 0.2s" }} />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.forest, display: "block", marginBottom: 6, letterSpacing: 0.3 }}>SELECT YOUR FOCUS AREAS</label>
              <div style={{ fontSize: 12, color: COLORS.bark, marginBottom: 14 }}>Choose the areas you're working on — you can always change these later.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {FOCUS_AREAS.map(f => {
                  const selected = focusAreas.includes(f.id);
                  return (
                    <button key={f.id} onClick={() => toggleFocus(f.id)}
                      style={{ background: selected ? `${COLORS.forest}` : "white", border: `1.5px solid ${selected ? COLORS.forest : COLORS.mist}`, borderRadius: 14, padding: "14px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}>{f.emoji}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: selected ? "white" : COLORS.charcoal, lineHeight: 1.3 }}>{f.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button disabled={focusAreas.length === 0 || !name.trim()} onClick={() => { setScreen("home"); setActiveTab(focusAreas[0]); }}
              style={{ width: "100%", background: focusAreas.length > 0 && name.trim() ? COLORS.forest : COLORS.mist, color: focusAreas.length > 0 && name.trim() ? "white" : COLORS.bark, border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: focusAreas.length > 0 && name.trim() ? "pointer" : "default", transition: "all 0.2s" }}>
              Enter My Wellness Space →
            </button>
          </div>
        </div>
      )}

      {/* ── HOME / TOOLS ── */}
      {(screen === "home" || screen === "tools") && (
        <div style={{ paddingBottom: 80 }}>
          {/* Header */}
          <div style={{ background: `linear-gradient(150deg, ${COLORS.forest} 0%, ${COLORS.moss} 100%)`, padding: "40px 24px 28px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>ONE|LIFE WELLNESS</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: "white", marginBottom: 4 }}>
              Welcome back, {name}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Your personalized tools are ready.</div>
          </div>

          {/* Crisis Banner */}
          <div onClick={() => setScreen("crisis")} style={{ margin: "16px 16px 0", background: "#FFF5F5", border: "1.5px solid #F5C5C0", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>🆘</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#C4443A" }}>Crisis Resources</div>
              <div style={{ fontSize: 11, color: "#A0504A" }}>If you're in crisis, tap here for immediate support</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#C4443A", fontSize: 18 }}>›</div>
          </div>

          {/* Focus Tabs */}
          <div style={{ padding: "20px 16px 0", overflowX: "auto" }}>
            <div style={{ display: "flex", gap: 8, paddingBottom: 4 }}>
              <button onClick={() => setActiveTab(null)} style={{ background: activeTab === null ? COLORS.forest : "white", color: activeTab === null ? "white" : COLORS.bark, border: `1.5px solid ${activeTab === null ? COLORS.forest : COLORS.mist}`, borderRadius: 20, padding: "7px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>All</button>
              {tabs.map(f => (
                <button key={f.id} onClick={() => setActiveTab(f.id)} style={{ background: activeTab === f.id ? COLORS.forest : "white", color: activeTab === f.id ? "white" : COLORS.bark, border: `1.5px solid ${activeTab === f.id ? COLORS.forest : COLORS.mist}`, borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {f.emoji} {f.label.split(" ")[0]}
                </button>
              ))}
              <button onClick={() => setScreen("onboard")} style={{ background: "white", color: COLORS.bark, border: `1.5px solid ${COLORS.mist}`, borderRadius: 20, padding: "7px 14px", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>✏️ Edit</button>
            </div>
          </div>

          {/* Section label */}
          <div style={{ padding: "20px 20px 8px", display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: COLORS.forest }}>
              {activeTab ? FOCUS_AREAS.find(f => f.id === activeTab)?.label : "Your Tools"}
            </div>
            <div style={{ fontSize: 12, color: COLORS.bark }}>{displayedTools.length} tools</div>
          </div>

          {/* Tool Cards */}
          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}>
            {displayedTools.map((tool, i) => (
              <button key={tool.id + i} onClick={() => setActiveTool(tool)}
                style={{ background: "white", border: `1px solid ${COLORS.mist}`, borderRadius: 18, padding: "20px 20px", cursor: "pointer", textAlign: "left", display: "flex", gap: 16, alignItems: "flex-start", transition: "transform 0.15s, box-shadow 0.15s", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(45,80,22,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; }}>
                <div style={{ fontSize: 32, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{tool.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.charcoal, lineHeight: 1.3 }}>{tool.title}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, background: `${COLORS.moss}18`, color: COLORS.moss, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>{tool.tag}</div>
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.clay, fontWeight: 600, marginBottom: 6 }}>{tool.subtitle}</div>
                  <div style={{ fontSize: 13, color: COLORS.bark, lineHeight: 1.55 }}>{tool.description.slice(0, 90)}...</div>
                  <div style={{ fontSize: 11, color: COLORS.sage, marginTop: 8, fontWeight: 600 }}>⏱ {tool.duration}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer note */}
          <div style={{ margin: "28px 20px 0", background: COLORS.mist + "55", borderRadius: 14, padding: "16px 18px", fontSize: 13, color: COLORS.forest, lineHeight: 1.6 }}>
            <strong>Reminder from your therapist:</strong> These tools work best when practiced consistently between sessions. Bring your reflections and experiences to your next appointment.
          </div>
        </div>
      )}

      {/* ── CRISIS SCREEN ── */}
      {screen === "crisis" && (
        <div style={{ minHeight: "100vh", padding: "0 0 40px" }}>
          <div style={{ background: "#C4443A", padding: "48px 24px 32px" }}>
            <button onClick={() => setScreen("home")} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back</button>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 8 }}>Crisis Support</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>If you are in immediate danger, call 911. You are not alone — help is available right now.</div>
          </div>

          <div style={{ padding: "24px 20px" }}>
            {CRISIS.map((r, i) => (
              <div key={i} style={{ background: "white", border: `1.5px solid ${i < 2 ? "#FDDDD9" : COLORS.mist}`, borderRadius: 16, padding: "20px 20px", marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: i < 2 ? "#C4443A" : COLORS.forest, marginBottom: 4 }}>{r.name}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.charcoal }}>{r.contact}</div>
              </div>
            ))}

            <div style={{ background: COLORS.warm, borderRadius: 16, padding: "20px 20px", marginTop: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: COLORS.forest, marginBottom: 12 }}>In-the-Moment Coping</div>
              {["Take 3 slow, deep breaths. Inhale for 4, exhale for 6.", "Name 5 things you can see around you right now.", "Place both feet flat on the floor and feel the ground beneath you.", "Text someone you trust: 'I'm having a hard time. Can you check in with me?'", "Remember: this feeling is temporary. You have survived hard moments before."].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: COLORS.mist, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: COLORS.forest, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 14, color: COLORS.charcoal, lineHeight: 1.6 }}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Nav ── */}
      {(screen === "home" || screen === "tools") && (
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "white", borderTop: `1px solid ${COLORS.mist}`, display: "flex", padding: "10px 0 16px" }}>
          {[{ label: "Tools", icon: "🧰", s: "home" }, { label: "Crisis", icon: "🆘", s: "crisis" }].map(item => (
            <button key={item.s} onClick={() => setScreen(item.s)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: screen === item.s ? COLORS.forest : COLORS.bark }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
