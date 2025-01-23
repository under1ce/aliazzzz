import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const bearColors = {
  'bear1.svg': '#90EE90', // зеленый
  'bear2.svg': '#FFD700', // желтый
  'bear3.svg': '#FFB6C1', // розовый
  'bear4.svg': '#87CEEB', // синий
  'bear5.svg': '#FF6B6B', // красный
  'bear6.svg': '#FFFFFF', // белый
  'bear7.svg': '#2F2F2F', // черный
};

function StartGame() {
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(savedTeams);

    let newIndex = parseInt(localStorage.getItem("currentTeamIndex") || "0");
    if (location.state?.nextTeamIndex !== undefined) {
      newIndex = location.state.nextTeamIndex;
    }
    setCurrentTeamIndex(newIndex);
  }, [location.state?.nextTeamIndex]);

  const currentTeam = teams[currentTeamIndex];
  const currentBearColor = currentTeam ? bearColors[currentTeam.icon] : '#FFFFFF';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00]">
      {/* Floating circles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              backgroundColor: currentBearColor,
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 50 + '%',
              opacity: 0.3,
              animation: `float ${Math.random() * 3 + 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 px-6 text-center">
        <h1 className="text-white text-2xl font-bold mb-2">ХОДИТ:</h1>
        <p className="text-white text-4xl font-bold">{currentTeam?.name}</p>
      </div>

      {/* Start Button with Bear */}
      <div className="flex-1 relative flex justify-center items-center">
        <Link 
          to="/game" 
          className="relative flex justify-center items-center w-64 h-64"
        >
          
          <img 
            src="StartGame/start-btn.svg" 
            
            alt="Start" 
            className="w-full h-full relative z-20"
          />
          {currentTeam && (
            <img
              src={`Teams/${currentTeam.icon}`}
              alt={currentTeam.name}
              className="absolute -top-7 w-20 h-20 z-10"
            />
          )}
          
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default StartGame;