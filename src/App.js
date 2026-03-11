import { useState, useEffect, useRef } from "react";
import logo from "./Pippy.jpeg";
import mariaImg from "./maria.jpeg";
import gabriellaImg from "./gabriella.jpeg";

const C = {
  blush: "#f5e6e0",
  petal: "#f0d5cc",
  rose: "#e8bfb3",
  mutedRose: "#c9a090",
  warmTaupe: "#9e7b6e",
  deepTaupe: "#7a5c52",
  cream: "#faf6f3",
  white: "#ffffff",
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Fade = ({ children, delay = 0, style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
};

const s = {
  navLogoBtn: { display:"flex", alignItems:"center", gap:"0.6rem", background:"none", border:"none", cursor:"pointer", padding:0 },
  navLink: { background:"none", border:"none", cursor:"pointer", fontSize:"0.83rem", letterSpacing:"0.06em", textTransform:"uppercase", color:C.warmTaupe, fontFamily:"'DM Sans', sans-serif", padding:"0.4rem 0" },
  navCta: { background:C.warmTaupe, color:C.cream, padding:"0.5rem 1.3rem", borderRadius:100 },
  eyebrow: { fontSize:"0.75rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.mutedRose, marginBottom:"1rem", fontWeight:500, fontFamily:"'DM Sans', sans-serif" },
  heroTitle: { fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(3rem,7vw,5rem)", fontWeight:300, lineHeight:1.1, color:C.deepTaupe, marginBottom:"1.4rem" },
  heroSub: { fontSize:"1.05rem", lineHeight:1.7, color:C.warmTaupe, maxWidth:460, marginBottom:"2.5rem", fontWeight:300 },
  btnPrimary: { background:C.warmTaupe, color:C.cream, border:"none", padding:"0.85rem 2.2rem", borderRadius:100, fontFamily:"'DM Sans', sans-serif", fontSize:"0.9rem", cursor:"pointer", letterSpacing:"0.04em" },
  btnGhost: { background:"transparent", color:C.warmTaupe, border:`1.5px solid ${C.rose}`, padding:"0.85rem 2.2rem", borderRadius:100, fontFamily:"'DM Sans', sans-serif", fontSize:"0.9rem", cursor:"pointer", letterSpacing:"0.04em" },
  sectionLabel: { fontSize:"0.73rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.mutedRose, marginBottom:"0.8rem", fontWeight:500, fontFamily:"'DM Sans', sans-serif" },
  sectionTitle: { fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(2rem,4vw,2.8rem)", fontWeight:300, color:C.deepTaupe, marginBottom:"3rem", lineHeight:1.2 },
  featureCard: { background:C.cream, borderRadius:20, padding:"2.2rem 1.8rem", border:"1px solid rgba(200,160,144,0.18)" },
  featureIcon: { width:46, height:46, background:"linear-gradient(135deg,#f0d5cc,#f5e6e0)", borderRadius:13, marginBottom:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" },
  formLabel: { display:"block", fontSize:"0.75rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.warmTaupe, fontWeight:500, marginBottom:"0.4rem", fontFamily:"'DM Sans', sans-serif" },
  formInput: { width:"100%", background:"rgba(250,246,243,0.8)", border:"1.5px solid rgba(200,160,144,0.25)", borderRadius:12, padding:"0.82rem 1rem", fontFamily:"'DM Sans', sans-serif", fontSize:"0.88rem", color:C.deepTaupe, outline:"none", boxSizing:"border-box" },
};

const Nav = ({ setPage }) => (
  <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.1rem 4rem", background:"rgba(250,246,243,0.9)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(200,160,144,0.15)" }}>
    <button onClick={() => setPage("home")} style={s.navLogoBtn}>
      <img src={logo} alt="Pippy" style={{ height:38, width:"auto" }}/>
    </button>
    <ul style={{ display:"flex", gap:"2.2rem", listStyle:"none", margin:0, padding:0 }}>
      {["home","features","about","waitlist","contact"].map(p => (
        <li key={p}>
          <button onClick={() => setPage(p)} style={{ ...s.navLink, ...(p === "waitlist" ? s.navCta : {}) }}>
            {p === "waitlist" ? "Join Waitlist" : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = ({ setPage }) => (
  <footer style={{ background:C.deepTaupe, padding:"3rem 4rem 2rem", marginTop:"4rem" }}>
    <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"2rem" }}>
      <div>
        <img src={logo} alt="Pippy" style={{ height:36, width:"auto", marginBottom:"0.6rem", display:"block", filter:"brightness(10)" }}/>
        <p style={{ fontSize:"0.82rem", color:"rgba(250,246,243,0.45)", lineHeight:1.6, maxWidth:220, fontWeight:300 }}>The community platform for pilates lovers.</p>
        <div style={{ display:"flex", gap:"1rem", marginTop:"1rem" }}>
          <a href="https://instagram.com/pippy.pilates" target="_blank" rel="noreferrer" style={{ fontSize:"0.78rem", color:"rgba(250,246,243,0.45)", textDecoration:"none" }}>@pippy.pilates</a>
          <span style={{ color:"rgba(250,246,243,0.2)" }}>·</span>
          <a href="mailto:pilatespippy@gmail.com" style={{ fontSize:"0.78rem", color:"rgba(250,246,243,0.45)", textDecoration:"none" }}>pilatespippy@gmail.com</a>
        </div>
      </div>
      <ul style={{ display:"flex", gap:"2rem", listStyle:"none", margin:0, padding:0, alignSelf:"center" }}>
        {["home","features","about","waitlist","contact"].map(p => (
          <li key={p}>
            <button onClick={() => setPage(p)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"0.78rem", letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(250,246,243,0.45)", fontFamily:"'DM Sans', sans-serif" }}>{p}</button>
          </li>
        ))}
      </ul>
    </div>
    <div style={{ borderTop:"1px solid rgba(250,246,243,0.1)", paddingTop:"1.5rem", marginTop:"1.5rem", textAlign:"center", fontSize:"0.76rem", color:"rgba(250,246,243,0.25)" }}>
      © 2026 Pippy Inc. All rights reserved.
    </div>
  </footer>
);

const Home = ({ setPage }) => (
  <div style={{ paddingTop:72 }}>
    <div style={{ minHeight:"88vh", background:"linear-gradient(160deg,#faf6f3 0%,#f5e6e0 60%,#f0d5cc 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"5rem 2rem" }}>
      <div style={{ maxWidth:680 }}>
        <p style={s.eyebrow}>Pilates · Community · Discovery</p>
        <h1 style={s.heroTitle}>
          Find your perfect class,<br/>
          <em style={{ fontStyle:"italic", color:C.warmTaupe }}>every time.</em>
        </h1>
        <p style={{ ...s.heroSub, margin:"0 auto 2.5rem" }}>
          Pippy is the community platform where pilates lovers discover studios, share honest reviews, and track their journey — so every class is worth it.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <button style={s.btnPrimary} onClick={() => setPage("waitlist")}>Join the Waitlist</button>
          <button style={s.btnGhost} onClick={() => setPage("features")}>See Features</button>
        </div>
      </div>
    </div>

    <div style={{ background:C.blush, padding:"2.5rem 4rem", display:"flex", justifyContent:"center", gap:"5rem", flexWrap:"wrap" }}>
      {[["Free","To join"],["2026","Launch year"],["For you","If you love pilates"]].map(([num, label]) => (
        <div key={label} style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"2.8rem", fontWeight:300, color:C.deepTaupe, display:"block" }}>{num}</span>
          <span style={{ fontSize:"0.75rem", letterSpacing:"0.12em", textTransform:"uppercase", color:C.mutedRose, fontWeight:500, fontFamily:"'DM Sans', sans-serif" }}>{label}</span>
        </div>
      ))}
    </div>

    <div style={{ background:C.white, padding:"6rem 4rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Fade>
          <p style={s.sectionLabel}>Why Pippy</p>
          <h2 style={{ ...s.sectionTitle, maxWidth:600 }}>Pilates classes are expensive — and wildly inconsistent.</h2>
        </Fade>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.8rem" }}>
          {[
            { icon:"💸", title:"Every class is a gamble", desc:"Drop-in classes cost $30–50 and vary massively between studios. Without real community reviews, you find out the hard way." },
            { icon:"🔍", title:"No platform built for us", desc:"Yelp and Google reviews don't speak the language of pilates. There's no central home for the pilates community — until now." },
            { icon:"🗺️", title:"Hard to discover what's near you", desc:"Great studios are hidden in plain sight. Knowing where your friends go and what they love changes everything." },
            { icon:"📈", title:"Progress disappears", desc:"You've done hundreds of classes across dozens of studios. There's nowhere to track that journey or celebrate how far you've come." },
          ].map(({ icon, title, desc }, i) => (
            <Fade key={title} delay={i * 0.1}>
              <div style={s.featureCard}>
                <div style={s.featureIcon}>{icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.3rem", fontWeight:500, color:C.deepTaupe, marginBottom:"0.6rem" }}>{title}</h3>
                <p style={{ fontSize:"0.88rem", lineHeight:1.65, color:C.warmTaupe, fontWeight:300 }}>{desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>

    <div style={{ background:"linear-gradient(160deg,#f5e6e0 0%,#faf6f3 100%)", padding:"6rem 4rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Fade>
          <p style={s.sectionLabel}>Features</p>
          <h2 style={s.sectionTitle}>Everything you need to practice with purpose</h2>
        </Fade>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.8rem" }}>
          {[
            { icon:"⭐", title:"Honest Reviews", desc:"Rate and review studios anonymously. Read real community reviews before you book — filtered by your experience level." },
            { icon:"🗺️", title:"Map Discovery", desc:"Find classes nearby or see where your friends have been. Explore your city's pilates scene with a beautifully simple map." },
            { icon:"📊", title:"Progress Tracking", desc:"Log every class, track studios visited, and hit milestones in your pilates journey — all in one personal profile." },
            { icon:"🤖", title:"AI Difficulty Matching", desc:"Get difficulty ratings personalized to your experience — not a generic number that means something different to everyone." },
          ].map(({ icon, title, desc }, i) => (
            <Fade key={title} delay={i * 0.1}>
              <div style={s.featureCard}>
                <div style={s.featureIcon}>{icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.3rem", fontWeight:500, color:C.deepTaupe, marginBottom:"0.6rem" }}>{title}</h3>
                <p style={{ fontSize:"0.88rem", lineHeight:1.65, color:C.warmTaupe, fontWeight:300 }}>{desc}</p>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.2}>
          <div style={{ textAlign:"center", marginTop:"3rem" }}>
            <button style={s.btnPrimary} onClick={() => setPage("features")}>View All Features</button>
          </div>
        </Fade>
      </div>
    </div>

    <div style={{ background:C.blush, padding:"6rem 4rem", textAlign:"center" }}>
      <Fade>
        <p style={s.eyebrow}>Early Access</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300, color:C.deepTaupe, marginBottom:"1rem", lineHeight:1.2 }}>
          Ready to find your<br/><em style={{ fontStyle:"italic" }}>perfect class?</em>
        </h2>
        <p style={{ fontSize:"0.95rem", color:C.warmTaupe, fontWeight:300, maxWidth:400, margin:"0 auto 2rem" }}>
          Join the waitlist and be first to experience Pippy when we launch.
        </p>
        <button style={s.btnPrimary} onClick={() => setPage("waitlist")}>Get Early Access →</button>
      </Fade>
    </div>

    <Footer setPage={setPage}/>
  </div>
);

const Features = ({ setPage }) => (
  <div style={{ paddingTop:72 }}>
    <div style={{ background:"linear-gradient(160deg,#faf6f3 0%,#f5e6e0 60%,#f0d5cc 100%)", padding:"6rem 4rem 4rem", textAlign:"center" }}>
      <Fade>
        <p style={s.eyebrow}>Features</p>
        <h1 style={{ ...s.heroTitle, fontSize:"clamp(2.6rem,5vw,4rem)" }}>
          Your whole pilates life,<br/><em style={{ fontStyle:"italic", color:C.warmTaupe }}>in one place.</em>
        </h1>
        <p style={{ ...s.heroSub, margin:"0 auto" }}>
          From discovering new studios to celebrating your 100th class — Pippy has everything the pilates enthusiast needs.
        </p>
      </Fade>
    </div>

    <div style={{ background:C.white, padding:"6rem 4rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Fade>
          <p style={s.sectionLabel}>Discovery & Reviews</p>
          <h2 style={{ ...s.sectionTitle, marginBottom:"2rem" }}>Know before you go</h2>
        </Fade>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.8rem", marginBottom:"5rem" }}>
          {[
            { icon:"⭐", title:"Anonymous Studio Reviews", desc:"Post honest reviews without your name attached. Rate difficulty, style, instructor quality, and value." },
            { icon:"👁️", title:"Public Community Reviews", desc:"Browse reviews from real pilates people before you book. The community knowledge you've always needed." },
            { icon:"🤖", title:"AI Difficulty Calibration", desc:"Pippy personalizes difficulty ratings based on your class history. A hard class for a beginner looks different for a veteran." },
            { icon:"🗺️", title:"Map-Based Discovery", desc:"Explore studios near you on a map. See where friends have been and discover new favourites in your city." },
          ].map(({ icon, title, desc }, i) => (
            <Fade key={title} delay={i * 0.08}>
              <div style={s.featureCard}>
                <div style={s.featureIcon}>{icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.3rem", fontWeight:500, color:C.deepTaupe, marginBottom:"0.6rem" }}>{title}</h3>
                <p style={{ fontSize:"0.88rem", lineHeight:1.65, color:C.warmTaupe, fontWeight:300 }}>{desc}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade>
          <p style={s.sectionLabel}>Community & Sharing</p>
          <h2 style={{ ...s.sectionTitle, marginBottom:"2rem" }}>Practice together</h2>
        </Fade>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.8rem", marginBottom:"5rem" }}>
          {[
            { icon:"📱", title:"Daily Workout Posts", desc:"Share your daily sessions with the community. Celebrate wins, share routines, and stay inspired by others." },
            { icon:"📖", title:"Stories", desc:"Users and studios can post stories — share in-the-moment highlights from class or behind-the-scenes studio content." },
            { icon:"👥", title:"Friend Activity", desc:"See where friends are taking classes, what they're loving, and discover new studios through your network." },
          ].map(({ icon, title, desc }, i) => (
            <Fade key={title} delay={i * 0.1}>
              <div style={s.featureCard}>
                <div style={s.featureIcon}>{icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.3rem", fontWeight:500, color:C.deepTaupe, marginBottom:"0.6rem" }}>{title}</h3>
                <p style={{ fontSize:"0.88rem", lineHeight:1.65, color:C.warmTaupe, fontWeight:300 }}>{desc}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade>
          <p style={s.sectionLabel}>Progress & Tracking</p>
          <h2 style={{ ...s.sectionTitle, marginBottom:"2rem" }}>Celebrate your journey</h2>
        </Fade>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.8rem", marginBottom:"5rem" }}>
          {[
            { icon:"📊", title:"Profile & Stats", desc:"Your personal pilates dashboard — studios visited, total classes, streaks, and progress all in one profile." },
            { icon:"🏆", title:"Milestone Celebrations", desc:"10th class, first reformer, 1-year anniversary — Pippy marks the moments that matter in your journey." },
            { icon:"📅", title:"Calendar & Scheduling", desc:"Sync workout classes to your calendar, add personal sessions, and see your week at a glance." },
            { icon:"📍", title:"Studio Tracker", desc:"Keep a visual log of every studio you've visited. Build your own pilates map across cities." },
          ].map(({ icon, title, desc }, i) => (
            <Fade key={title} delay={i * 0.08}>
              <div style={s.featureCard}>
                <div style={s.featureIcon}>{icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.3rem", fontWeight:500, color:C.deepTaupe, marginBottom:"0.6rem" }}>{title}</h3>
                <p style={{ fontSize:"0.88rem", lineHeight:1.65, color:C.warmTaupe, fontWeight:300 }}>{desc}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade>
          <div style={{ background:"linear-gradient(135deg,#f0d5cc,#f5e6e0)", borderRadius:24, padding:"3rem 3.5rem", border:"1px solid rgba(200,160,144,0.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"2rem" }}>
              <div>
                <div style={{ display:"inline-block", background:"rgba(158,123,110,0.12)", border:"1px solid rgba(158,123,110,0.2)", borderRadius:100, padding:"0.3rem 0.9rem", marginBottom:"1rem" }}>
                  <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:"0.65rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.warmTaupe }}>Coming Soon · Premium</span>
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.9rem", fontWeight:400, color:C.deepTaupe, marginBottom:"0.7rem" }}>Pippy Premium</h3>
                <p style={{ fontSize:"0.9rem", color:C.warmTaupe, lineHeight:1.7, maxWidth:440, fontWeight:300 }}>
                  Personalized studio recommendations based on your favourite class types, invite-only community pilates events, advanced analytics, and exclusive studio partnerships.
                </p>
              </div>
              <button onClick={() => setPage("waitlist")} style={s.btnPrimary}>Get Early Access →</button>
            </div>
          </div>
        </Fade>
      </div>
    </div>
    <Footer setPage={setPage}/>
  </div>
);

const About = ({ setPage }) => (
  <div style={{ paddingTop:72 }}>
    <div style={{ background:"linear-gradient(135deg,#f5e6e0 0%,#faf6f3 100%)", padding:"6rem 4rem 4rem", textAlign:"center" }}>
      <Fade>
        <p style={s.eyebrow}>Our Story</p>
        <h1 style={{ ...s.heroTitle, fontSize:"clamp(2.6rem,5vw,4rem)" }}>
          Built by pilates lovers,<br/><em style={{ fontStyle:"italic", color:C.warmTaupe }}>for pilates lovers.</em>
        </h1>
        <p style={{ ...s.heroSub, margin:"0 auto" }}>
          We kept showing up to expensive classes that weren't right for us. So we built the tool we always wished existed.
        </p>
      </Fade>
    </div>

    <div style={{ maxWidth:1100, margin:"0 auto", padding:"6rem 4rem" }}>
      {[
        {
          emoji:"🌸",
          title:"We started with a frustration",
          body:["Pilates classes are expensive — and the experience varies wildly between studios. Style, intensity, equipment, instructors: everything is different, and there's no reliable way to know what you're walking into before you pay.", "We're pilates enthusiasts ourselves, and we faced this constantly. Scattered Google reviews, transient studio communities, and no platform that actually understood how pilates people think and train. Pippy is our answer."],
          flip:false,
        },
        {
          emoji:"🤝",
          title:"Our mission",
          body:["To build the centralized platform that the pilates community has always deserved. A place where honest reviews help you find your perfect class, where community makes your practice richer, and where your progress is celebrated.", "We're starting with discovery and reviews, then expanding into personalized recommendations, community events, and deeper tracking features — every step built for real pilates enthusiasts."],
          flip:true,
        },
      ].map(({ emoji, title, body, flip }) => (
        <Fade key={title}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center", marginBottom:"5rem", direction: flip ? "rtl" : "ltr" }}>
            <div style={{ direction:"ltr", background:"linear-gradient(145deg,#f0d5cc,#f5e6e0)", borderRadius:24, aspectRatio:"4/3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"5rem" }}>{emoji}</div>
            <div style={{ direction:"ltr" }}>
              <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"2rem", fontWeight:300, color:C.deepTaupe, marginBottom:"1rem", lineHeight:1.2 }}>{title}</h2>
              {body.map((p, i) => <p key={i} style={{ fontSize:"0.93rem", lineHeight:1.75, color:C.warmTaupe, fontWeight:300, marginBottom:"0.8rem" }}>{p}</p>)}
            </div>
          </div>
        </Fade>
      ))}
    </div>

    <div style={{ background:C.white, padding:"5rem 4rem", textAlign:"center" }}>
      <Fade>
        <p style={s.sectionLabel}>Our Team</p>
        <h2 style={{ ...s.sectionTitle, textAlign:"center" }}>The people behind Pippy</h2>
        <div style={{ display:"flex", justifyContent:"center", gap:"5rem", flexWrap:"wrap" }}>
          {[
            { img: mariaImg, name:"Maria Musto", role:"Co-Founder & CTO" },
            { img: gabriellaImg, name:"Gabriella Doherty", role:"Co-Founder & CEO" },
          ].map(({ img, name, role }) => (
            <div key={name} style={{ textAlign:"center" }}>
              <div style={{ width:110, height:110, borderRadius:"50%", margin:"0 auto 1rem", overflow:"hidden", border:"3px solid #f0d5cc" }}>
                <img src={img} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}/>
              </div>
              <h4 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.15rem", fontWeight:500, color:C.deepTaupe, marginBottom:"0.3rem" }}>{name}</h4>
              <span style={{ fontSize:"0.75rem", letterSpacing:"0.06em", textTransform:"uppercase", color:C.mutedRose, fontFamily:"'DM Sans', sans-serif" }}>{role}</span>
            </div>
          ))}
        </div>
      </Fade>
    </div>
    <Footer setPage={setPage}/>
  </div>
);

const Waitlist = ({ setPage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", interest:"", city:"" });

  const handleSubmit = async () => {
    if (!form.name || !form.email) { alert("Please fill in your name and email."); return; }
    await fetch("https://formspree.io/f/xkoqjepk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, city: form.city, interest: form.interest }),
    });
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop:72, minHeight:"calc(100vh - 72px)", background:"linear-gradient(160deg,#faf6f3 0%,#f5e6e0 50%,#f0d5cc 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"5rem 2rem" }}>
      <div style={{ background:"rgba(255,255,255,0.72)", backdropFilter:"blur(20px)", border:"1px solid rgba(200,160,144,0.2)", borderRadius:32, padding:"4rem", maxWidth:480, width:"100%", textAlign:"center", boxShadow:"0 30px 80px rgba(158,122,110,0.1)" }}>
        <div style={{ marginBottom:"1.8rem" }}>
          <img src={logo} alt="Pippy" style={{ height:60, width:"auto" }}/>
        </div>
        {submitted ? (
          <div>
            <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>🌸</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"2rem", fontWeight:300, color:C.deepTaupe, marginBottom:"0.8rem" }}>You're on the list!</h2>
            <p style={{ fontSize:"0.93rem", color:C.warmTaupe, lineHeight:1.7, fontWeight:300, marginBottom:"1.5rem" }}>
              We'll reach out at {form.email} when early access opens. Follow us at <strong>@pippy.pilates</strong> for updates.
            </p>
            <button onClick={() => setPage("home")} style={{ ...s.btnGhost, padding:"0.65rem 1.6rem", fontSize:"0.82rem" }}>Back to Home</button>
          </div>
        ) : (
          <>
            <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"2.5rem", fontWeight:300, color:C.deepTaupe, marginBottom:"1rem", lineHeight:1.2 }}>
              Be first to <em style={{ fontStyle:"italic" }}>flow</em> with Pippy
            </h1>
            <p style={{ fontSize:"0.93rem", lineHeight:1.7, color:C.warmTaupe, fontWeight:300, marginBottom:"2rem" }}>
              Join the waitlist for early access, founding member perks, and exclusive studio partnerships.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem", textAlign:"left" }}>
              {[
                { label:"First Name", key:"name", type:"text", placeholder:"Your first name" },
                { label:"Email Address", key:"email", type:"email", placeholder:"you@example.com" },
                { label:"Your City", key:"city", type:"text", placeholder:"e.g. New York, London..." },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label style={s.formLabel}>{label}</label>
                  <input type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={s.formInput}/>
                </div>
              ))}
              <div>
                <label style={s.formLabel}>I'm most into</label>
                <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} style={s.formInput}>
                  <option value="">Select an option...</option>
                  <option>Reformer Pilates</option>
                  <option>Mat Pilates</option>
                  <option>Barre</option>
                  <option>Mixed — all of the above</option>
                  <option>Just getting started!</option>
                </select>
              </div>
              <button style={{ ...s.btnPrimary, width:"100%", padding:"1rem", borderRadius:12, fontSize:"0.95rem", marginTop:"0.4rem" }} onClick={handleSubmit}>
                Reserve My Spot →
              </button>
            </div>
            <p style={{ fontSize:"0.76rem", color:C.mutedRose, marginTop:"1rem" }}>No spam, ever. Unsubscribe anytime. 🌿</p>
          </>
        )}
      </div>
    </div>
  );
};

const Contact = ({ setPage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName:"", lastName:"", email:"", subject:"General Inquiry", message:"" });

  const handleContactSubmit = async () => {
    if (!contactForm.firstName || !contactForm.email) { alert("Please fill in your name and email."); return; }
    await fetch("https://formspree.io/f/mreypdrv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactForm),
    });
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"5rem 4rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"5rem", alignItems:"start" }}>
          <Fade>
            <div>
              <p style={s.eyebrow}>Get in Touch</p>
              <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"3rem", fontWeight:300, color:C.deepTaupe, lineHeight:1.15, marginBottom:"1rem" }}>
                We'd love to<br/><em style={{ fontStyle:"italic", color:C.warmTaupe }}>hear from you</em>
              </h1>
              <p style={{ fontSize:"0.93rem", lineHeight:1.75, color:C.warmTaupe, fontWeight:300, marginBottom:"2rem" }}>
                Whether you're a studio partner, investor, press, or just curious — our inbox is always open.
              </p>
              {[
                { icon:"✉️", label:"Email", value:"pilatespippy@gmail.com" },
                { icon:"📸", label:"Instagram", value:"@pippy.pilates" },
                { icon:"🤝", label:"Partnerships", value:"pilatespippy@gmail.com" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.2rem" }}>
                  <div style={{ width:42, height:42, background:C.blush, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>{icon}</div>
                  <div>
                    <span style={{ display:"block", fontSize:"0.73rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.mutedRose, fontWeight:500, fontFamily:"'DM Sans', sans-serif" }}>{label}</span>
                    <span style={{ fontSize:"0.88rem", color:C.deepTaupe }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div style={{ background:C.white, borderRadius:24, padding:"3rem", border:"1px solid rgba(200,160,144,0.15)", boxShadow:"0 20px 60px rgba(158,122,110,0.1)" }}>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.6rem", fontWeight:400, color:C.deepTaupe, marginBottom:"2rem" }}>Send us a message</h3>
              {submitted ? (
                <div style={{ textAlign:"center", padding:"2rem" }}>
                  <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>💌</div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.8rem", fontWeight:300, color:C.deepTaupe, marginBottom:"0.8rem" }}>Message sent!</h2>
                  <p style={{ fontSize:"0.93rem", color:C.warmTaupe, fontWeight:300 }}>Thanks for reaching out. We'll get back to you within 1–2 business days.</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                    <div><label style={s.formLabel}>First Name</label><input type="text" placeholder="Jane" value={contactForm.firstName} onChange={e => setContactForm({...contactForm, firstName: e.target.value})} style={s.formInput}/></div>
                    <div><label style={s.formLabel}>Last Name</label><input type="text" placeholder="Doe" value={contactForm.lastName} onChange={e => setContactForm({...contactForm, lastName: e.target.value})} style={s.formInput}/></div>
                  </div>
                  <div><label style={s.formLabel}>Email</label><input type="email" placeholder="jane@example.com" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} style={s.formInput}/></div>
                  <div>
                    <label style={s.formLabel}>Subject</label>
                    <select value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})} style={s.formInput}>
                      <option>General Inquiry</option>
                      <option>Studio Partnership</option>
                      <option>Press & Media</option>
                      <option>Investor Relations</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label style={s.formLabel}>Message</label>
                    <textarea placeholder="Tell us what's on your mind..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} style={{ ...s.formInput, minHeight:120, resize:"vertical" }}/>
                  </div>
                  <button style={{ ...s.btnPrimary, width:"100%", padding:"1rem", borderRadius:12, fontSize:"0.95rem" }} onClick={handleContactSubmit}>
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </Fade>
        </div>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
};

export default function PippyWebsite() {
  const [page, setPage] = useState("home");
  const go = (p) => { setPage(p); window.scrollTo({ top:0, behavior:"smooth" }); };

  useEffect(() => {
    document.title = "Pippy";
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) { favicon = document.createElement("link"); favicon.rel = "icon"; document.head.appendChild(favicon); }
    favicon.href = logo;
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'DM Sans',sans-serif; background:#faf6f3; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
        input, select, textarea { font-family:'DM Sans',sans-serif; }
        button { transition: opacity 0.2s; }
        button:hover { opacity: 0.82; }
      `}</style>
      <Nav setPage={go}/>
      {page === "home"     && <Home     setPage={go}/>}
      {page === "features" && <Features setPage={go}/>}
      {page === "about"    && <About    setPage={go}/>}
      {page === "waitlist" && <Waitlist setPage={go}/>}
      {page === "contact"  && <Contact  setPage={go}/>}
    </>
  );
}
