import { useState } from 'react';

const faqs = [
    {
        q: "I don't have an idea yet. Can I still apply?",
        a: "Yes — if you have a strong track record of building and shipping things, we want to hear from you. Email epoch.mavericks@gmail.com with your best work (GitHub, portfolio, live projects, anything that proves you're high-agency). If you convince us you're a builder, we'll match you with a problem worth solving."
    },
    {
        q: "I already have revenue. Is EPOCH still for me?",
        a: "Absolutely. Stage 1 is built for founders with a product — whether pre-revenue or already generating income. If you want to scale aggressively, sharpen your distribution, or find a co-founder to grow faster, EPOCH is designed for that."
    },
    {
        q: "How does a team application work?",
        a: "Select 'Team Application' on the form. One person submits the team application with all members listed. Each team member should also submit their own individual application so we can evaluate everyone. Teams of 2-5 are ideal."
    },
    {
        q: "Do I need to be in Pune?",
        a: "Weekends are mandatory and in-person at Flairmind Office Club, Aundh, Pune. If you're based elsewhere, you'll need to travel to Pune for 4 weekends. Transport within Pune is handled by us."
    },
    {
        q: "Is this a hackathon?",
        a: "No. Hackathons run 24-48 hours and produce demos. EPOCH runs over 4 weekends and produces real products with real users. There is no judging panel. There is no prize. There is only what you ship and the traction you build."
    },
    {
        q: "What's the time commitment?",
        a: "8 full days (4 Saturdays + 4 Sundays). You keep your job, your classes, your life. Weekdays you can optionally use the workspace and join online check-ins. The weekends are non-negotiable."
    },
    {
        q: "What does it cost?",
        a: "₹0. Workspace, AI compute, mentorship, logistics — all covered. This is not a paid bootcamp. We invest in builders and take nothing from you."
    },
    {
        q: "What happens after the cohort?",
        a: "Five paths: secure seed funding, get talent-acquired, acqui-hired, acquired outright, or enter deep tech incubation via AIC SEED at IISER Pune for extended R&D and grant applications. Plus permanent access to the EPOCH alumni network."
    },
    {
        q: "I have more questions.",
        a: "Email epoch.mavericks@gmail.com — we read every message."
    }
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="section" id="faq">
            <div className="container container-narrow">
                <div className="section-label">// FAQ</div>
                <h2 className="section-title fade-in">Questions.</h2>

                <div className="faq-list fade-in" style={{ transitionDelay: '0.1s' }}>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`faq-item ${open === i ? 'faq-open' : ''}`}
                            onClick={() => setOpen(open === i ? null : i)}
                        >
                            <div className="faq-question">
                                <span>{faq.q}</span>
                                <span className="faq-toggle">{open === i ? '−' : '+'}</span>
                            </div>
                            {open === i && (
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
