import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function ApplyForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [applyType, setApplyType] = useState<'solo' | 'team'>('solo');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        github_url: '',
        twitter_url: '',
        project_description: '',
        track: 'STAGE 0',
        apply_type: 'solo',
        team_size: '',
        team_members: '',
        team_role: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTypeSwitch = (type: 'solo' | 'team') => {
        setApplyType(type);
        setFormData({ ...formData, apply_type: type });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: insertError } = await supabase
            .from('applications')
            .insert([formData]);

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <section className="apply-section">
                <div className="apply-container">
                    <div className="apply-box fade-in" style={{ textAlign: 'center' }}>
                        <h2 className="section-title">TRANSMISSION RECEIVED.</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Your metrics are being evaluated. Do not follow up. We will open a channel if you meet the threshold.
                        </p>
                        <Link to="/" className="btn-secondary">RETURN TO ROOT</Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="apply-section">
            <div className="apply-container">

                <Link to="/" className="nav-logo" style={{ marginBottom: '4rem', display: 'inline-block' }}>
                    &lt; RETURN
                </Link>
                <h1 className="massive-text fade-in">EXECUTE.</h1>

                <div className="apply-box fade-in" style={{ transitionDelay: '0.1s' }}>
                    <div className="sys-message">
                        <p className="prompt">&gt; INITIATION PROTOCOL // ACTIVATED</p>
                        <p style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Most won't make it to this page.</p>
                        <p>You've taken the first step. That puts you in the top 1%. But intent without execution is a void. Prove you belong in the room.</p>
                    </div>

                    {error && (
                        <div style={{ padding: '1rem', border: '1px solid #ff5f56', background: 'rgba(255, 95, 86, 0.1)', color: '#ff5f56', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
                            [ERROR]: {error}
                        </div>
                    )}

                    {/* Solo / Team Toggle */}
                    <div className="apply-toggle">
                        <button
                            type="button"
                            className={`toggle-btn ${applyType === 'solo' ? 'toggle-active' : ''}`}
                            onClick={() => handleTypeSwitch('solo')}
                        >
                            SOLO FOUNDER
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${applyType === 'team' ? 'toggle-active' : ''}`}
                            onClick={() => handleTypeSwitch('team')}
                        >
                            TEAM APPLICATION
                        </button>
                    </div>
                    <p className="form-hint" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        {applyType === 'solo'
                            ? "No co-founder? No problem. Week 1 is designed for team formation."
                            : "Applying as a team? Great. Each member should also submit individually."}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>NAME</label>
                            <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>EMAIL</label>
                            <input type="email" name="email" required placeholder="root@localhost.com" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>GITHUB [URL]</label>
                            <input type="url" name="github_url" required placeholder="https://github.com/..." value={formData.github_url} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>TWITTER / X [URL]</label>
                            <input type="url" name="twitter_url" placeholder="https://x.com/..." value={formData.twitter_url} onChange={handleChange} />
                        </div>

                        {applyType === 'team' && (
                            <>
                                <div className="form-group">
                                    <label>TEAM SIZE</label>
                                    <select name="team_size" value={formData.team_size} onChange={handleChange}>
                                        <option value="">Select team size</option>
                                        <option value="2">2 people</option>
                                        <option value="3">3 people</option>
                                        <option value="4">4 people</option>
                                        <option value="5+">5+ people</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>YOUR ROLE IN THE TEAM</label>
                                    <input type="text" name="team_role" placeholder="e.g. Technical Lead, Product, Design, Business" value={formData.team_role} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>TEAM MEMBERS (Names + Emails)</label>
                                    <textarea name="team_members" placeholder="List your team members and their emails — one per line.&#10;e.g. Priya Sharma — priya@gmail.com — Backend&#10;     Rahul Verma — rahul@gmail.com — Product" value={formData.team_members} onChange={handleChange}></textarea>
                                    <span className="form-hint">Each team member should also submit their own individual application.</span>
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label>WHAT ARE YOU BUILDING?</label>
                            <textarea name="project_description" required placeholder="Be ruthless. What problem are you solving? Why are you the one to solve it? (Max 500 words)" value={formData.project_description} onChange={handleChange}></textarea>
                            <span className="form-hint">If you are Stage 0, tell us the hardest technical problem you've ever solved instead.</span>
                        </div>

                        <div className="form-group">
                            <label>TRACK SELECTION</label>
                            <select name="track" value={formData.track} onChange={handleChange}>
                                <option value="STAGE 0">STAGE 0 [IDEATOR] — Zero Lines Shipped</option>
                                <option value="STAGE 1">STAGE 1 [EARLY FOUNDER] — Repo Exists, Zero Revenue</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-primary huge-btn" disabled={loading} style={{ marginTop: '2rem' }}>
                            <div className="btn-edge-left"></div>
                            {loading ? 'TRANSMITTING...' : 'INITIALIZE SUBMISSION_'}
                            <div className="btn-edge-right"></div>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
