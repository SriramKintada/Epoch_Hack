

export default function Tracks() {
    return (
        <section className="section section-dark border-y" id="tracks">
            <div className="container">
                <div className="section-label">// THE PIPELINE</div>
                <h2 className="section-title">Two Tracks. One Metric.</h2>

                <div className="tracks">
                    {/* Track 0 */}
                    <div className="track-card fade-in">
                        <div className="track-header">
                            <div className="t-badge t-zero">STAGE 0</div>
                            <h3>IDEATORS</h3>
                        </div>
                        <p className="track-desc">You have a profound technical problem worth solving, but zero lines of deployed code.</p>

                        <div className="process-flow">
                            <span>IDEATE</span> <span className="arrow">→</span> <span>VALIDATE</span> <span className="arrow">→</span> <span>SHIP</span>
                        </div>

                        <ul className="week-list">
                            <li><strong>WK 01:</strong> Customer Discovery & Hostile Validation</li>
                            <li><strong>WK 02:</strong> Rapid Prototyping (AI-First Stack)</li>
                            <li><strong>WK 03:</strong> First 10 True Users & Iteration</li>
                            <li><strong>WK 04:</strong> Revenue Initialization</li>
                        </ul>
                    </div>

                    {/* Track 1 */}
                    <div className="track-card fade-in" style={{ transitionDelay: '0.1s' }}>
                        <div className="track-header">
                            <div className="t-badge t-one">STAGE 1</div>
                            <h3>EARLY FOUNDERS</h3>
                        </div>
                        <p className="track-desc">You have a product, maybe a repo mapping, but the business engine is offline.</p>

                        <div className="process-flow">
                            <span>BUILD</span> <span className="arrow">→</span> <span>MARKET</span> <span className="arrow">→</span> <span>CLOSE</span>
                        </div>

                        <ul className="week-list">
                            <li><strong>WK 01:</strong> Brutal Product & Pipeline Audit</li>
                            <li><strong>WK 02:</strong> Distribution: Scripts, Scraping & Cold Outbound</li>
                            <li><strong>WK 03:</strong> Pricing Mechanics & Enterprise Pilot Close</li>
                            <li><strong>WK 04:</strong> Repeatable Revenue Engineering</li>
                        </ul>
                    </div>
                </div>

                <div className="market-grid fade-in" style={{ transitionDelay: '0.2s' }}>
                    <div className="m-card">
                        <h4>// 01. SECURE SEED</h4>
                        <p>Capital deployed for scale based on generated momentum, not just theory.</p>
                    </div>
                    <div className="m-card">
                        <h4>// 02. TALENT ACQUISITION</h4>
                        <p>Targeted hiring drops directly to elite, well-capitalised tech nodes.</p>
                    </div>
                    <div className="m-card">
                        <h4>// 03. ACQUI-HIRE</h4>
                        <p>Incumbent absorbs the entire engineering unit to leapfrog competition.</p>
                    </div>
                    <div className="m-card">
                        <h4>// 04. M&A OUTRIGHT</h4>
                        <p>Total venture acquisition of product, IP, and distribution.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
