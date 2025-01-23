// gameRules.js

// Обновление счета команд с учетом накопленных очков
export function updateTeamScores(teams, currentTeamIndex, roundScore) {
    return teams.map((team, index) => {
      if (index === currentTeamIndex) {
        return { ...team, score: (team.score || 0) + roundScore };
      }
      return team;
    });
  }
  
  // Проверка на победу
  export function checkForWinner(teams, maxScore = 60) {
    const winner = teams.find(team => team.score >= maxScore) || null;
  
    if (winner) {
      localStorage.setItem("winner", JSON.stringify(winner)); // Сохраняем победителя
    }
  
    return winner;
  }
  
  