import React, { useMemo, useState } from 'react';
import '../styles/theme.css';
import { useMock } from '../context/MockDataContext';

// Simple pill component
const PosPill = ({ children }) => (
  <span className="badge" style={{ marginRight: 6 }}>{children}</span>
);

// PUBLIC_INTERFACE
export default function DraftInterface() {
  const { players, teams, nominate, bid, finalize, state } = useMock();
  const [quickBid, setQuickBid] = useState(1);

  const you = teams.find(t => t.id === 'you');

  const nextSuggestions = useMemo(() => {
    // Cheap "actionable guidance" mock: recommend top 3 est players within 30% budget
    const cap = Math.max(1, Math.floor((you?.budget ?? 0) * 0.3));
    return players
      .slice(0, 6)
      .filter(p => p.est <= cap)
      .slice(0, 3);
  }, [players, you]);

  return (
    <div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="panel-title">Live Auction</div>
            <div className="subtle">Nominate, bid, and track the current player.</div>
          </div>
          <div className="subtle">Budget: ${you?.budget ?? 0}</div>
        </div>
        <hr className="sep" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 12 }}>
          <div>
            {state.current ? (
              <div className="card" style={{ borderStyle: 'dashed' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{state.current.name}</div>
                    <div className="muted small">
                      {state.current.team} • {state.current.pos.map((p, i) => <PosPill key={i}>{p}</PosPill>)}
                    </div>
                  </div>
                  <div className="badge">Est: ${state.current.est}</div>
                </div>
                <hr className="sep" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="number"
                    className="input"
                    min="1"
                    value={quickBid}
                    onChange={e => setQuickBid(parseInt(e.target.value || '1', 10))}
                    aria-label="Bid amount"
                    style={{ width: 120 }}
                  />
                  <button className="btn btn-primary" onClick={() => bid('you', quickBid)}>
                    Place Bid
                  </button>
                  <button className="btn" onClick={() => bid('t2', quickBid + 1)}>
                    Simulate Opponent Bid
                  </button>
                  <button className="btn" onClick={finalize}>
                    Finalize
                  </button>
                </div>
                <div className="small muted" style={{ marginTop: 8 }}>
                  High Bid: {state.highBid ? `$${state.highBid.amount} (${(teams.find(t => t.id === state.highBid.teamId) || {}).name})` : 'No bids yet'}
                </div>
              </div>
            ) : (
              <div className="card" style={{ borderStyle: 'dashed' }}>
                <div className="panel-title">No player currently nominated</div>
                <div className="subtle">Pick a player from the list to start bidding.</div>
              </div>
            )}
          </div>
          <div className="card">
            <div className="panel-title">Actionable Suggestions</div>
            <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
              {nextSuggestions.length ? nextSuggestions.map(p => (
                <li key={p.id} style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <span className="muted small"> • target under ${Math.max(1, Math.floor(p.est * 1.1))}</span>
                </li>
              )) : <li className="muted small">No budget-aligned suggestions. Consider increasing max bid.</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="panel-title">Available Players</div>
        <div className="subtle" style={{ marginBottom: 8 }}>Click "Nominate" to put a player on the block.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
          {players.map(p => (
            <div key={p.id} className="card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div className="muted small">{p.team} • {p.pos.join(', ')}</div>
                </div>
                <div className="badge">Est: ${p.est}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn" onClick={() => nominate(p.id)}>Nominate</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
