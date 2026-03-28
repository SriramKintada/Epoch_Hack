
export default function HowItWorks() {
    return (
        <section className="section" id="how">
            <div className="container container-narrow">
                <div className="section-label">// HOW IT WORKS</div>
                <h2 className="section-title fade-in">8 days. 4 weekends.<br />Your idea becomes <span className="highlight">real.</span></h2>

                <div className="content-block fade-in" style={{ transitionDelay: '0.1s' }}>
                    <p>EPOCH is <strong>not</strong> a month-long residency. It's not a hackathon. It's not a course.</p>
                    <p>It runs over <strong>4 consecutive weekends</strong> (Saturday + Sunday) at Flairmind Office Club, Aundh, Pune. You keep your job. You keep your classes. You show up on weekends ready to build.</p>
                </div>

                <div className="how-grid fade-in" style={{ transitionDelay: '0.2s' }}>
                    <div className="how-card">
                        <div className="how-icon">📅</div>
                        <h4>Weekends (Mandatory)</h4>
                        <p>Full-day working sessions, Saturday & Sunday. You build, get live feedback from mentors, hit weekly milestones, and present progress to the entire cohort. The founding team and domain experts are in the room with you.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-icon">💻</div>
                        <h4>Weekdays (Optional)</h4>
                        <p>The workspace stays open. Come in and build whenever you want. Mid-week online check-ins with your cohort keep you accountable between weekends. Slack channel stays active 24/7.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-icon">🎯</div>
                        <h4>Weekly Milestones</h4>
                        <p>Every Sunday you present what you shipped that weekend — not what you plan to ship. Miss a milestone and the cohort knows. This accountability is the engine that makes EPOCH work.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-icon">🤝</div>
                        <h4>Come Solo or With a Team</h4>
                        <p>Don't have a co-founder? Good — that's what Week 1 is for. Come with a team or find one in the room. Either way, you won't build alone.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
