import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTeamScores, checkForWinner } from "../gameRules";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { teamName, wordsHistory, allScores, nextTeamIndex } = location.state || {};

  const [updatedScores, setUpdatedScores] = useState([]);

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setUpdatedScores(savedTeams);
  
    // Проверяем победителя
    const winner = checkForWinner(savedTeams);
    if (winner) {
      setTimeout(() => {
        navigate("/winner", { state: { winnerName: winner.name } });
      }, 1000);
    }
  
    localStorage.setItem("currentTeamIndex", nextTeamIndex.toString());
  }, []);
  


  const handleNextRound = () => {
    navigate("/start", { state: { nextTeamIndex } });
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 relative">
      <div className="relative flex flex-col items-center mt-6">
        <img src="Rules/shapka.svg" alt="Alias Logo" className="items-center w-full max-w-md -mt-6" />
      </div>

      <div className="absolute top-20 w-full flex flex-col items-center text-white">
        <h3 className="text-2xl font-semibold mb-4">Общий рейтинг:</h3>
        <ul>
          {updatedScores.map((team, index) => (
            <li key={index} className="text-lg">
              {team.name}: {team.score} очков
            </li>
          ))}
        </ul>
      </div>

      <div className="relative text-center text-white mt-28 px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">Результаты раунда</h2>

        <div className="mt-4">
          <h3 className="text-2xl font-semibold">{teamName}</h3>
          <p className="text-xl">Слова по порядку:</p>
          <ul>
            {wordsHistory.map((item, index) => (
              <li key={index} className={`text-lg ${item.isGuessed ? "text-white" : "text-red-500"}`}>
                {item.word}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleNextRound}
          className="bg-[#FFD686] text-[#292D32] py-3 px-12 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300 mt-6"
        >
          Следующий раунд
        </button>
      </div>
    </div>
  );
}

export default Results;
