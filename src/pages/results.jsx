import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { updateTeamScores, checkForWinner } from "../gameRules";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { teamName, wordsHistory, allScores, nextTeamIndex } = location.state || {};

  const [updatedScores, setUpdatedScores] = useState([]);
  const containerControls = useAnimation();

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setUpdatedScores(savedTeams);

    const winner = checkForWinner(savedTeams);
    if (winner) {
      setTimeout(() => {
        navigate("/winner", { state: { winnerName: winner.name } });
      }, 1000);
    }

    localStorage.setItem("currentTeamIndex", nextTeamIndex.toString());

    containerControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, []);

  const handleNextRound = () => {
    navigate("/start", { state: { nextTeamIndex } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 py-8 relative">
      {/* Scores */}
      <motion.div
        className="relative w-full flex flex-col items-center text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={containerControls}
      >
        <h3 className="text-2xl font-semibold mb-4">Общий рейтинг:</h3>
        <ul className="text-center">
          {updatedScores.map((team, index) => (
            <li key={index} className="text-lg flex items-center justify-center gap-2 mb-2">
              <img 
                src={`Teams/${team.icon}`} 
                alt={team.name} 
                className="w-8 h-8 rounded-full"
              />
              {team.name}: {team.score} очков
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Results */}
      <motion.div
        className="relative text-center text-white -mt-6 px-4 py-4"
        initial={{ y: 50, opacity: 0 }}
        animate={containerControls}
      >
        <h2 className="text-3xl font-bold mb-4">Результаты раунда:</h2>

        <div className="mt-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src={`Teams/${updatedScores.find(team => team.name === teamName)?.icon}`} 
              alt={teamName} 
              className="w-16 h-16 rounded-full"
            />
            <h3 className="text-2xl font-semibold">{teamName}</h3>
          </div>

          {/* Words History Container */}
          <div className="flex justify-center items-center mt-4">
            <div 
              className="bg-[#80000065] p-4 rounded-lg shadow-lg w-full max-w-md max-h-[50vh] overflow-y-auto touch-pan-y"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.3) transparent'
              }}
            >
              <div className="grid grid-cols-2 gap-2">
                {wordsHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`text-base p-2 rounded-lg text-center ${
                      item.isGuessed ? "bg-[#80000000] text-white" : "bg-[#ff000063] text-white"
                    }`}
                  >
                    {item.word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Round Button */}
      <motion.button
        onClick={handleNextRound}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#FFD686] text-[#292D32] py-3 px-13 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300"
        whileTap={{ scale: 0.95 }}
      >
        Следующий раунд
      </motion.button>
    </div>
  );
};

export default Results;