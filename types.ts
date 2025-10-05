
export interface Player {
  id: number;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  status: 'striker' | 'non-striker' | 'out' | 'waiting';
  outMethod?: string;
}

export interface Bowler {
  id: number;
  name: string;
  overs: number;
  maidens: number;
  runsConceded: number;
  wickets: number;
  economyRate: number;
  isBowling: boolean;
}

export interface MatchState {
  teamA: { name: string; players: Player[] };
  teamB: { name: string; players: Player[] };
  battingTeam: string;
  bowlingTeam: string;
  score: number;
  wickets: number;
  overs: number;
  ballsThisOver: number;
  target?: number;
  strikerId: number;
  nonStrikerId: number;
  currentBowlerId: number;
  bowlers: Bowler[];
  commentary: { id: number; text: string }[];
  matchStatus: string;
  isGameOver: boolean;
  lastBall: string;
}
