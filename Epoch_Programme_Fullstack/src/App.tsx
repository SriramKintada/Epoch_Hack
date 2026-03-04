
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Tracks from './components/Tracks';
import Partners from './components/Partners';
import ApplyForm from './components/ApplyForm';

function LandingPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Tracks />
      <Partners />

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
            <a href="/#tracks">TRACKS</a>
            <a href="/#partners">PARTNERS</a>
            <Link to="/apply" className="btn-secondary nav-cta">INITIATE [ ]</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplyForm />} />
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
