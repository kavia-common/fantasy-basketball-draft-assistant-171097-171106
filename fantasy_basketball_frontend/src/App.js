import React, { useMemo, useState } from 'react';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DraftInterface from './components/DraftInterface';
import GuidancePanel from './components/GuidancePanel';
import TeamRoster from './components/TeamRoster';
import { ThemeProvider } from './context/ThemeContext';
import { MockProvider } from './context/MockDataContext';

// PUBLIC_INTERFACE
function App() {
  /**
   * This component composes the main dashboard layout:
   * - Left: Sidebar navigation
   * - Center: Draft interface and roster
   * - Right: Guidance panel
   */
  const [activeView, setActiveView] = useState('draft'); // 'draft' | 'roster' | 'insights'

  const content = useMemo(() => {
    switch (activeView) {
      case 'roster':
        return <TeamRoster />;
      case 'insights':
        return <GuidancePanel embedded />;
      case 'draft':
      default:
        return <DraftInterface />;
    }
  }, [activeView]);

  return (
    <ThemeProvider>
      <MockProvider>
        <div className="ocean-app">
          <Sidebar onNavigate={setActiveView} active={activeView} />
          <main className="ocean-main">
            <Topbar title="Fantasy Basketball Draft Assistant" />
            <div className="ocean-content">
              <section className="ocean-primary">
                {content}
              </section>
              <aside className="ocean-secondary">
                <GuidancePanel />
              </aside>
            </div>
          </main>
        </div>
      </MockProvider>
    </ThemeProvider>
  );
}

export default App;
