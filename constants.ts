
import { Player, Bowler, MatchState } from './types';

const TEAM_A_PLAYERS: Player[] = [
  { id: 1, name: 'R. Sharma', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'striker' },
  { id: 2, name: 'S. Gill', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'non-striker' },
  { id: 3, name: 'V. Kohli', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 4, name: 'S. Yadav', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 5, name: 'R. Pant', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 6, name: 'H. Pandya', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 7, name: 'R. Jadeja', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 8, name: 'A. Patel', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 9, name: 'K. Yadav', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 10, name: 'J. Bumrah', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 11, name: 'A. Singh', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
];

const TEAM_B_PLAYERS: Player[] = [
  { id: 12, name: 'T. Head', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 13, name: 'D. Warner', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 14, name: 'M. Marsh', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 15, name: 'G. Maxwell', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 16, name: 'M. Stoinis', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 17, name: 'T. David', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 18, name: 'M. Wade', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 19, name: 'P. Cummins', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 20, name: 'M. Starc', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 21, name: 'A. Zampa', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
  { id: 22, name: 'J. Hazlewood', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, status: 'waiting' },
];


const BOWLERS: Bowler[] = [
    { id: 19, name: 'P. Cummins', overs: 0, maidens: 0, runsConceded: 0, wickets: 0, economyRate: 0, isBowling: true },
    { id: 20, name: 'M. Starc', overs: 0, maidens: 0, runsConceded: 0, wickets: 0, economyRate: 0, isBowling: false },
    { id: 21, name: 'A. Zampa', overs: 0, maidens: 0, runsConceded: 0, wickets: 0, economyRate: 0, isBowling: false },
    { id: 22, name: 'J. Hazlewood', overs: 0, maidens: 0, runsConceded: 0, wickets: 0, economyRate: 0, isBowling: false },
    { id: 15, name: 'G. Maxwell', overs: 0, maidens: 0, runsConceded: 0, wickets: 0, economyRate: 0, isBowling: false },
];

export const INITIAL_MATCH_STATE: MatchState = {
  teamA: { name: 'INDIA', players: TEAM_A_PLAYERS },
  teamB: { name: 'AUSTRALIA', players: TEAM_B_PLAYERS },
  battingTeam: 'INDIA',
  bowlingTeam: 'AUSTRALIA',
  score: 0,
  wickets: 0,
  overs: 0,
  ballsThisOver: 0,
  strikerId: 1,
  nonStrikerId: 2,
  currentBowlerId: 19,
  bowlers: BOWLERS,
  commentary: [{id: 0, text: "Welcome to this exciting T20 match between INDIA and AUSTRALIA! Let's get started."}],
  matchStatus: 'Match is about to begin.',
  isGameOver: false,
  lastBall: "",
};

export const CONTROL_BUTTONS = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "6", value: 6 },
    { label: "Wd", value: "WD" },
    { label: "NB", value: "NB" },
    { label: "W", value: "W" }
];
