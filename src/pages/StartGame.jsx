import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function StartGame() {
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const location = useLocation();
  const handleStartGame = () => {
    localStorage.setItem("currentTeamIndex", currentTeamIndex.toString());
  };
  
  

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(savedTeams);

    // Получаем сохраненный индекс команды
    let newIndex = parseInt(localStorage.getItem("currentTeamIndex") || "0");

    // Если передан nextTeamIndex, используем его
    if (location.state?.nextTeamIndex !== undefined) {
      newIndex = location.state.nextTeamIndex;
    }

    setCurrentTeamIndex(newIndex);
  }, [location.state?.nextTeamIndex]);

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 relative">
      <div className="relative w-full flex flex-col items-center mt-6">
        <img src="Rules/shapka.svg" alt="Alias Logo" className="items-center w-full max-w-md -mt-6" />
      </div>

      <div className="relative flex justify-center items-center w-full max-w-md mt-6">
        <img src="Rules/Ellipse5.svg" alt="Ellipse Background" className="absolute w-full max-w-md h-auto" />

        <div className="relative z-10 flex flex-col items-center text-white px-6 py-12 max-w-[85%] text-left">
          <h1 className="text-3xl font-bold text-center w-full mb-6">
            {location.state?.nextTeamIndex !== undefined ? 'СЛЕДУЮЩИЙ ХОД' : 'НАЧАЛО ИГРЫ'}
          </h1>

          {teams.length > 0 && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <p className="text-xl">Ходит команда:</p>
              <div className="flex items-center gap-3">
                <img 
                  src={`Teams/${teams[currentTeamIndex]?.icon}`} 
                  alt={teams[currentTeamIndex]?.name} 
                  className="w-8 h-8" 
                />
                <p className="text-2xl font-semibold">{teams[currentTeamIndex]?.name}</p>
              </div>
            </div>
          )}

          <Link to="/game">
            <button
              className="flex items-center gap-2 bg-[#FFD686] text-[#292D32] py-3 px-12 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300"
            >
              <img src="StartGame/start-btn.svg" alt="Start" className="w-6 h-6" />
              НАЧАТЬ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartGame;
