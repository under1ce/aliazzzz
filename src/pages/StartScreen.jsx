import React from "react";
import { Link, useNavigate } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    localStorage.removeItem("teams");
    localStorage.removeItem("currentTeamIndex");
    
    const newTeams = [
      { id: "team1", name: "ПИКМИ", score: 0, icon: "bear1.svg" },
      { id: "team2", name: "УБЕЖИЩА", score: 0, icon: "bear2.svg" },
    ];
    
    localStorage.setItem("teams", JSON.stringify(newTeams));
    navigate("/teams");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#8b1e00] via-[#C02900] to-[#8b1e00] px-4 py-8">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative flex justify-center items-center mb-8">
          {/* Background Ellipse */}
          <img 
            src="StartScreen/EllipseLogo.svg" 
            alt="" 
            className="w-[200px] h-[150px] object-contain"
          />
          {/* Logo text overlay */}
          <img 
            src="StartScreen/logo.svg" 
            alt="Alias Logo" 
            className="absolute w-[180px]"
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto mb-12">
        <button
          onClick={handleNewGame}
          className="w-full bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold text-lg"
        >
          НАЧАТЬ ИГРАТЬ
        </button>
        
        <Link to="/rules" className="w-full">
          <button className="w-full bg-[#FFD686] text-[#292D32] py-3 px-8 rounded-full font-semibold text-lg">
            ПРАВИЛА
          </button>
        </Link>
      </div>

      {/* Bears Decoration */}
      <div className="relative w-full flex justify-between items-end px-4">
        <img 
          src="StartScreen/medved1.svg" 
          alt="" 
          className="w-24 h-24"
        />
        <img 
          src="StartScreen/medved2.svg" 
          alt="" 
          className="w-24 h-24"
        />
        <img 
          src="StartScreen/medved3.svg" 
          alt="" 
          className="w-24 h-24"
        />
      </div>
    </div>
  );
};

export default StartScreen;