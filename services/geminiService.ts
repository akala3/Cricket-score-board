
import { GoogleGenAI } from "@google/genai";
import { MatchState } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set. Please set the environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getLiveCommentary = async (matchState: MatchState): Promise<string> => {
  const { 
    score, 
    wickets, 
    overs, 
    ballsThisOver, 
    battingTeam, 
    bowlingTeam, 
    lastBall,
    teamA,
    teamB,
    strikerId,
    nonStrikerId,
    currentBowlerId
  } = matchState;

  const battingPlayers = battingTeam === teamA.name ? teamA.players : teamB.players;
  const striker = battingPlayers.find(p => p.id === strikerId);
  const nonStriker = battingPlayers.find(p => p.id === nonStrikerId);
  const bowler = matchState.bowlers.find(b => b.id === currentBowlerId);

  const prompt = `
    You are a world-class, charismatic, and slightly humorous cricket commentator.
    Generate a short, exciting, ball-by-ball commentary for a T20 cricket match.
    Keep it to 1-2 sentences.

    Current Match State:
    - Teams: ${battingTeam} vs ${bowlingTeam}
    - Score: ${score}/${wickets}
    - Overs: ${overs}.${ballsThisOver}
    - Striker: ${striker?.name} (${striker?.runs} runs off ${striker?.balls} balls)
    - Non-striker: ${nonStriker?.name} (${nonStriker?.runs} runs off ${nonStriker?.balls} balls)
    - Bowler: ${bowler?.name}

    The outcome of the last ball was: ${lastBall}.

    Now, give me the commentary for this ball.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching commentary from Gemini API:", error);
    return "There was a technical issue fetching live commentary.";
  }
};
