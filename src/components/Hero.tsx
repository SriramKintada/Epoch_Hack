

export default function Hero() {
    return (
        <header className="hero">
            <div className="hero-content">
                <div className="hero-badge fade-in">SYS.STATUS: ACCEPTING COHORT 1 // PUNE_INDIA</div>
                <h1 className="hero-title fade-in" style={{ transitionDelay: '0.1s' }}>
                    Where young<br />mavericks<br />build the future.
                </h1>
                <p className="hero-desc fade-in" style={{ transitionDelay: '0.2s' }}>
                    Most people are content to follow the rules and climb the ladder.<br />
                    EPOCH is for those who won't accept the world as it is. It's for the restless, the hackers, and the
                    problem-solvers who see what could be instead of settling for what already exists.
                </p>

                <div className="terminal-box fade-in" style={{ transitionDelay: '0.3s' }}>
                    <div className="term-header">
                        <span className="term-dot"></span><span className="term-dot"></span><span className="term-dot"></span>
                        <span className="term-title">epoch.exe</span>
                    </div>
                    <div className="term-body">
                        <p><span className="prompt">&gt;&gt;</span> Location: Flairmind Office Club, Aundh, Pune</p>
                        <p><span className="prompt">&gt;&gt;</span> Duration: 4 Weekends of extreme engineering</p>
                        <p><span className="prompt">&gt;&gt;</span> Target: Revenue generation. No slide decks.</p>
                        <p className="blink"><span className="prompt">&gt;&gt;</span> Cost: 0.00</p>
                    </div>
                </div>

                <div className="hero-actions fade-in" style={{ transitionDelay: '0.4s' }}>
                    <a href="#initiate" className="btn-primary">
                        <span className="btn-edge-left"></span>
                        JOIN THE GANG
                        <span className="btn-edge-right"></span>
                    </a>
                    <a href="#manifesto" className="btn-secondary">READ MANIFESTO</a>
                </div>
            </div>
        </header>
    );
}
