
export default function WhatYouGet() {
    return (
        <section className="section section-dark border-y" id="exchange">
            <div className="container container-narrow">
                <div className="section-label">// THE EXCHANGE</div>
                <h2 className="section-title fade-in">You give 8 days.<br />Here's what you <span className="highlight">walk away with.</span></h2>

                <div className="exchange-grid fade-in" style={{ transitionDelay: '0.1s' }}>
                    <div className="exchange-card">
                        <div className="ex-num">01</div>
                        <h4>A Shipped Product</h4>
                        <p>Not a prototype gathering dust on GitHub. A product with real users, real feedback, and a clear path forward. If your idea doesn't survive Week 1 validation — we help you pivot to one that will.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">02</div>
                        <h4>Real Traction</h4>
                        <p>Week 4 isn't demo day — it's proof day. Users, paying customers, enterprise pilots, or validated demand. Whether you're pre-revenue or scaling, you leave with measurable momentum.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">03</div>
                        <h4>A Co-Founder & Team</h4>
                        <p>20-30 vetted builders in one room for a month. Co-founders are found here. Early team members are recruited here. The people you meet will be the most valuable thing you take from this.</p>
                    </div>
                    <div className="exchange-card">
                        <div className="ex-num">04</div>
                        <h4>Investor & Acquirer Intros</h4>
                        <p>The final event brings pre-matched investors and companies to the room — not random VCs, but people specifically selected to match what you're building.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
