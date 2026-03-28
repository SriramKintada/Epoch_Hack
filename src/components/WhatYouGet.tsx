
export default function WhatYouGet() {
    return (
        <section className="section section-dark border-y" id="exchange">
            <div className="container container-narrow">
                <div className="section-label">// THE EXCHANGE</div>
                <h2 className="section-title fade-in">You give 8 weekends days.<br />Here's what you <span className="highlight">walk away with.</span></h2>

                <div className="exchange-grid fade-in" style={{ transitionDelay: '0.1s' }}>
                    <div className="exchange-card">
                        <div className="ex-num">01</div>
                        <h4>A Shipped Product</h4>
                        <p>Not a prototype gathering dust on GitHub. A product with real users, real feedback, and a clear path to revenue. If your idea doesn't survive Week 1 validation — we help you pivot to one that will.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">02</div>
                        <h4>Your First Revenue</h4>
                        <p>Week 4 isn't demo day — it's revenue day. You'll have pricing, a sales process, and actual paying customers or enterprise pilots closed. That's the metric. Not applause.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">03</div>
                        <h4>A Co-Founder & Team</h4>
                        <p>20-30 vetted builders in one room for a month. Co-founders are found here. Early team members are recruited here. The people you meet will be the most valuable thing you take from this program.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">04</div>
                        <h4>Investor & Acquirer Intros</h4>
                        <p>The final event brings pre-matched investors and companies to the room — not random VCs, but people specifically selected to match what you're building. Four outcome paths: funding, hiring, acqui-hire, or acquisition.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">05</div>
                        <h4>Unlimited AI Compute</h4>
                        <p>OpenAI, Anthropic, Google API credits — all free, courtesy of AI Grants India. Build AI-native products without worrying about costs. The credits continue after the program ends.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">06</div>
                        <h4>A Network That Compounds</h4>
                        <p>EPOCH alumni don't disappear. Permanent access to the community, the workspace, the Slack, and the people who understand what you're building. Cohort 1 founders invest in each other's companies. That's the playbook.</p>
                    </div>
                </div>

                <div className="exchange-bottom fade-in" style={{ transitionDelay: '0.2s' }}>
                    <p className="emphasized-text">The cost to you: ₹0 and 8 weekend days of focused work.<br />The cost of not joining: another year of building alone.</p>
                </div>
            </div>
        </section>
    );
}
