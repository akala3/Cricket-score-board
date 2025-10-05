
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import BattingCard from './components/BattingCard';
import BowlingCard from './components/BowlingCard';
import Commentary from './components/Commentary';
import Controls from './components/Controls';
import { MatchState, Player } from './types';
import { INITIAL_MATCH_STATE } from './constants';
import { getLiveCommentary } from './services/geminiService';

const App: React.FC = () => {
  const [matchState, setMatchState] = useState<MatchState>(INITIAL_MATCH_STATE);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateCommentary = useCallback(async (newState: MatchState) => {
    if (!newState.isGameOver && newState.lastBall) {
        setIsGenerating(true);
        const newCommentaryText = await getLiveCommentary(newState);
        setMatchState(prevState => ({
            ...prevState,
            commentary: [{ id: Date.now(), text: newCommentaryText }, ...prevState.commentary.slice(0, 20)]
        }));
        setIsGenerating(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (matchState.lastBall) {
        updateCommentary(matchState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchState.lastBall, matchState.score]);

  const handleBallPlayed = (outcome: string | number) => {
    setMatchState(prevState => {
      let newState = JSON.parse(JSON.stringify(prevState)) as MatchState;
      let runsScored = 0;
      let isWicket = false;
      let isExtra = false;
      let lastBallDescription = "";

      const battingPlayers = newState.battingTeam === newState.teamA.name ? newState.teamA.players : newState.teamB.players;
      
      const striker = battingPlayers.find(p => p.id === newState.strikerId);
      const nonStriker = battingPlayers.find(p => p.id === newState.nonStrikerId);
      const bowler = newState.bowlers.find(b => b.id === newState.currentBowlerId);

      if (!striker || !bowler) return prevState;

      // Handle outcomes
      if (typeof outcome === 'number') {
        runsScored = outcome;
        lastBallDescription = `${runsScored} run${runsScored !== 1 ? 's' : ''}`;
      } else if (outcome === 'W') {
        isWicket = true;
        lastBallDescription = "WICKET!";
      } else if (outcome === 'WD') {
        runsScored = 1;
        isExtra = true;
        lastBallDescription = "Wide";
      } else if (outcome === 'NB') {
        runsScored = 1;
        isExtra = true;
        lastBallDescription = "No Ball";
      }
      
      // Update score
      newState.score += runsScored;
      bowler.runsConceded += runsScored;

      if (!isExtra) {
        newState.ballsThisOver++;
        striker.balls++;
      }

      // Update player stats
      if (typeof outcome === 'number') {
        striker.runs += runsScored;
        if (runsScored === 4) striker.fours++;
        if (runsScored === 6) striker.sixes++;
      }

      // Handle Wicket
      if (isWicket) {
        newState.wickets++;
        striker.status = 'out';
        striker.outMethod = `b ${bowler.name}`;
        bowler.wickets++;

        if (newState.wickets < 10) {
            const nextBatter = battingPlayers.find(p => p.status === 'waiting');
            if (nextBatter) {
                nextBatter.status = 'striker';
                newState.strikerId = nextBatter.id;
            } else {
                newState.isGameOver = true;
            }
        } else {
             newState.isGameOver = true;
        }
      }

      // Update Strike Rate & Economy Rate
      striker.strikeRate = striker.balls > 0 ? (striker.runs / striker.balls) * 100 : 0;
      
      const bowlerBalls = Math.floor(bowler.overs) * 6 + (bowler.overs * 10 % 10);
      bowler.economyRate = bowlerBalls > 0 ? (bowler.runsConceded / bowlerBalls) * 6 : 0;
      
      // Rotate strike
      if (typeof outcome === 'number' && outcome % 2 !== 0) {
        [newState.strikerId, newState.nonStrikerId] = [newState.nonStrikerId, newState.strikerId];
      }
      
      // End of over logic
      if (newState.ballsThisOver === 6) {
        newState.overs++;
        newState.ballsThisOver = 0;
        bowler.overs = parseFloat((Math.floor(bowler.overs) + 1).toFixed(1));
        
        // Rotate strike at end of over
        [newState.strikerId, newState.nonStrikerId] = [newState.nonStrikerId, newState.strikerId];
        
        // Change bowler (simple logic)
        bowler.isBowling = false;
        const nextBowlerIndex = (newState.bowlers.findIndex(b => b.id === bowler.id) + 1) % newState.bowlers.length;
        newState.currentBowlerId = newState.bowlers[nextBowlerIndex].id;
        newState.bowlers[nextBowlerIndex].isBowling = true;

      } else if (!isExtra) {
         bowler.overs = parseFloat((Math.floor(bowler.overs) + newState.ballsThisOver / 10).toFixed(1));
      }
      
      // Update player statuses for highlighting
      battingPlayers.forEach(p => {
          if (p.id === newState.strikerId) p.status = 'striker';
          else if (p.id === newState.nonStrikerId) p.status = 'non-striker';
          else if (p.status !== 'out') p.status = 'waiting';
      });

      // Update match status
      if(newState.isGameOver) {
          newState.matchStatus = `${newState.battingTeam} are all out for ${newState.score}.`;
      } else {
          newState.matchStatus = `Current Run Rate: ${(newState.score / (newState.overs + newState.ballsThisOver / 6)).toFixed(2) || '0.00'}`;
      }
      
      newState.lastBall = lastBallDescription;

      return newState;
    });
  };
  
  const battingTeamPlayers = matchState.battingTeam === matchState.teamA.name ? matchState.teamA.players : matchState.teamB.players;

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header 
          battingTeam={matchState.battingTeam} 
          bowlingTeam={matchState.bowlingTeam}
          matchStatus={matchState.matchStatus}
        />
        <main>
          <Scoreboard 
            score={matchState.score}
            wickets={matchState.wickets}
            overs={matchState.overs}
            ballsThisOver={matchState.ballsThisOver}
            battingTeam={matchState.battingTeam}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BattingCard players={battingTeamPlayers} teamName={matchState.battingTeam}/>
            <BowlingCard bowlers={matchState.bowlers} teamName={matchState.bowlingTeam}/>
          </div>
          
          <Commentary commentary={matchState.commentary} isGenerating={isGenerating}/>
          
          <Controls onBallPlay={handleBallPlayed} disabled={matchState.isGameOver || isGenerating} />
        </main>
      </div>
    </div>
  );
};

export default App;
