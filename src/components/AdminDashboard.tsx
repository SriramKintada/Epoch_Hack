import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface Application {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    city: string | null;
    best_link: string | null;
    twitter_url: string | null;
    apply_type: string;
    track: string;
    building: string | null;
    impressive: string | null;
    why_epoch: string | null;
    can_commit: string | null;
    video_url: string | null;
    team_size: string | null;
    team_members: string | null;
    team_role: string | null;
    status: string | null;
    score: number | null;
    ai_score: number | null;
    ai_notes: string | null;
    reviewer_notes: string | null;
    source: string | null;
    created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
    pending: '#ffb800',
    reviewed: '#00aaff',
    accepted: '#00ff88',
    rejected: '#ff4444',
    waitlisted: '#aa66ff',
};

const COMMITMENT_LABELS: Record<string, string> = {
    yes_all: '✅ All 4',
    yes_most: '⚠️ 3 of 4',
    unsure: '❓ Unsure',
    remote: '🌐 Some remote',
};

export default function AdminDashboard() {
    const [apps, setApps] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Application | null>(null);
    const [filter, setFilter] = useState('all');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchApps();
    }, []);

    const fetchApps = async () => {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) setApps(data);
        setLoading(false);
    };

    const updateApp = async (id: string, updates: Partial<Application>) => {
        setSaving(true);
        const { error } = await supabase
            .from('applications')
            .update(updates)
            .eq('id', id);
        if (!error) {
            setApps(apps.map(a => a.id === id ? { ...a, ...updates } : a));
            if (selected?.id === id) setSelected({ ...selected, ...updates } as Application);
        }
        setSaving(false);
    };

    const exportCSV = () => {
        const headers = ['name', 'email', 'phone', 'city', 'track', 'apply_type', 'building', 'impressive', 'why_epoch', 'can_commit', 'best_link', 'twitter_url', 'video_url', 'team_size', 'team_role', 'team_members', 'status', 'score', 'ai_score', 'ai_notes', 'reviewer_notes', 'source', 'created_at'];
        const csvRows = [headers.join(',')];
        for (const app of filteredApps) {
            const row = headers.map(h => {
                const val = (app as Record<string, unknown>)[h];
                const str = val == null ? '' : String(val).replace(/"/g, '""');
                return `"${str}"`;
            });
            csvRows.push(row.join(','));
        }
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `epoch-applications-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
    };

    const filteredApps = filter === 'all' ? apps : apps.filter(a => (a.status || 'pending') === filter);

    const stats = {
        total: apps.length,
        pending: apps.filter(a => !a.status || a.status === 'pending').length,
        reviewed: apps.filter(a => a.status === 'reviewed').length,
        accepted: apps.filter(a => a.status === 'accepted').length,
        rejected: apps.filter(a => a.status === 'rejected').length,
        waitlisted: apps.filter(a => a.status === 'waitlisted').length,
        stage0: apps.filter(a => a.track === 'STAGE 0').length,
        stage1: apps.filter(a => a.track === 'STAGE 1').length,
        teams: apps.filter(a => a.apply_type === 'team').length,
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#888', fontFamily: 'monospace' }}>Loading applications...</div>;

    return (
        <div className="admin-wrap">
            {/* Header */}
            <div className="admin-header">
                <div>
                    <Link to="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>&lt; BACK TO SITE</Link>
                    <h1 style={{ fontFamily: 'var(--font-head, "Space Grotesk", sans-serif)', fontSize: '1.5rem', marginTop: '0.5rem' }}>EPOCH_ ADMIN</h1>
                </div>
                <button onClick={exportCSV} className="admin-btn">↓ EXPORT CSV</button>
            </div>

            {/* Stats Bar */}
            <div className="admin-stats">
                <div className="stat-card" onClick={() => setFilter('all')}>
                    <div className="stat-num">{stats.total}</div>
                    <div className="stat-label">Total</div>
                </div>
                <div className="stat-card" onClick={() => setFilter('pending')}>
                    <div className="stat-num" style={{ color: '#ffb800' }}>{stats.pending}</div>
                    <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card" onClick={() => setFilter('accepted')}>
                    <div className="stat-num" style={{ color: '#00ff88' }}>{stats.accepted}</div>
                    <div className="stat-label">Accepted</div>
                </div>
                <div className="stat-card" onClick={() => setFilter('rejected')}>
                    <div className="stat-num" style={{ color: '#ff4444' }}>{stats.rejected}</div>
                    <div className="stat-label">Rejected</div>
                </div>
                <div className="stat-card" onClick={() => setFilter('waitlisted')}>
                    <div className="stat-num" style={{ color: '#aa66ff' }}>{stats.waitlisted}</div>
                    <div className="stat-label">Waitlisted</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num">{stats.stage0}/{stats.stage1}</div>
                    <div className="stat-label">S0/S1</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num">{stats.teams}</div>
                    <div className="stat-label">Teams</div>
                </div>
            </div>

            <div className="admin-body">
                {/* Table */}
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Track</th>
                                <th>City</th>
                                <th>Commit</th>
                                <th>Status</th>
                                <th>Score</th>
                                <th>AI</th>
                                <th>Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApps.map(app => (
                                <tr key={app.id} onClick={() => setSelected(app)} className={selected?.id === app.id ? 'row-selected' : ''}>
                                    <td>
                                        <strong>{app.name}</strong>
                                        <br /><span style={{ fontSize: '0.75rem', color: '#888' }}>{app.email}</span>
                                        {app.apply_type === 'team' && <span className="tag tag-team">TEAM</span>}
                                    </td>
                                    <td><span className={`tag tag-${app.track === 'STAGE 0' ? 's0' : 's1'}`}>{app.track === 'STAGE 0' ? 'S0' : 'S1'}</span></td>
                                    <td>{app.city || '—'}</td>
                                    <td>{COMMITMENT_LABELS[app.can_commit || ''] || '—'}</td>
                                    <td>
                                        <span className="status-dot" style={{ background: STATUS_COLORS[app.status || 'pending'] }}></span>
                                        {app.status || 'pending'}
                                    </td>
                                    <td>{app.score ?? '—'}</td>
                                    <td>{app.ai_score ?? '—'}</td>
                                    <td>{new Date(app.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredApps.length === 0 && <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No applications match this filter.</p>}
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div className="admin-detail">
                        <div className="detail-header">
                            <h2>{selected.name}</h2>
                            <button onClick={() => setSelected(null)} className="detail-close">✕</button>
                        </div>

                        <div className="detail-grid">
                            <div className="detail-field"><span className="dl">Email</span><span className="dv">{selected.email}</span></div>
                            <div className="detail-field"><span className="dl">Phone</span><span className="dv">{selected.phone || '—'}</span></div>
                            <div className="detail-field"><span className="dl">City</span><span className="dv">{selected.city || '—'}</span></div>
                            <div className="detail-field"><span className="dl">Track</span><span className="dv">{selected.track}</span></div>
                            <div className="detail-field"><span className="dl">Type</span><span className="dv">{selected.apply_type}</span></div>
                            <div className="detail-field"><span className="dl">Commitment</span><span className="dv">{COMMITMENT_LABELS[selected.can_commit || ''] || '—'}</span></div>
                        </div>

                        <div className="detail-section">
                            <span className="dl">Best Link</span>
                            {selected.best_link ? <a href={selected.best_link.startsWith('http') ? selected.best_link : `https://${selected.best_link}`} target="_blank" rel="noreferrer" style={{ color: '#00aaff', wordBreak: 'break-all' }}>{selected.best_link}</a> : '—'}
                        </div>
                        {selected.twitter_url && <div className="detail-section"><span className="dl">Twitter</span><a href={selected.twitter_url.startsWith('http') ? selected.twitter_url : `https://${selected.twitter_url}`} target="_blank" rel="noreferrer" style={{ color: '#00aaff', wordBreak: 'break-all' }}>{selected.twitter_url}</a></div>}
                        {selected.video_url && <div className="detail-section"><span className="dl">Video</span><a href={selected.video_url.startsWith('http') ? selected.video_url : `https://${selected.video_url}`} target="_blank" rel="noreferrer" style={{ color: '#00aaff', wordBreak: 'break-all' }}>{selected.video_url}</a></div>}

                        <div className="detail-section">
                            <span className="dl">What are you building?</span>
                            <p className="detail-text">{selected.building || '—'}</p>
                        </div>
                        <div className="detail-section">
                            <span className="dl">Most impressive thing?</span>
                            <p className="detail-text">{selected.impressive || '—'}</p>
                        </div>
                        <div className="detail-section">
                            <span className="dl">Why EPOCH?</span>
                            <p className="detail-text">{selected.why_epoch || '—'}</p>
                        </div>

                        {selected.apply_type === 'team' && (
                            <div className="detail-section">
                                <span className="dl">Team ({selected.team_size} people) — Role: {selected.team_role}</span>
                                <p className="detail-text" style={{ whiteSpace: 'pre-wrap' }}>{selected.team_members || '—'}</p>
                            </div>
                        )}

                        {/* AI Analysis */}
                        <div className="detail-section" style={{ borderTop: '1px solid #222', paddingTop: '1rem', marginTop: '1rem' }}>
                            <span className="dl" style={{ color: '#00ff88' }}>AI Score: {selected.ai_score ?? 'Not scored'}</span>
                            {selected.ai_notes && <p className="detail-text" style={{ color: '#aaa' }}>{selected.ai_notes}</p>}
                        </div>

                        {/* Admin Controls */}
                        <div className="admin-controls">
                            <div className="control-row">
                                <label>Status</label>
                                <select
                                    value={selected.status || 'pending'}
                                    onChange={e => updateApp(selected.id, { status: e.target.value })}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="waitlisted">Waitlisted</option>
                                </select>
                            </div>
                            <div className="control-row">
                                <label>Your Score (1-5)</label>
                                <select
                                    value={selected.score ?? ''}
                                    onChange={e => updateApp(selected.id, { score: e.target.value ? Number(e.target.value) : null })}
                                >
                                    <option value="">—</option>
                                    <option value="1">1 — Weak</option>
                                    <option value="2">2 — Below avg</option>
                                    <option value="3">3 — Average</option>
                                    <option value="4">4 — Strong</option>
                                    <option value="5">5 — Exceptional</option>
                                </select>
                            </div>
                            <div className="control-row">
                                <label>Reviewer Notes</label>
                                <textarea
                                    value={selected.reviewer_notes || ''}
                                    placeholder="Your notes on this applicant..."
                                    onChange={e => {
                                        setSelected({ ...selected, reviewer_notes: e.target.value });
                                    }}
                                    onBlur={e => updateApp(selected.id, { reviewer_notes: e.target.value })}
                                />
                            </div>
                        </div>
                        {saving && <p style={{ color: '#ffb800', fontSize: '0.8rem', textAlign: 'center' }}>Saving...</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
