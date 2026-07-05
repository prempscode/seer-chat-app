import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <Link to="/" className="landing-brand">
          <span className="landing-eye">👁️</span>
          <span className="landing-brand-text">Seer</span>
        </Link>
        <div className="landing-nav-links">
          <Link to="/login" className="nav-link">
            Log in
          </Link>
          <Link to="/signup" className="nav-link nav-link-primary">
            Get started
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-eyebrow">
          <span className="dot" /> THE ALL-SEEING CHAT
        </div>
        <h1 className="hero-title">
          Nothing stays
          <br />
          <span className="hero-accent">hidden.</span>
        </h1>
        <p className="hero-sub">
          Real-time messaging where every word is witnessed, every message is
          seen. Speak freely — the Seer is always watching.
        </p>
        <div className="hero-ctas">
          <Link to="/signup" className="btn-primary">
            👁️ Get Started
          </Link>
          <Link to="/login" className="btn-secondary">
            I have an account →
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">⚡</div>
            <div className="stat-label">Real-time delivery</div>
          </div>
          <div className="stat">
            <div className="stat-num">👁️</div>
            <div className="stat-label">Always watching</div>
          </div>
          <div className="stat">
            <div className="stat-num">🔓</div>
            <div className="stat-label">Open by design</div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-head">
          <div className="section-eyebrow">WHAT YOU GET</div>
          <h2 className="section-title">Built to be seen.</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🕵️</div>
            <h3>Always Watching</h3>
            <p>
              Real-time delivery. No delays, no drafts sitting forever. The Seer
              delivers instantly.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👁️</div>
            <h3>Nothing Hidden</h3>
            <p>
              Your words, everyone's eyes. No filters, no disappearing tricks.
              Pure, witnessed conversation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔓</div>
            <h3>No Walls</h3>
            <p>
              Open by design. No locks, no "seen" anxiety. Just raw, unfiltered
              human connection.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Picture This</h3>
            <p>
              Share images that get seen. Visual messages delivered in full
              clarity, in real-time.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Direct Sight</h3>
            <p>
              One-to-one chats where every message reaches its target. No group
              chaos, just clarity.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🟢</div>
            <h3>Always Here</h3>
            <p>
              See who's online, who's watching. Presence indicators keep you
              connected to your circle.
            </p>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-inner">
          <div className="manifesto-eyebrow">THE MANIFESTO</div>
          <h2 className="manifesto-title">
            In a world of disappearing messages
            <br />
            and locked DMs,
            <br />
            <span className="hero-accent">Seer keeps it visible.</span>
          </h2>
          <p className="manifesto-sub">
            Speak freely. The Seer is listening.
            <br />
            And everyone else is too.
          </p>
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to be seen?</h2>
        <p>Join Seer. Speak. Be witnessed.</p>
        <Link to="/signup" className="btn-primary btn-lg">
          👁️ Get Started
        </Link>
      </section>

      <footer className="landing-footer">
        <div className="footer-brand">
          <span className="landing-eye">👁️</span> Seer
        </div>
        <div className="footer-tagline">nothing stays hidden</div>
        <div className="footer-copy">© 2026 Seer — built to be seen.</div>
      </footer>
    </div>
  );
}
