import React from 'react';
import '../styles/theme.css';
import { useMock } from '../context/MockDataContext';

// PUBLIC_INTERFACE
export default function TeamRoster() {
  const { teams } = useMock();

  return (
    <div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="panel-title">Team Rosters</div>
        <div className="subtle">Track budgets and compositions across the league.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {teams.map(t => (
          <div className="card" key={t.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{t.name}</div>
              <div className="badge">Budget: ${t.budget}</div>
            </div>
            <div className="small muted" style={{ marginBottom: 8 }}>{t.roster.length} players</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {t.roster.length ? t.roster.map(p => (
                <div key={p.id} className="card" style={{ padding: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div className="small muted">{p.pos.join(', ')}</div>
                    </div>
                    <div className="badge">${p.price}</div>
                  </div>
                </div>
              )) : <div className="small muted">No players yet.</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
