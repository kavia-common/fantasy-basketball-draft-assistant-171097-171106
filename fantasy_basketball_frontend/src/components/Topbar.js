import React from 'react';
import '../styles/theme.css';
import '../styles/layout.css';
import { useTheme } from '../context/ThemeContext';

// PUBLIC_INTERFACE
export default function Topbar({ title }) {
  const { toggle } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        <button className="btn" onClick={toggle} aria-label="Toggle theme">Theme</button>
        <button className="btn">Settings</button>
        <button className="btn btn-accent">Help</button>
      </div>
    </header>
  );
}
