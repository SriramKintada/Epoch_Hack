
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
                        <div className="how-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
                        </div>
                        <h4>Weekends (Mandatory)</h4>
                        <p>Full-day working sessions, Saturday & Sunday. You build, get live feedback from mentors, hit weekly milestones, and present progress to the entire cohort. The founding team and domain experts are in the room with you.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                        </div>
                        <h4>Weekdays (Optional)</h4>
                        <p>The workspace stays open. Come in and build whenever you want. Mid-week online check-ins with your cohort keep you accountable between weekends. Slack channel stays active 24/7.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
                        </div>
                        <h4>Weekly Milestones</h4>
                        <p>Every Sunday you present what you shipped that weekend — not what you plan to ship. Miss a milestone and the cohort knows. This accountability is the engine that makes EPOCH work.</p>
                    </div>
                    <div className="how-card">
                        <div className="how-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <h4>Come Solo or With a Team</h4>
                        <p>Don't have a co-founder? Good — that's what Week 1 is for. Come with a team or find one in the room. Either way, you won't build alone.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
