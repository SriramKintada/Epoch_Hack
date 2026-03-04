

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
                            <svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(10, 5) scale(0.65)" stroke="white" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
                                    <path d="M40 5 L10 65 L70 65 Z" fill="transparent" />
                                    <path d="M5 45 Q40 85 75 45 Q40 5 5 45 Z" fill="transparent" />
                                </g>
                                <text x="75" y="42" fill="white" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="28" letterSpacing="1">A3 CAPITAL</text>
                            </svg>
                        </div>
                        <div className="partner-role">PROGRAM OPERATOR & STRATEGY</div>
                        <p>Designing EPOCH as a high-throughput, execution-ruthless pipeline for India's deepest technical talent.</p>
                    </div>

                    {/* HSBC */}
                    <div className="partner-card highlight-glow" style={{ transitionDelay: '0.1s' }}>
                        <div className="partner-logo hsbc-logo">
                            <svg viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0, 5)">
                                    <polygon points="0,9 16,25 0,41" fill="#DB0011" />
                                    <polygon points="50,9 34,25 50,41" fill="#DB0011" />
                                    <polygon points="25,0 9,16 41,16" fill="#DB0011" />
                                    <polygon points="25,50 9,34 41,34" fill="#DB0011" />
                                </g>
                                <text x="65" y="38" fill="white" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="25">HSBC</text>
                                <text x="140" y="38" fill="#cccccc" fontFamily="'Inter', sans-serif" fontWeight="400" fontSize="25">Innovation Banking</text>
                            </svg>
                        </div>
                        <div className="partner-role">BANKING & LIQUIDITY PARTNER</div>
                        <p>Supplying global banking rails, early liquidity mechanisms, and deep financial advisory straight from Cohort 1.</p>
                    </div>

                    {/* AI Grants India */}
                    <div className="partner-card" style={{ transitionDelay: '0.2s' }}>
                        <div className="partner-logo aig-logo">
                            <svg viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0, 10)">
                                    <rect x="0" y="0" width="40" height="8" fill="#FF9933" />
                                    <rect x="0" y="10" width="40" height="8" fill="#FFFFFF" />
                                    <circle cx="20" cy="14" r="3" fill="#000080" />
                                    <rect x="0" y="20" width="40" height="8" fill="#138808" />
                                </g>
                                <text x="55" y="33" fill="white" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fontSize="24" letterSpacing="-0.5">AI GRANTS INDIA</text>
                            </svg>
                        </div>
                        <div className="partner-role">CO-ORGANISER & INFRA PROVIDER</div>
                        <p>Deploying heavy compute resources. Unleashing Anthropic, Google, and OpenAI bandwidth for zero-friction AI development.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
