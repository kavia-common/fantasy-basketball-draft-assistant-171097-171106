# Fantasy Basketball Draft Assistant (Frontend)

Ocean Professional themed, minimalist React application to assist during live auction drafts with actionable, real-time guidance (mocked initially).

## Features
- Dashboard layout:
  - Left sidebar navigation
  - Main draft interface (nominate, bid, finalize)
  - Right guidance panel with live, context-aware tips
- Team rosters view
- Mock data for players, teams, live auction state
- Clean, minimalist "Ocean Professional" style

## Getting Started

Install dependencies and run:

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm start` - Start development server
- `npm run build` - Production build
- `npm test` - Run tests

## Project Structure

```
src/
  components/
    DraftInterface.js
    GuidancePanel.js
    Sidebar.js
    TeamRoster.js
    Topbar.js
  context/
    MockDataContext.js
    ThemeContext.js
  styles/
    layout.css
    theme.css
  App.js
  App.css
  index.js
  index.css
```

## Theming

All theme tokens are defined in `src/styles/theme.css` and `src/index.css`:
- Primary: #374151
- Secondary: #9CA3AF
- Success: #10B981
- Error: #EF4444
- Background: #FFFFFF
- Surface: #F9FAFB
- Text: #111827

## Notes

- All guidance and auction logic is mocked for initial implementation. No external services are integrated yet.
- The app is componentized for future expansion (APIs, sockets, deeper analytics).
