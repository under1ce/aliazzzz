// gameLogic.js
export const getUpdatedTeams = (teams) => teams;



export const getNextTeamIndex = (currentIndex, totalTeams) => {
  return (currentIndex + 1) % totalTeams;
};