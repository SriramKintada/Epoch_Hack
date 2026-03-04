

export default function Partners() {
    return (
        <section className="section border-y" id="partners">
            <div className="container">
                <div className="section-label">// INFRASTRUCTURE NODE</div>
                <h2 className="section-title">Built with serious institutions.</h2>

                <div className="partners-grid fade-in">
                    {/* A3 Capital */}
                    <div className="partner-card">
                        <div className="partner-logo a3-logo">
                            <img src="/logos/Logo_A3_Capitals.png" alt="A3 Capital Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        </div>
                        <div className="partner-role">PROGRAM OPERATOR & STRATEGY</div>
                        <p>Designing EPOCH as a high-throughput, execution-ruthless pipeline for India's deepest technical talent.</p>
                    </div>

                    {/* HSBC */}
                    <div className="partner-card highlight-glow" style={{ transitionDelay: '0.1s' }}>
                        <div className="partner-logo hsbc-logo">
                            <img src="/logos/HSBC-Innovation-logo.png" alt="HSBC Innovation Banking Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        </div>
                        <div className="partner-role">BANKING & LIQUIDITY PARTNER</div>
                        <p>Supplying global banking rails, early liquidity mechanisms, and deep financial advisory straight from Cohort 1.</p>
                    </div>

                    {/* AI Grants India */}
                    <div className="partner-card" style={{ transitionDelay: '0.2s' }}>
                        <div className="partner-logo aig-logo">
                            <img src="/logos/India_AI_Grants_Logo.png" alt="AI Grants India Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        </div>
                        <div className="partner-role">CO-ORGANISER & INFRA PROVIDER</div>
                        <p>Deploying heavy compute resources. Unleashing Anthropic, Google, and OpenAI bandwidth for zero-friction AI development.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
