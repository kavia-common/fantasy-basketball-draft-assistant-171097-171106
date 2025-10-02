import React, { useMemo } from 'react';
import '../styles/theme.css';
import '../styles/layout.css';
import { useMock } from '../context/MockDataContext';

/**
 * A small metric row component
 */
const Metric = ({ label, value, color }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '8px 10px',
    background: '#fff'
  }}>
    <div className="small muted">{label}</div>
    <div style={{ fontWeight: 700, color: color || 'inherit' }}>{value}</div>
  </div>
);

// PUBLIC_INTERFACE
export default function GuidancePanel({ embedded = false }) {
  const { teams, state, players } = useMock();
  const you = teams.find(t => t.id === 'you');

  const exposure = useMemo(() => {
    // Basic mock "category" exposure: count of positions filled
    const posCount = (you?.roster || []).reduce((m, p) => {
      p.pos.forEach(x => { m[x] = (m[x] || 0) + 1; });
      return m;
    }, {});
    return posCount;
  }, [you]);

  const recommendations = useMemo(() => {
    const items = [];

    if (state.current) {
      const overpay = state.highBid && state.highBid.amount > (state.current.est * 1.15);
      if (overpay) {
        items.push({
          type: 'risk',
          text: `Bidding above 115% of estimate for ${state.current.name}. Consider pivoting or enforcing a price ceiling.`,
        });
      } else {
        items.push({
          type: 'tip',
          text: `Value window: ${state.current.name} estimated at $${state.current.est}. Optimal range: $${Math.floor(state.current.est * 0.95)} - $${Math.ceil(state.current.est * 1.1)}.`,
        });
      }
    }

    // If you lack PG or C, call out target suggestions.
    const needPG = (exposure['PG'] || 0) < 1;
    const needC = (exposure['C'] || 0) < 1;
    if (needPG) {
      const pg = players.find(p => p.pos.includes('PG'));
      if (pg) items.push({ type: 'need', text: `Positional need: PG. Consider ${pg.name} if budget permits.` });
    }
    if (needC) {
      const c = players.find(p => p.pos.includes('C'));
      if (c) items.push({ type: 'need', text: `Positional need: C. Consider ${c.name} to balance roster.` });
    }

    if (!items.length) {
      items.push({ type: 'info', text: 'Your roster is balanced. Prioritize best available value and price enforcement.' });
    }

    return items.slice(0, 5);
  }, [state, exposure, players]);

  return (
    <div>
      {!embedded && <div className="panel-title">Actionable Guidance</div>}
      {!embedded && <div className="subtle" style={{ marginBottom: 8 }}>Live, context-aware tips and risk checks.</div>}
      <div style={{ display: 'grid', gap: 8 }}>
        <Metric label="Budget Remaining" value={`$${you?.budget ?? 0}`} color="var(--primary)" />
        <Metric label="Roster Size" value={`${you?.roster?.length ?? 0}`} />
        <Metric label="On Block" value={state.current ? state.current.name : '—'} />
      </div>

      <hr className="sep" />

      <div className="panel-title">Recommendations</div>
      <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
        {recommendations.map((r, i) => {
          const color = r.type === 'risk' ? 'var(--error)' : r.type === 'need' ? 'var(--accent)' : 'inherit';
          return <li key={i} style={{ marginBottom: 8, color }}>{r.text}</li>;
        })}
      </ul>

      <hr className="sep" />

      <div className="panel-title">Recent Wins</div>
      <div className="small muted" style={{ marginBottom: 8 }}>Last 10 auction results.</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {state.history.length ? state.history.map((h, idx) => {
          const teamName = (teams.find(t => t.id === h.win.teamId) || {}).name || '—';
          return (
            <div key={idx} className="card" style={{ padding: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 600 }}>{h.player.name}</div>
                <div className="small muted">{teamName}</div>
              </div>
              <div className="small muted">Price: ${h.win.amount}</div>
            </div>
          );
        }) : <div className="small muted">No results yet.</div>}
      </div>
    </div>
  );
}
