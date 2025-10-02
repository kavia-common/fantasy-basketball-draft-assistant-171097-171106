import React, { createContext, useContext, useMemo, useState } from 'react';

// Simple mock roster & auction state
const initialPlayers = [
  { id: 1, name: 'Nikola Jokic', pos: ['C'], est: 65, team: 'DEN' },
  { id: 2, name: 'Luka Doncic', pos: ['PG'], est: 58, team: 'DAL' },
  { id: 3, name: 'Shai Gilgeous-Alexander', pos: ['PG', 'SG'], est: 55, team: 'OKC' },
  { id: 4, name: 'Giannis Antetokounmpo', pos: ['PF', 'C'], est: 54, team: 'MIL' },
  { id: 5, name: 'Jayson Tatum', pos: ['SF', 'PF'], est: 53, team: 'BOS' },
  { id: 6, name: 'Tyrese Haliburton', pos: ['PG'], est: 50, team: 'IND' },
  { id: 7, name: 'Anthony Davis', pos: ['PF', 'C'], est: 49, team: 'LAL' },
  { id: 8, name: 'Stephen Curry', pos: ['PG'], est: 45, team: 'GSW' },
];

const initialTeams = [
  { id: 'you', name: 'My Team', budget: 200, roster: [] },
  { id: 't2', name: 'Rim Runners', budget: 180, roster: [{ id: 8, name: 'Stephen Curry', pos: ['PG'], price: 44 }] },
  { id: 't3', name: 'Paint Masters', budget: 160, roster: [{ id: 7, name: 'Anthony Davis', pos: ['PF', 'C'], price: 48 }] },
];

const MockDataContext = createContext({
  // PUBLIC_INTERFACE
  players: [],
  // PUBLIC_INTERFACE
  teams: [],
  // PUBLIC_INTERFACE
  nominate: (_id) => {},
  // PUBLIC_INTERFACE
  bid: (_teamId, _amount) => {},
  // PUBLIC_INTERFACE
  state: { current: null, highBid: null, history: [] }
});

// PUBLIC_INTERFACE
export const MockProvider = ({ children }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [teams, setTeams] = useState(initialTeams);
  const [current, setCurrent] = useState(null); // current player on the block
  const [highBid, setHighBid] = useState(null); // { teamId, amount }
  const [history, setHistory] = useState([]);

  const nominate = (playerId) => {
    const p = players.find(pl => pl.id === playerId);
    if (!p) return;
    setCurrent(p);
    setHighBid(null);
  };

  const bid = (teamId, amount) => {
    if (!current) return;
    if (!highBid || amount > highBid.amount) {
      setHighBid({ teamId, amount });
    }
  };

  const finalize = () => {
    if (!current || !highBid) return;
    // assign to winning team
    setTeams(prev => prev.map(t => {
      if (t.id === highBid.teamId) {
        return {
          ...t,
          budget: Math.max(0, t.budget - highBid.amount),
          roster: [...t.roster, { id: current.id, name: current.name, pos: current.pos, price: highBid.amount }]
        };
      }
      return t;
    }));
    setPlayers(prev => prev.filter(pl => pl.id !== current.id));
    setHistory(prev => [{ player: current, win: highBid }, ...prev].slice(0, 10));
    setCurrent(null);
    setHighBid(null);
  };

  const value = useMemo(() => ({
    players,
    teams,
    nominate,
    bid,
    finalize,
    state: { current, highBid, history }
  }), [players, teams, current, highBid, history]);

  return <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>;
};

// PUBLIC_INTERFACE
export const useMock = () => useContext(MockDataContext);
