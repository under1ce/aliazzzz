import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const bearColors = {
  'bear1.svg': '#90EE90', // зеленый
  'bear2.svg': '#FFD700', // желтый
  'bear3.svg': '#FF6BDF', // розовый
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
            className="absolute rounded-full animate-sink"
            style={{
              backgroundColor: currentBearColor,
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 50 + '%',
              opacity: 0.7,
              animation: `sink ${Math.random() * 3 + 2}s infinite ease-in-out`,
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
        <Link to="/game" className="relative flex justify-center items-center w-64 h-64">
          <img src="StartGame/start-btn.svg" alt="Start" className="w-full h-full relative z-20" />
          {currentTeam && (
            <img
              src={`Teams/${currentTeam.icon}`}
              alt={currentTeam.name}
              className="absolute -top-7 w-20 h-20 z-10"
            />
          )}
        </Link>
      </div>

      {/* Wave animation */}
      <div className="waves">
        <svg className="parallax" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill={`rgba(${parseInt(currentBearColor.slice(1, 3), 16)}, ${parseInt(currentBearColor.slice(3, 5), 16)}, ${parseInt(currentBearColor.slice(5, 7), 16)}, 0.4)`} />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill={`rgba(${parseInt(currentBearColor.slice(1, 3), 16)}, ${parseInt(currentBearColor.slice(3, 5), 16)}, ${parseInt(currentBearColor.slice(5, 7), 16)}, 0.3)`} />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill={`rgba(${parseInt(currentBearColor.slice(1, 3), 16)}, ${parseInt(currentBearColor.slice(3, 5), 16)}, ${parseInt(currentBearColor.slice(5, 7), 16)}, 0.2)`} />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill={`rgba(${parseInt(currentBearColor.slice(1, 3), 16)}, ${parseInt(currentBearColor.slice(3, 5), 16)}, ${parseInt(currentBearColor.slice(5, 7), 16)}, 0.1)`} />
          </g>
        </svg>
      </div>

      <style jsx>{`
        @keyframes sink {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        .animate-sink {
          animation: sink 3s infinite ease-in-out;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
        .parallax > use {
          animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
      `}</style>
    </div>
  );
}

export default StartGame;