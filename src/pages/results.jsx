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

    // Animation for the container
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
      {/* Header */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-10">
        <img src="Rules/shapka.svg" alt="Alias Logo" className="w-full max-w-md" />
      </div>

      {/* Scores */}
      <motion.div
        className="relative mt-[120px] w-full flex flex-col items-center text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={containerControls}
      >
        <h3 className="text-2xl font-semibold mb-4">Общий рейтинг:</h3>
        <ul>
          {updatedScores.map((team, index) => (
            <li key={index} className="text-lg">
              {team.name}: {team.score} очков
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Results */}
      <motion.div
        className="relative text-center text-white mt-[20px] px-6 py-8"
        initial={{ y: 50, opacity: 0 }}
        animate={containerControls}
      >
        <h2 className="text-3xl font-bold mb-4">Результаты раунда:</h2>

        <div className="mt-4">
          <h3 className="text-2xl font-semibold">{teamName}</h3>

          {/* Контейнер с угаданными словами (прокручиваемый) */}
          <div className="flex justify-center items-center mt-0">
            <div className="bg-[#80000065] p-6 rounded-lg shadow-lg w-full sm:w-11/12 md:w-9/12 lg:w-1/2 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {wordsHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`text-lg p-2 rounded-lg text-center ${
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

      {/* Fixed Next Round Button */}
      <motion.button
        onClick={handleNextRound}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#FFD686] text-[#292D32] py-3 px-12 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300"
        whileTap={{ scale: 0.95 }}
      >
        Следующий раунд
      </motion.button>
    </div>
  );
};

export default Results;
