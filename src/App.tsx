
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import WhatYouGet from './components/WhatYouGet';
import Tracks from './components/Tracks';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import ApplyForm from './components/ApplyForm';
import AdminDashboard from './components/AdminDashboard';
import './admin.css';

function LandingPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <WhatYouGet />

      {/* Origin Quote */}
      <section className="section epoch-origin">
        <div className="container container-narrow" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <p className="fade-in" style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            lineHeight: 1.6,
            color: '#fff',
            letterSpacing: '0.01em',
            maxWidth: '700px',
            margin: '0 auto',
            fontWeight: 400,
            fontStyle: 'italic'
          }}>
            "Every generation gets one epoch that rewrites the rules. This is ours. The underscore means it's not finished."
          </p>
        </div>
      </section>

      <Tracks />
      <Partners />
      <FAQ />

      {/* Initiation Section */}
      <section className="section apply-section" id="initiate">
        <div className="apply-container">
          <h1 className="massive-text fade-in">INITIATE</h1>
          <div className="apply-box fade-in" style={{ transitionDelay: '0.2s' }}>
            <div className="sys-message">
              <p className="prompt">&gt; SYSTEM: INITIATE STAGE 0 SEQUENCE...</p>
              <p>Epoch is not a hackathon. It is a crucible for outliers.</p>
              <p>If you are looking for networking, exit now. If you are looking to build the foundation of India's technical future, proceed.</p>
            </div>
            <ul className="specs">
              <li><span className="lbl">COHORT:</span> 001</li>
              <li><span className="lbl">CAPACITY:</span> HIGHLY RESTRICTED</li>
              <li><span className="lbl">STATUS:</span> ACCEPTING ANOMALIES</li>
            </ul>
            <Link to="/apply" className="btn-primary huge-btn">
              <div className="btn-edge-left"></div>
              [ EXECUTE // APPLY ]
              <div className="btn-edge-right"></div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="grid-bg"></div>
      <div className="crt-overlay"></div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            EPOCH<span className="logo-mark">_</span>
            <span className="nav-logo-sub">PROGRAMME<br />V1.0</span>
          </Link>
          <div className="nav-links">
            <a href="/#manifesto">MANIFESTO</a>
            <a href="/#exchange">WHAT YOU GET</a>
            <a href="/#tracks">TRACKS</a>
            <a href="/#partners">PARTNERS</a>
            <Link to="/apply" className="btn-secondary nav-cta">INITIATE [ ]</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplyForm />} />
        <Route path="/admin/epoch-mavericks-2026" element={<AdminDashboard />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <div className="container container-footer">
          <div className="f-brand">EPOCH_</div>
          <div className="f-links">
            <p>BUILT FOR OUTLIERS.<br />OPERATING AT THE EDGE.</p>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;
