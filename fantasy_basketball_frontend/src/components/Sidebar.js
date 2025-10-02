import React from 'react';
import '../styles/theme.css';
import '../styles/layout.css';

// PUBLIC_INTERFACE
export default function Sidebar({ onNavigate, active }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand" aria-label="Application brand">
        <div className="brand-logo" />
        <div className="brand-name">Ocean Draft</div>
      </div>
      <nav className="nav">
        <button
          className={active === 'draft' ? 'active' : ''}
          onClick={() => onNavigate('draft')}
          aria-current={active === 'draft' ? 'page' : undefined}
        >
          Draft
        </button>
        <button
          className={active === 'roster' ? 'active' : ''}
          onClick={() => onNavigate('roster')}
          aria-current={active === 'roster' ? 'page' : undefined}
        >
          Team Roster
        </button>
        <button
          className={active === 'insights' ? 'active' : ''}
          onClick={() => onNavigate('insights')}
          aria-current={active === 'insights' ? 'page' : undefined}
        >
          Insights
        </button>
      </nav>
    </aside>
  );
}
