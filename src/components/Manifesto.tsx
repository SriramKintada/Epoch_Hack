

export default function Manifesto() {
    return (
        <section className="section" id="manifesto">
            <div className="container container-narrow">
                <div className="section-label">// THE PROBLEM</div>
                <h2 className="section-title fade-in">Most programs end with a presentation.<br />We end with <span
                    className="highlight">revenue.</span></h2>

                <div className="content-block fade-in" style={{ transitionDelay: '0.1s' }}>
                    <p>India doesn't have an ideas problem. It has an extreme <em>execution</em> problem. Too many brilliant
                        engineers are stuck in perpetual planning mode, waiting for perfect capital conditions.</p>
                    <p>Conventional accelerators offer months of irrelevant workshops and culminate in a demo day where
                        founders pitch to detached investors. Most leave with nothing but a polished slide deck and zero
                        users.</p>
                    <p>EPOCH is a radically different institution. Intense, focused execution over four weekends, where
                        every single line of code and every milestone is tied directly to market validation and revenue
                        generation.</p>
                    <p className="emphasized-text">A new institution for extreme technical ambition.</p>
                </div>

                <div className="benefits-grid fade-in" style={{ transitionDelay: '0.2s' }}>
                    <div className="benefit-card">
                        <div className="b-head"><span className="b-icon">01</span> DEDICATED HQ</div>
                        <p>Private bunkers, disruption zones, and raw high-speed connectivity in Aundh, Pune.</p>
                    </div>
                    <div className="benefit-card outline-glow">
                        <div className="b-head"><span className="b-icon">02</span> AI COMPUTE</div>
                        <p>Unlimited API endpoints for OpenAI, Anthropic, & Google—powered by AI Grants India.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="b-head"><span className="b-icon">03</span> LOGISTICS</div>
                        <p>Transport fully bridged. Whether campus or city periphery, your transit is handled.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="b-head"><span className="b-icon">04</span> HIGH-AGENCY PEERS</div>
                        <p>20–30 thoroughly vetted builders. The network in the room is your highest leverage.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
