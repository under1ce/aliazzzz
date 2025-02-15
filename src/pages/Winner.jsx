import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import victorySound from "../sounds/victory.mp3"; // Add this sound file to your project

const Winner = () => {
  const audioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const winnerName = location.state?.winnerName || JSON.parse(localStorage.getItem("winner"))?.name;
  const teams = JSON.parse(localStorage.getItem("teams")) || [];
  const winningTeam = teams.find(team => team.name === winnerName);
  const teamIndex = winningTeam ? teams.indexOf(winningTeam) + 1 : 1;
  const bearIcon = `/Teams/bear${teamIndex}.svg`;

  useEffect(() => {
    // Play victory sound when component mounts
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const handlePlayAgain = () => {
    localStorage.removeItem("teams");
    localStorage.removeItem("currentTeamIndex");
    localStorage.removeItem("winner");
    navigate("/teams");
  };

  const handleExit = () => {
    localStorage.removeItem("teams");
    localStorage.removeItem("currentTeamIndex");
    localStorage.removeItem("winner");
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between bg-[#C02900] px-4 py-8">
      {/* Audio element for victory sound */}
      <audio ref={audioRef} src={victorySound} />

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-center mb-4">
          <h1 className="text-white text-4xl font-bold mb-2">ПОБЕДА!!!</h1>
          <h2 className="text-white text-2xl">{winnerName}</h2>
        </div>

        <div className="relative w-48 h-48 my-8">
          <img src={bearIcon} alt="Winner Bear" className="w-full h-full" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-4 h-4 bg-white rotate-45" />
            <div className="absolute bottom-8 left-0 w-3 h-3 bg-yellow-300 rotate-12" />
            <div className="absolute top-12 right-4 w-3 h-3 bg-blue-400 rotate-45" />
            <div className="absolute bottom-4 right-8 w-2 h-2 bg-pink-300 rotate-12" />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-xs gap-4">
          <button onClick={handlePlayAgain} className="w-full bg-[#FFD686] text-[#292D32] py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-[#ffedc8] transition duration-300">
            ИГРАТЬ ЗАНОВО
          </button>

          <button
            onClick={handleExit}
            className="flex items-center justify-center gap-2 text-white text-lg"
          >
            <img src="StartGame/back-icon.svg" alt="" className="w-6 h-6" />
            МЕНЮ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Winner;